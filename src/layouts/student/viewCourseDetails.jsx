import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Redux
import { fetchCourseDetails } from "../../redux/viewCourseDetails/viewCourseDetailsThunks";

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

import { useMaterialUIController } from "context";

function ViewCourseDetails() {
  const location = useLocation();
  const [controller] = useMaterialUIController();
  const { search } = controller;

  const dispatch = useDispatch();
  const {
    course: displayedCourse,
    teacher: displayedTeacher,
    notes: displayedNotes,
  } = useSelector((state) => state.viewCourseDetails);

  useEffect(() => {
    dispatch(fetchCourseDetails());
  }, [dispatch]);

  const handleNoteClick = (url) => {
    window.open(url, "_blank");
  };

  const filteredSyllabus = (displayedCourse?.course_syllabus || []).filter((topic) =>
    topic.toLowerCase().includes(search.toLowerCase())
  );

  const filteredNotes = (displayedNotes || []).filter((note) =>
    note.AN_title.toLowerCase().includes(search.toLowerCase())
  );

  // ------------------ Commented Dummy JSON ------------------
  /*
  const dummyData = {
    Courses: {
      idCourses: "course-123",
      course_name: "Introduction to Computer Science",
      course_pre_requisites: "Basic knowledge of mathematics and logic is recommended",
      course_syllabus: [
        "Week 1: Introduction to Programming",
        "Week 2: Data Types and Variables",
        "Week 3: Control Structures (if/else, loops)",
        "Week 4: Functions and Modules",
        "Week 5: Introduction to Data Structures (Arrays, Lists)",
        "Week 6: Algorithms and Complexity",
      ],
      course_code: "CS101",
      course_status: "Active",
      course_description: "This foundational course provides a comprehensive introduction to the principles of computer science...",
      course_thumbnail: "https://picsum.photos/800/200?random=123",
      course_current_completed: 95,
      course_active_students: ["user-001", "user-002"],
      course_pending_students: ["user-003"],
      teachers_user_id: "teacher-123",
    },
    Users: {
      user_id: "teacher-123",
      first_name: "Alan",
      last_name: "Turing",
      email: "alan.turing@example.com",
      user_role: "teacher",
    },
    Assignment_Notes: [
      { AN_id: "note-001", AN_link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", AN_title: "Lecture 1 - Introduction.pdf" },
      { AN_id: "note-002", AN_link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", AN_title: "Lecture 2 - Advanced Concepts.pdf" },
      { AN_id: "note-003", AN_link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", AN_title: "Practice Questions.pdf" }
    ],
  };
  */
  // ----------------------------------------------------------

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card style={{ padding: "16px", marginBottom: "24px" }}>
              <MDTypography variant="h4" fontWeight="bold" gutterBottom>
                {displayedCourse?.course_name}
              </MDTypography>
              <MDTypography variant="subtitle2" color="textSecondary" gutterBottom>
                Instructor:{" "}
                <strong>{`${displayedTeacher?.first_name} ${displayedTeacher?.last_name}`}</strong>
              </MDTypography>
              <img
                src={displayedCourse?.course_thumbnail}
                alt="Course Thumbnail"
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  margin: "16px 0",
                }}
              />
              <MDTypography variant="body1" color="textPrimary">
                {displayedCourse?.course_description}
              </MDTypography>
            </Card>

            <Card style={{ padding: "16px", marginBottom: "24px" }}>
              <MDTypography variant="h6" fontWeight="bold" gutterBottom>
                Course Expectations & Prerequisites
              </MDTypography>
              <Divider sx={{ my: 1 }} />
              <MDTypography variant="body2" color="textSecondary">
                <strong>Expectations:</strong> Attend lectures, complete assignments, participate in
                discussions.
              </MDTypography>
              <MDTypography variant="body2" color="textSecondary" mt={1}>
                <strong>Prerequisites:</strong> {displayedCourse?.course_pre_requisites}
              </MDTypography>
            </Card>

            <Card style={{ padding: "16px", marginBottom: "24px" }}>
              <MDTypography variant="h6" fontWeight="bold" gutterBottom>
                Course Syllabus
              </MDTypography>
              <Divider sx={{ my: 1 }} />
              <List>
                {(filteredSyllabus || []).map((topic, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemText primary={`• ${topic}`} />
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card style={{ padding: "16px", marginBottom: "24px" }}>
              <MDTypography variant="h6" fontWeight="bold" gutterBottom>
                Course Progress
              </MDTypography>
              <LinearProgress
                variant="determinate"
                value={displayedCourse?.course_current_completed || 0}
                sx={{ height: 8, borderRadius: 5 }}
              />
              <MDBox display="flex" justifyContent="flex-end" mt={1}>
                <MDTypography variant="caption" color="textSecondary" fontWeight="bold">
                  {displayedCourse?.course_current_completed || 0}% completed
                </MDTypography>
              </MDBox>
            </Card>

            <Card style={{ padding: "16px" }}>
              <MDTypography variant="h6" fontWeight="bold" gutterBottom>
                Uploaded Notes
              </MDTypography>
              <Divider sx={{ my: 1 }} />
              <List>
                {filteredNotes.map((note) => (
                  <ListItem button key={note.AN_id} onClick={() => handleNoteClick(note.AN_link)}>
                    <ListItemIcon>
                      <InsertDriveFileIcon color="info" />
                    </ListItemIcon>
                    <ListItemText primary={note.AN_title} />
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
