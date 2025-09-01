// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import LinearProgress from "@mui/material/LinearProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { useLocation } from "react-router-dom";

function ViewCourseDetails() {
  const location = useLocation();
  const course = location.state?.course;

  // dummy uploaded notes
  const notes = [
    { id: 1, title: "Lecture 1 - Introduction.pdf" },
    { id: 2, title: "Lecture 2 - Advanced Concepts.pdf" },
    { id: 3, title: "Practice Questions.docx" },
  ];

  // fallback if no course data
  if (!course) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox py={3} textAlign="center">
          <MDTypography variant="h5" color="error">
            No course selected. Please go back to Dashboard.
          </MDTypography>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          {/* Course Details */}
          <Grid item xs={12} md={8}>
            <Card style={{ padding: "16px" }}>
              <MDTypography variant="h4" gutterBottom>
                {course.title}
              </MDTypography>
              <MDTypography variant="subtitle2" color="textSecondary" gutterBottom>
                Instructor: {course.teacher}
              </MDTypography>
              <img
                src={`https://picsum.photos/800/200?random=${course.id}`}
                alt="Course Thumbnail"
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  margin: "16px 0",
                }}
              />
              <MDTypography variant="body2" color="textSecondary">
                {course.description ||
                  "This course covers fundamentals and provides resources to enhance learning."}
              </MDTypography>
            </Card>
          </Grid>

          {/* Progress + Notes */}
          <Grid item xs={12} md={4}>
            <Card style={{ padding: "16px", marginBottom: "16px" }}>
              <MDTypography variant="h6" gutterBottom>
                Progress
              </MDTypography>
              <LinearProgress variant="determinate" value={45} />
              <MDTypography variant="caption" color="textSecondary">
                45% completed
              </MDTypography>
            </Card>

            <Card style={{ padding: "16px" }}>
              <MDTypography variant="h6" gutterBottom>
                Uploaded Notes
              </MDTypography>
              <List>
                {notes.map((note) => (
                  <ListItem button key={note.id}>
                    <ListItemIcon>
                      <InsertDriveFileIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={note.title} />
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ViewCourseDetails;
