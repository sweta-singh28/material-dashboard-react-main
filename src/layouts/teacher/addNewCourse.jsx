// @mui material components
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function AddNewCourse() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={8}>
            <MDBox p={3} borderRadius="lg" shadow="md" bgColor="white">
              <MDTypography variant="h4" gutterBottom>
                📚 Launch New Course
              </MDTypography>

              {/* Course Name */}
              <MDBox mb={2}>
                <TextField fullWidth label="Course Name" variant="outlined" />
              </MDBox>

              {/* Course Description */}
              <MDBox mb={2}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Course Description"
                  variant="outlined"
                />
              </MDBox>

              {/* Teacher Info */}
              <MDBox mb={2}>
                <TextField
                  fullWidth
                  label="Teacher's Information"
                  variant="outlined"
                  placeholder="Enter your name, qualification, experience"
                />
              </MDBox>

              {/* Thumbnail Upload */}
              <MDBox mb={2}>
                <MDTypography variant="button" fontWeight="medium">
                  Upload Course Thumbnail
                </MDTypography>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "block", marginTop: "8px" }}
                />
              </MDBox>

              {/* Action Buttons */}
              <MDBox mt={3} display="flex" justifyContent="flex-end" gap={2}>
                <MDButton variant="outlined" color="secondary">
                  Cancel
                </MDButton>
                <MDButton variant="gradient" color="info">
                  Create Course
                </MDButton>
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AddNewCourse;
