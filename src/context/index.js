import PropTypes from "prop-types";
import { createContext, useContext, useReducer } from "react";

// Initial state
const initialState = {
  direction: "ltr",
  layout: "dashboard",
  darkMode: false,
  sidenavColor: "info",
  transparentSidenav: false,
  whiteSidenav: false,
  miniSidenav: false,
  transparentNavbar: true,
  fixedNavbar: false,
  openConfigurator: false,
  search: "", // ✅ Added for global search
};

// Reducer
function reducer(state, action) {
  switch (action.type) {
    case "DIRECTION":
      return { ...state, direction: action.value };
    case "LAYOUT":
      return { ...state, layout: action.value };
    case "DARKMODE":
      return { ...state, darkMode: action.value };
    case "SIDENAV_COLOR":
      return { ...state, sidenavColor: action.value };
    case "TRANSPARENT_SIDENAV":
      return { ...state, transparentSidenav: action.value };
    case "WHITE_SIDENAV":
      return { ...state, whiteSidenav: action.value };
    case "MINI_SIDENAV":
      return { ...state, miniSidenav: action.value };
    case "TRANSPARENT_NAVBAR":
      return { ...state, transparentNavbar: action.value };
    case "FIXED_NAVBAR":
      return { ...state, fixedNavbar: action.value };
    case "OPEN_CONFIGURATOR":
      return { ...state, openConfigurator: action.value };
    case "SET_SEARCH": // ✅ Added reducer case
      return { ...state, search: action.value };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// Context
const MaterialUI = createContext();
MaterialUI.displayName = "MaterialUIContext";

// Provider
function MaterialUIControllerProvider({ children }) {
  const [controller, dispatch] = useReducer(reducer, initialState);
  return <MaterialUI.Provider value={[controller, dispatch]}>{children}</MaterialUI.Provider>;
}

// PropTypes for provider (fixes ESLint warning)
MaterialUIControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hooks
function useMaterialUIController() {
  const context = useContext(MaterialUI);
  if (!context) {
    throw new Error("useMaterialUIController must be used within MaterialUIControllerProvider");
  }
  return context;
}

// Dispatch helpers
const setDirection = (dispatch, value) => dispatch({ type: "DIRECTION", value });
const setLayout = (dispatch, value) => dispatch({ type: "LAYOUT", value });
const setDarkMode = (dispatch, value) => dispatch({ type: "DARKMODE", value });
const setSidenavColor = (dispatch, value) => dispatch({ type: "SIDENAV_COLOR", value });
const setTransparentSidenav = (dispatch, value) => dispatch({ type: "TRANSPARENT_SIDENAV", value });
const setWhiteSidenav = (dispatch, value) => dispatch({ type: "WHITE_SIDENAV", value });
const setMiniSidenav = (dispatch, value) => dispatch({ type: "MINI_SIDENAV", value });
const setTransparentNavbar = (dispatch, value) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
const setFixedNavbar = (dispatch, value) => dispatch({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (dispatch, value) => dispatch({ type: "OPEN_CONFIGURATOR", value });
const setSearch = (dispatch, value) => dispatch({ type: "SET_SEARCH", value }); // ✅ Added

// ✅ Custom hook for global search
const useSearch = () => {
  const [controller, dispatch] = useMaterialUIController();
  const { search } = controller;
  return { search, setSearch: (value) => dispatch({ type: "SET_SEARCH", value }) };
};

export {
  MaterialUIControllerProvider,
  useMaterialUIController,
  setDirection,
  setLayout,
  setDarkMode,
  setSidenavColor,
  setTransparentSidenav,
  setWhiteSidenav,
  setMiniSidenav,
  setTransparentNavbar,
  setFixedNavbar,
  setOpenConfigurator,
  setSearch,
  useSearch, // ✅ Exported
};
