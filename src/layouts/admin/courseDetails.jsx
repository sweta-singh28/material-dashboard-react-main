// CourseDetails.jsx
import React from "react";
import { useLocation } from "react-router-dom";

// Material Dashboard 2 React components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";

const CourseDetails = () => {
  const location = useLocation();
  const { course } = location.state || {};

  if (!course) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox p={3}>
          <MDAlert color="error">
            <MDTypography variant="body2" color="white">
              Course details not found. Please navigate from the pending approvals page.
            </MDTypography>
          </MDAlert>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MDTypography variant="h4" fontWeight="medium" mb={2}>
              {course.title}
            </MDTypography>
          </Grid>

          {/* Course Details Card */}
          <Grid item xs={12} md={8}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="bold">
                  Course Information
                </MDTypography>
              </MDBox>
              <CardContent>
                <MDTypography variant="body2" color="text" mb={2}>
                  <MDTypography component="span" fontWeight="bold">
                    Instructor:
                  </MDTypography>{" "}
                  {course.instructor}
                </MDTypography>

                {/* NEW: Course Code */}
                <MDTypography variant="body2" color="text" mb={2}>
                  <MDTypography component="span" fontWeight="bold">
                    Course Code:
                  </MDTypography>{" "}
                  {course.courseCode || "-"}
                </MDTypography>

                <MDTypography variant="body2" color="text" mb={2}>
                  <MDTypography component="span" fontWeight="bold">
                    Submitted:
                  </MDTypography>{" "}
                  {course.submitted}
                </MDTypography>
                <MDTypography variant="body2" color="text" mb={2}>
                  <MDTypography component="span" fontWeight="bold">
                    Status:
                  </MDTypography>{" "}
                  {course.status}
                </MDTypography>
                <MDTypography variant="body2" color="text" mb={2}>
                  <MDTypography component="span" fontWeight="bold">
                    Description:
                  </MDTypography>{" "}
                  {course.description}
                </MDTypography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <MDBox mt={4} display="flex" justifyContent="flex-end" gap={2}>
          <MDButton variant="gradient" color="success">
            Approve
          </MDButton>
          <MDButton variant="gradient" color="error">
            Reject
          </MDButton>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default CourseDetails;
