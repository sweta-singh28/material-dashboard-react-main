import { useState, useEffect, useMemo } from "react";
import { jwtDecode } from "jwt-decode";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes - NOW IMPORTING A FUNCTION
import getRoutes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Add state to force re-render when routes change
  const [routesKey, setRoutesKey] = useState(0);

  // Get routes dynamically
  const routes = useMemo(() => getRoutes(), [routesKey]);

  // useEffect to check token expiration on app load
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const tokenDetails = jwtDecode(token);
        console.log("✅ Decoded Token Details (via jwt-decode):", tokenDetails);

        // Expiration Check Logic
        const expirationTime = tokenDetails.exp * 1000;
        const currentTime = Date.now();

        if (expirationTime < currentTime) {
          console.warn("🔴 Token has expired. Clearing session.");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setRoutesKey((prev) => prev + 1); // Force routes refresh
          window.location.href = "/authentication/signin";
        }
      } catch (error) {
        console.error("🔴 Failed to decode token:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setRoutesKey((prev) => prev + 1); // Force routes refresh
      }
    } else {
      console.log("ℹ️ No token found in local storage.");
    }
  }, []);

  // Listen for storage changes (login/logout events)
  useEffect(() => {
    const handleStorageChange = () => {
      setRoutesKey((prev) => prev + 1); // Force routes refresh
    };

    window.addEventListener("storage", handleStorageChange);

    // Custom event for same-tab login/logout
    window.addEventListener("userChanged", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userChanged", handleStorageChange);
    };
  }, []);

  // Filter routes for the navigation sidebar
  const navRoutes = routes.filter((route) => route.inNav);

  // Determine the correct redirect path for the catch-all route
  const getRedirectPath = () => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      if (user.role === "teacher") {
        return "/teacher/dashboard";
      } else if (user.role === "student") {
        return "/student/dashboard";
      } else if (user.role === "admin") {
        return "/admin/dashboard";
      }
    }
    return "/authentication/signin";
  };

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });
    setRtlCache(cacheRtl);
  }, []);

  // Sidenav mouse handlers
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Configurator handler
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Set the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Scroll to top on route change
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    if (document.scrollingElement) {
      document.scrollingElement.scrollTop = 0;
    }
  }, [pathname]);

  // Recursive function to generate all <Route> components
  const getRoutesElements = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutesElements(route.collapse);
      }
      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }
      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  const currentTheme = darkMode ? themeDark : theme;

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={themeRTL}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
              brandName="Coursify"
              routes={navRoutes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {configsButton}
          </>
        )}
        {layout === "vr" && <Configurator />}
        <Routes key={routesKey}>
          {getRoutesElements(routes)}
          <Route path="*" element={<Navigate to={getRedirectPath()} />} />
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="Coursify"
            routes={navRoutes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes key={routesKey}>
        {getRoutesElements(routes)}
        <Route path="*" element={<Navigate to={getRedirectPath()} />} />
      </Routes>
    </ThemeProvider>
  );
}
