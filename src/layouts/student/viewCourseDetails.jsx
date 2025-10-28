import React, { useEffect } from "react";
import { useParams } from "react-router-dom"; // ✅ useParams instead of useLocation
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
  const { id } = useParams(); // ✅ capture the course ID from URL
  const [controller] = useMaterialUIController();
  const { search } = controller;

  const dispatch = useDispatch();
  const {
    course: displayedCourse,
    teacher: displayedTeacher,
    notes: displayedNotes,
  } = useSelector((state) => state.viewCourseDetails);

  useEffect(() => {
    if (id) {
      dispatch(fetchCourseDetails(id)); // ✅ pass ID to thunk
    }
  }, [dispatch, id]);
  useEffect(() => {
    console.log("Displayed Course:", displayedCourse);
    console.log("Displayed Teacher:", displayedTeacher);
    console.log("Displayed Notes:", displayedNotes);
  }, [displayedCourse, displayedTeacher, displayedNotes]);
  const handleNoteClick = (url) => {
    window.open(url, "_blank");
  };

  const filteredSyllabus = (displayedCourse?.course_syllabus || []).filter((topic) =>
    topic.toLowerCase().includes(search.toLowerCase())
  );

  const filteredNotes = (displayedNotes || []).filter((note) =>
    note.AN_title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          {/* Left Section: Course Info */}
          <Grid item xs={12} md={8}>
            <Card style={{ padding: "16px", marginBottom: "24px" }}>
              <MDTypography variant="h4" fontWeight="bold" gutterBottom>
                {displayedCourse?.course_name}
              </MDTypography>
              <MDTypography variant="subtitle2" color="textSecondary" gutterBottom>
                Instructor:{" "}
                <strong>{`${displayedTeacher?.first_name || ""} ${
                  displayedTeacher?.last_name || ""
                }`}</strong>
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

          {/* Right Section: Progress & Notes */}
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
