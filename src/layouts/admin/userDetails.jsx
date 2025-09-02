import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

const getStoredUsers = () => {
  try {
    const raw = localStorage.getItem("users");
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return [];
};

const UserDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState(location.state?.user || null);

  // If user wasn't passed through state (direct URL)
  useEffect(() => {
    if (!user && id) {
      const stored = getStoredUsers();
      const found = stored.find((u) => String(u.id) === String(id) || Number(u.id) === Number(id));
      if (found) setUser(found);
    }
  }, [id, user]);

  if (!user) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mt={6} mb={3} textAlign="center">
          <MDTypography variant="h6">No user details available.</MDTypography>
          <MDButton variant="gradient" color="info" onClick={() => navigate("/totalUsers")}>
            Back to Total Users page
          </MDButton>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  const handleRemoveUser = () => {
    const stored = getStoredUsers();
    const updated = stored.filter((u) => String(u.id) !== String(user.id));
    localStorage.setItem("users", JSON.stringify(updated));

    navigate("/admin/totalUsers", { state: { removedUserId: user.id } });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8} lg={6}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h4" gutterBottom>
                  User Details
                </MDTypography>

                <MDBox mb={2}>
                  <MDTypography variant="h6">Name:</MDTypography>
                  <MDTypography variant="body2">{user.name}</MDTypography>
                </MDBox>

                <MDBox mb={2}>
                  <MDTypography variant="h6">Role:</MDTypography>
                  <MDTypography variant="body2">{user.role}</MDTypography>
                </MDBox>

                <MDBox mb={2}>
                  <MDTypography variant="h6">Qualifications:</MDTypography>
                  <MDTypography variant="body2">
                    {user.qualifications || "Not specified"}
                  </MDTypography>
                </MDBox>

                <MDBox mb={2}>
                  <MDTypography variant="h6">Contact No.:</MDTypography>
                  <MDTypography variant="body2">{user.contact || "Not specified"}</MDTypography>
                </MDBox>

                <MDBox mb={2}>
                  <MDTypography variant="h6">Email:</MDTypography>
                  <MDTypography variant="body2">{user.email}</MDTypography>
                </MDBox>

                <MDBox mt={3} display="flex" justifyContent="space-between">
                  <MDButton variant="gradient" color="error" onClick={handleRemoveUser}>
                    Remove User
                  </MDButton>
                  <MDButton variant="gradient" color="info" onClick={() => navigate("/totalUsers")}>
                    Back
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
};

export default UserDetails;
