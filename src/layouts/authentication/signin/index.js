import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/authentication/signin/signinThunks";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-signin-basic.jpeg";

function Basic() {
  const dispatch = useDispatch();
  // ✅ 1. Get the actual 'user' object from the Redux state
  const { loading, error, success, user } = useSelector((state) => state.signin || {});

  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ 2. BEST PRACTICE: Redirect if user is ALREADY logged in
  // This runs once when the component first loads.
  useEffect(() => {
    const existingUser = localStorage.getItem("user");
    if (existingUser) {
      const role = JSON.parse(existingUser).user_role;
      if (role === "teacher") navigate("/teacher/dashboard");
      else if (role === "student") navigate("/student/dashboard");
      else if (role === "admin") navigate("/admin/dashboard");
    }
  }, [navigate]); // navigate is a stable function, so this runs once

  // ✅ 3. THE MAIN FIX: Redirect AFTER a successful login
  // This effect now depends on the 'user' object. It will only run when 'user' is populated.
  useEffect(() => {
    // We check for both 'success' and the presence of 'user' data to prevent the race condition
    if (success && user) {
      const role = user.role; // Read role directly from the Redux state user object

      if (role === "teacher") {
        navigate("/teacher/dashboard");
        window.location.reload();
      } else if (role === "student") {
        navigate("/student/dashboard");
        window.location.reload();
      } else if (role === "admin") {
        navigate("/admin/dashboard");
        window.location.reload();
      }
    }
  }, [success, user, navigate]); // The key change is adding 'user' to the dependency array

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </MDBox>
            {error && (
              <MDTypography variant="caption" color="error" fontWeight="medium" textGradient>
                {/* Ensure error is a string or an object with a message property */}
                {typeof error === "string" ? error : error.message || "Invalid credentials."}
              </MDTypography>
            )}
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/signup"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
