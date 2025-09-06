// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import LinearProgress from "@mui/material/LinearProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Divider from "@mui/material/Divider";

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

  // dummy course data with more details
  const dummyCourse = {
    id: 1,
    title: "Introduction to Computer Science",
    teacher: "Dr. Alan Turing",
    description:
      "This foundational course provides a comprehensive introduction to the principles of computer science. Students will learn about programming fundamentals, data structures, algorithms, and computational thinking.",
    expectations:
      "Students are expected to attend lectures, complete weekly assignments, and participate in discussions.",
    prerequisites:
      "Basic knowledge of mathematics and logic is recommended. No prior programming experience is required.",
    syllabus: [
      "Week 1: Introduction to Programming",
      "Week 2: Data Types and Variables",
      "Week 3: Control Structures (if/else, loops)",
      "Week 4: Functions and Modules",
      "Week 5: Introduction to Data Structures (Arrays, Lists)",
      "Week 6: Algorithms and Complexity",
    ],
    progressPercentage: 95,
  };

  // Use the dummy data if no course is passed via state
  const displayedCourse = course || dummyCourse;

  // Dummy uploaded notes
  const notes = [
    {
      id: 1,
      title: "Lecture 1 - Introduction.pdf",
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      id: 2,
      title: "Lecture 2 - Advanced Concepts.pdf",
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      id: 3,
      title: "Practice Questions.pdf",
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  ];

  const handleNoteClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          {/* Main Content Area */}
          <Grid item xs={12} md={8}>
            {/* Course Details */}
            <Card style={{ padding: "16px", marginBottom: "24px" }}>
              <MDTypography variant="h4" fontWeight="bold" gutterBottom>
                {displayedCourse.title}
              </MDTypography>
              <MDTypography variant="subtitle2" color="textSecondary" gutterBottom>
                Instructor: <strong>{displayedCourse.teacher}</strong>
              </MDTypography>
              <img
                src={`https://picsum.photos/800/200?random=${displayedCourse.id}`}
                alt="Course Thumbnail"
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  margin: "16px 0",
                }}
              />
              <MDTypography variant="body1" color="textPrimary">
                {displayedCourse.description}
              </MDTypography>
            </Card>

            {/* Course Expectations & Prerequisites */}
            <Card style={{ padding: "16px", marginBottom: "24px" }}>
              <MDTypography variant="h6" fontWeight="bold" gutterBottom>
                Course Expectations & Prerequisites
              </MDTypography>
              <Divider sx={{ my: 1 }} />
              <MDTypography variant="body2" color="textSecondary">
                <strong>Expectations:</strong> {displayedCourse.expectations}
              </MDTypography>
              <MDTypography variant="body2" color="textSecondary" mt={1}>
                <strong>Prerequisites:</strong> {displayedCourse.prerequisites}
              </MDTypography>
            </Card>

            {/* Course Syllabus */}
            <Card style={{ padding: "16px", marginBottom: "24px" }}>
              <MDTypography variant="h6" fontWeight="bold" gutterBottom>
                Course Syllabus
              </MDTypography>
              <Divider sx={{ my: 1 }} />
              <List>
                {(displayedCourse.syllabus || []).map((topic, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemText primary={`• ${topic}`} />
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>

          {/* Side Content Area */}
          <Grid item xs={12} md={4}>
            {/* Progress Card */}
            <Card style={{ padding: "16px", marginBottom: "24px" }}>
              <MDTypography variant="h6" fontWeight="bold" gutterBottom>
                Course Progress
              </MDTypography>
              <LinearProgress
                variant="determinate"
                value={displayedCourse.progressPercentage}
                sx={{ height: 8, borderRadius: 5 }}
              />
              <MDBox display="flex" justifyContent="flex-end" mt={1}>
                <MDTypography variant="caption" color="textSecondary" fontWeight="bold">
                  {displayedCourse.progressPercentage}% completed
                </MDTypography>
              </MDBox>
            </Card>

            {/* Uploaded Notes Card */}
            <Card style={{ padding: "16px" }}>
              <MDTypography variant="h6" fontWeight="bold" gutterBottom>
                Uploaded Notes
              </MDTypography>
              <Divider sx={{ my: 1 }} />
              <List>
                {notes.map((note) => (
                  <ListItem button key={note.id} onClick={() => handleNoteClick(note.url)}>
                    <ListItemIcon>
                      <InsertDriveFileIcon color="info" />
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
