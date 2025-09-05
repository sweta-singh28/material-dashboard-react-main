// React
import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

// Layout
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function UploadMaterials() {
  const [activeTab, setActiveTab] = useState(null); // "assignment" | "notes" | null

  const handleAssignmentSubmit = (e) => {
    e.preventDefault();
    console.log("Assignment submitted");
  };

  const handleNotesSubmit = (e) => {
    e.preventDefault();
    console.log("Notes submitted");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={8}>
            <MDBox p={3} borderRadius="lg" shadow="md" bgColor="white">
              <MDTypography variant="h4" gutterBottom>
                📤 Upload Materials
              </MDTypography>

              {/* Toggle Buttons */}
              <MDBox display="flex" gap={2} mb={3}>
                <MDButton
                  variant={activeTab === "assignment" ? "gradient" : "outlined"}
                  color="info"
                  onClick={() => setActiveTab("assignment")}
                >
                  Assignment
                </MDButton>
                <MDButton
                  variant={activeTab === "notes" ? "gradient" : "outlined"}
                  color="info"
                  onClick={() => setActiveTab("notes")}
                >
                  Notes
                </MDButton>
              </MDBox>

              {/* Helper text when nothing selected */}
              {!activeTab && (
                <MDTypography variant="button" color="text">
                  Select <strong>Assignment</strong> or <strong>Notes</strong> to continue.
                </MDTypography>
              )}

              {/* Assignment Form */}
              {activeTab === "assignment" && (
                <MDBox mt={1} component="form" role="form" onSubmit={handleAssignmentSubmit}>
                  <MDBox mb={2}>
                    <MDTypography variant="button" fontWeight="medium">
                      Subject
                    </MDTypography>
                    <MDInput fullWidth placeholder="Enter subject name" required />
                  </MDBox>

                  <MDBox mb={2}>
                    <MDTypography variant="button" fontWeight="medium">
                      Assignment Title
                    </MDTypography>
                    <MDInput fullWidth placeholder="Enter assignment title" required />
                  </MDBox>

                  <MDBox mb={2}>
                    <MDTypography variant="button" fontWeight="medium">
                      Upload Assignment
                    </MDTypography>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.zip"
                      style={{ display: "block", marginTop: 8 }}
                      required
                    />
                  </MDBox>

                  <MDBox mb={2}>
                    <MDTypography variant="button" fontWeight="medium">
                      Deadline
                    </MDTypography>
                    <MDInput fullWidth type="date" InputLabelProps={{ shrink: true }} required />
                  </MDBox>

                  <MDBox mt={3} display="flex" justifyContent="flex-end" gap={12 / 6}>
                    <MDButton
                      variant="outlined"
                      color="secondary"
                      onClick={() => setActiveTab(null)}
                      type="button"
                    >
                      Cancel
                    </MDButton>
                    <MDButton variant="gradient" color="info" type="submit">
                      Upload Assignment
                    </MDButton>
                  </MDBox>
                </MDBox>
              )}

              {/* Notes Form */}
              {activeTab === "notes" && (
                <MDBox mt={1} component="form" role="form" onSubmit={handleNotesSubmit}>
                  <MDBox mb={2}>
                    <MDTypography variant="button" fontWeight="medium">
                      Subject
                    </MDTypography>
                    <MDInput fullWidth placeholder="Enter subject name" required />
                  </MDBox>

                  <MDBox mb={2}>
                    <MDTypography variant="button" fontWeight="medium">
                      Upload Notes
                    </MDTypography>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx"
                      style={{ display: "block", marginTop: 8 }}
                      required
                    />
                  </MDBox>

                  <MDBox mt={3} display="flex" justifyContent="flex-end" gap={12 / 6}>
                    <MDButton
                      variant="outlined"
                      color="secondary"
                      onClick={() => setActiveTab(null)}
                      type="button"
                    >
                      Cancel
                    </MDButton>
                    <MDButton variant="gradient" color="info" type="submit">
                      Upload Notes
                    </MDButton>
                  </MDBox>
                </MDBox>
              )}
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default UploadMaterials;
