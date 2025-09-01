// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import UploadFileIcon from "@mui/icons-material/UploadFile";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { useState } from "react";

function Assignment() {
  // dummy data
  const [pendingAssignments, setPendingAssignments] = useState([
    { id: 1, title: "Math Homework - Algebra" },
    { id: 2, title: "Physics Lab Report" },
  ]);

  const [completedAssignments, setCompletedAssignments] = useState([
    { id: 3, title: "English Essay" },
  ]);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file before uploading.");
      return;
    }
    alert(`Uploaded: ${selectedFile.name}`);
    // after upload, mark first pending as completed (for demo)
    if (pendingAssignments.length > 0) {
      const moved = pendingAssignments[0];
      setPendingAssignments(pendingAssignments.slice(1));
      setCompletedAssignments([...completedAssignments, moved]);
    }
    setSelectedFile(null);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          {/* Pending Assignments */}
          <Grid item xs={12} md={6}>
            <Card style={{ padding: "16px" }}>
              <MDTypography variant="h5" gutterBottom>
                Pending Assignments
              </MDTypography>
              <List>
                {pendingAssignments.length === 0 ? (
                  <MDTypography variant="body2" color="textSecondary">
                    No pending assignments 🎉
                  </MDTypography>
                ) : (
                  pendingAssignments.map((a) => (
                    <ListItem key={a.id}>
                      <ListItemIcon>
                        <PendingActionsIcon color="warning" />
                      </ListItemIcon>
                      <ListItemText primary={a.title} />
                    </ListItem>
                  ))
                )}
              </List>
            </Card>
          </Grid>

          {/* Completed Assignments */}
          <Grid item xs={12} md={6}>
            <Card style={{ padding: "16px" }}>
              <MDTypography variant="h5" gutterBottom>
                Completed Assignments
              </MDTypography>
              <List>
                {completedAssignments.length === 0 ? (
                  <MDTypography variant="body2" color="textSecondary">
                    No assignments completed yet.
                  </MDTypography>
                ) : (
                  completedAssignments.map((a) => (
                    <ListItem key={a.id}>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" />
                      </ListItemIcon>
                      <ListItemText primary={a.title} />
                    </ListItem>
                  ))
                )}
              </List>
            </Card>
          </Grid>

          {/* Upload Assignment */}
          <Grid item xs={12}>
            <Card style={{ padding: "16px" }}>
              <MDTypography variant="h5" gutterBottom>
                Upload Assignment
              </MDTypography>
              <MDBox display="flex" alignItems="center" gap={2}>
                <Button variant="contained" component="label" startIcon={<UploadFileIcon />}>
                  Select File
                  <input type="file" hidden onChange={handleFileChange} />
                </Button>
                {selectedFile && <MDTypography variant="body2">{selectedFile.name}</MDTypography>}
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleUpload}
                  disabled={!selectedFile}
                >
                  Submit
                </Button>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Assignment;
