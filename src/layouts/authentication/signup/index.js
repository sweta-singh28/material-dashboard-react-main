// react-router-dom components
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../../redux/authentication/signup/signupThunks";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-signup-cover.jpeg";

function Cover() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.signup);
  const [errors, setErrors] = useState({ password: "" });
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    user_role: "",
    qualifications: "",
  });
  console.log(error);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    // Password validation logic
    if (name === "password") {
      if (value.length < 8) {
        setErrors({ ...errors, password: "Password must be at least 8 characters long" });
      } else if (!/[A-Z]/.test(value)) {
        setErrors({ ...errors, password: "Password must contain at least one uppercase letter" });
      } else if (!/[a-z]/.test(value)) {
        setErrors({ ...errors, password: "Password must contain at least one lowercase letter" });
      } else if (!/[0-9]/.test(value)) {
        setErrors({ ...errors, password: "Password must contain at least one number" });
      } else if (!/[@$!%*?&#]/.test(value)) {
        setErrors({
          ...errors,
          password: "Password must contain at least one special character (@, $, !, %, *, ?, &, #)",
        });
      } else {
        setErrors({ ...errors, password: "" });
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if any field is empty
    const { first_name, last_name, email, password, user_role, qualifications } = formData;

    if (!first_name || !last_name || !email || !password || !user_role || !qualifications) {
      alert("Please fill out all fields before submitting."); // You can replace alert with a Snackbar or toast
      return;
    }

    // ✅ Optional: Add basic email & password validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    dispatch(signupUser({ ...formData }));
  };

  return (
    <CoverLayout
      image={bgImage}
      sx={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card sx={{ maxWidth: 450, width: "100%" }}>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your details to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="First Name"
                variant="standard"
                fullWidth
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Last Name"
                variant="standard"
                fullWidth
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Maximum Qualifications"
                variant="standard"
                fullWidth
                name="qualifications"
                value={formData.qualifications}
                onChange={handleInputChange}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                variant="standard"
                fullWidth
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                error={!!errors.password}
              />
              {errors.password && (
                <MDTypography variant="caption" color="error">
                  {errors.password}
                </MDTypography>
              )}
            </MDBox>
            <MDBox mb={2}>
              <FormControl variant="standard" fullWidth>
                <InputLabel>Login as</InputLabel>
                <Select name="user_role" value={formData.user_role} onChange={handleInputChange}>
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="teacher">Teacher</MenuItem>
                </Select>
              </FormControl>
            </MDBox>
            {loading && (
              <MDBox display="flex" justifyContent="center" mb={2}>
                <CircularProgress size={24} color="info" />
              </MDBox>
            )}
            {error && (
              <MDTypography variant="button" color="error" mb={2}>
                {error}
              </MDTypography>
            )}
            {success && (
              <MDTypography variant="button" color="success" mb={2}>
                Signup successful!
              </MDTypography>
            )}

            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit" disabled={loading}>
                {loading ? "Signing up..." : "Sign Up"}
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/signin"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
