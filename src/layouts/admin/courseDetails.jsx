import React from "react";
import { useLocation } from "react-router-dom";

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

// Sample users JSON (can later come from API)
const usersJSON = [
  { idUsers: "t1", first_name: "Eleanor", last_name: "Vance", role: "teacher" },
  { idUsers: "t2", first_name: "Samuel", last_name: "Harper", role: "teacher" },
];

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

  // Map teacher ID to name
  const instructor = usersJSON.find((u) => u.idUsers === course.teachers_user_id);
  const instructorName = instructor
    ? `${instructor.first_name} ${instructor.last_name}`
    : course.teachers_user_id;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MDTypography variant="h4" fontWeight="medium" mb={2}>
              {course.course_name}
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
                  {instructorName}
                </MDTypography>

                <MDTypography variant="body2" color="text" mb={2}>
                  <MDTypography component="span" fontWeight="bold">
                    Course Code:
                  </MDTypography>{" "}
                  {course.course_code || "-"}
                </MDTypography>

                <MDTypography variant="body2" color="text" mb={2}>
                  <MDTypography component="span" fontWeight="bold">
                    Status:
                  </MDTypography>{" "}
                  {course.course_status}
                </MDTypography>

                <MDTypography variant="body2" color="text" mb={2}>
                  <MDTypography component="span" fontWeight="bold">
                    Description:
                  </MDTypography>{" "}
                  {course.course_description}
                </MDTypography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <MDBox mt={4} display="flex" justifyContent="flex-end" gap={2}>
          <MDButton
            variant="gradient"
            color="success"
            onClick={() => console.log(`Approve course ${course.idCourses}`)}
          >
            Approve
          </MDButton>
          <MDButton
            variant="gradient"
            color="error"
            onClick={() => console.log(`Reject course ${course.idCourses}`)}
          >
            Reject
          </MDButton>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default CourseDetails;
