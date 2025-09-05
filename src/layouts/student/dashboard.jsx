// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";

// icons
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();

  const teacherCourses = [
    {
      id: "c1",
      title: "Mathematics I",
      teacher: "Dr. Rao",
      thumbnail: "https://via.placeholder.com/80x80.png?text=Math",
    },
    {
      id: "c2",
      title: "Physics I",
      teacher: "Dr. Iyer",
      thumbnail: "https://via.placeholder.com/80x80.png?text=Phys",
    },
    {
      id: "c3",
      title: "Chemistry",
      teacher: "Dr. Singh",
      thumbnail: "https://via.placeholder.com/80x80.png?text=Chem",
    },
    {
      id: "c4",
      title: "English",
      teacher: "Ms. Patel",
      thumbnail: "https://via.placeholder.com/80x80.png?text=Eng",
    },
    {
      id: "c5",
      title: "Computer Science",
      teacher: "Mr. Verma",
      thumbnail: "https://via.placeholder.com/80x80.png?text=CS",
    },
    {
      id: "c6",
      title: "Biology",
      teacher: "Dr. Gupta",
      thumbnail: "https://via.placeholder.com/80x80.png?text=Bio",
    },
  ];

  // Pre-filled enrolled courses for better UI
  const [enrolledCourses, setEnrolledCourses] = useState([
    {
      id: "c1",
      title: "Mathematics I",
      teacher: "Dr. Rao",
      thumbnail: "https://via.placeholder.com/80x80.png?text=Math",
    },
    {
      id: "c2",
      title: "Physics I",
      teacher: "Dr. Iyer",
      thumbnail: "https://via.placeholder.com/80x80.png?text=Phys",
    },
  ]);

  const [pendingRequests, setPendingRequests] = useState([]);
  const [selected, setSelected] = useState("");
  const [showCourseDetails, setShowCourseDetails] = useState(null);

  const handleOpenDetails = (courseId) => {
    const course = teacherCourses.find((c) => c.id === courseId);
    setShowCourseDetails(course);
  };

  const handleCloseDetails = () => {
    setShowCourseDetails(null);
    setSelected("");
  };

  const handleRequestCourse = () => {
    if (!showCourseDetails) return;
    if (enrolledCourses.length + pendingRequests.length >= 5) {
      alert("You can only request up to 5 courses in total.");
      handleCloseDetails();
      return;
    }
    const course = showCourseDetails;
    if (
      enrolledCourses.some((c) => c.id === course.id) ||
      pendingRequests.some((c) => c.id === course.id)
    ) {
      alert("Already requested or enrolled in this course.");
      handleCloseDetails();
      return;
    }
    setPendingRequests([...pendingRequests, course]);
    handleCloseDetails();
  };

  const handleView = (course) => {
    navigate("/student/viewCourseDetails", { state: { course } });
  };

  const allSelectedCourseIds = [
    ...enrolledCourses.map((c) => c.id),
    ...pendingRequests.map((c) => c.id),
  ];
  const availableCourses = teacherCourses.filter((c) => !allSelectedCourseIds.includes(c.id));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          {/* Section 1: Enrolled Courses */}
          <Grid item xs={12}>
            <MDTypography variant="h5" gutterBottom>
              Enrolled Courses
            </MDTypography>
            <Grid container spacing={3}>
              {enrolledCourses.length === 0 ? (
                <Grid item xs={12}>
                  <MDTypography variant="body2">No courses enrolled yet.</MDTypography>
                </Grid>
              ) : (
                enrolledCourses.map((course) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
                    <Card
                      onClick={() => handleView(course)}
                      style={{
                        padding: "16px",
                        textAlign: "center",
                        borderRadius: "12px",
                        cursor: "pointer",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        transition: "transform 0.2s",
                      }}
                    >
                      {course.thumbnail && (
                        <img
                          src={course.thumbnail}
                          alt={`${course.title} thumbnail`}
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            marginBottom: "10px",
                          }}
                        />
                      )}
                      <MDTypography variant="h6">{course.title}</MDTypography>
                      <MDTypography variant="body2" color="textSecondary">
                        {course.teacher}
                      </MDTypography>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Grid>

          {/* Section 2: Choose a Course */}
          <Grid item xs={12} md={6}>
            <Card style={{ padding: "16px", borderRadius: "12px" }}>
              <MDTypography variant="h5" gutterBottom>
                Choose a Course (Max 5 Total)
              </MDTypography>
              <MDBox display="flex" gap={2} alignItems="center" mb={1}>
                <Select
                  value={selected}
                  onChange={(e) => {
                    setSelected(e.target.value);
                    if (e.target.value) handleOpenDetails(e.target.value);
                  }}
                  displayEmpty
                  style={{ minWidth: 220 }}
                >
                  <MenuItem value="">-- Select Course --</MenuItem>
                  {availableCourses.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.title} — {c.teacher}
                    </MenuItem>
                  ))}
                </Select>
              </MDBox>
              <Typography variant="caption" color="textSecondary">
                Slots left: {5 - (enrolledCourses.length + pendingRequests.length)}
              </Typography>
            </Card>
          </Grid>

          {/* Section 3: Pending Requests (No Approve Button) */}
          <Grid item xs={12}>
            <MDTypography variant="h5" gutterBottom>
              Pending Approval from Teacher
            </MDTypography>
            <Grid container spacing={3}>
              {pendingRequests.length === 0 ? (
                <Grid item xs={12}>
                  <MDTypography variant="body2">No pending requests.</MDTypography>
                </Grid>
              ) : (
                pendingRequests.map((course) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
                    <Card
                      style={{
                        padding: "16px",
                        borderRadius: "12px",
                        textAlign: "center",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    >
                      <MDBox display="flex" flexDirection="column" alignItems="center" mb={1}>
                        {course.thumbnail && (
                          <img
                            src={course.thumbnail}
                            alt={`${course.title} thumbnail`}
                            style={{
                              width: "80px",
                              height: "80px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              marginBottom: "8px",
                            }}
                          />
                        )}
                        <MDBox display="flex" alignItems="center" gap={1}>
                          <AccessTimeIcon color="warning" />
                          <MDTypography variant="h6">{course.title}</MDTypography>
                        </MDBox>
                        <MDTypography variant="body2" color="textSecondary">
                          {course.teacher}
                        </MDTypography>
                      </MDBox>
                      <MDTypography variant="caption" color="textSecondary">
                        Waiting for teacher approval...
                      </MDTypography>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Grid>
        </Grid>
      </MDBox>

      {/* Course Details Dialog */}
      <Dialog open={!!showCourseDetails} onClose={handleCloseDetails}>
        <DialogTitle>Course Details</DialogTitle>
        <DialogContent>
          {showCourseDetails && (
            <Box>
              <MDTypography variant="h6">Course: {showCourseDetails.title}</MDTypography>
              <MDTypography variant="body1">Teacher: {showCourseDetails.teacher}</MDTypography>
              <MDTypography variant="body2" mt={2}>
                Please note: Requesting this course will add it to your pending requests. It will
                only be officially enrolled after teacher approval.
              </MDTypography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleRequestCourse}
            color="primary"
            variant="contained"
            startIcon={<AddCircleIcon />}
          >
            Request
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </DashboardLayout>
  );
}

export default StudentDashboard;
