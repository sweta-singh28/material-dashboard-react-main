import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Material UI
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// Dashboard components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Redux thunks
import { fetchStudentDashboard } from "../../redux/studentDashboard/studentDashboardThunks";
import { fetchCourses } from "../../redux/availableCourses/availableCourseThunk";
// import { fetchAllCourses } from "../../redux/courses/coursesThunks"; // hypothetical thunk

function StudentDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // all available courses
  // const allCoursesFromBackend = []; // Placeholder until thunk is implemented

  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [showCourseDetails, setShowCourseDetails] = useState(null);

  const allCoursesData = useSelector((state) => state.availableCourses.courses || []);
  const dashboardData = useSelector((state) => state.studentDashboard.data || {});

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [pendingCourses, setPendingCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);

  // Fetch data once
  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchStudentDashboard());
  }, [dispatch]);

  // Update enrolled and pending when dashboard changes
  useEffect(() => {
    if (dashboardData.enrolledCourses) setEnrolledCourses(dashboardData.enrolledCourses);
    if (dashboardData.pendingCourses) setPendingCourses(dashboardData.pendingCourses);
  }, [dashboardData]);

  // Compute availableCourses dynamically
  useEffect(() => {
    const allCoursesArray = Array.isArray(allCoursesData.data)
      ? allCoursesData.data
      : Array.isArray(allCoursesData)
      ? allCoursesData
      : [];

    const filtered = allCoursesArray.filter(
      (c) =>
        !enrolledCourses.some((e) => e._id === c._id) &&
        !pendingCourses.some((p) => p._id === c._id)
    );

    setAvailableCourses(filtered);
    console.log("✅ Available Courses:", filtered);
  }, [allCoursesData, enrolledCourses, pendingCourses]);

  const handleOpenDetails = (courseId) => {
    const course = [...enrolledCourses, ...pendingCourses, ...allCoursesData.data].find(
      (c) => c._id === courseId
    );
    setShowCourseDetails(course || null);
  };

  const handleCloseDetails = () => {
    setShowCourseDetails(null);
    setSelectedCourseId("");
  };

  const handleRequestCourse = () => {
    if (!showCourseDetails) return;
    if (
      enrolledCourses.some((c) => c._id === showCourseDetails._id) ||
      pendingCourses.some((c) => c._id === showCourseDetails._id)
    ) {
      alert("Already enrolled or requested.");
      handleCloseDetails();
      return;
    }
    setPendingCourses((prev) => [...prev, showCourseDetails]);
    handleCloseDetails();
  };

  // Filter courses that are neither enrolled nor pending

  // const availableCourses = [];
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={4} px={3} sx={{ backgroundColor: "#f7f9fb", minHeight: "100vh" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MDTypography variant="h4" sx={{ color: "#1f2a44", fontWeight: 800, mb: 2 }}>
              Student Dashboard
            </MDTypography>
          </Grid>

          {/* Enrolled Courses */}
          <Grid item xs={12}>
            <MDTypography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Enrolled Courses
            </MDTypography>
            <Grid container spacing={2}>
              {enrolledCourses.length === 0 ? (
                <Grid item xs={12}>
                  <Typography>No courses enrolled yet.</Typography>
                </Grid>
              ) : (
                enrolledCourses.map((course) => (
                  <Grid item xs={12} sm={6} md={4} key={course._id}>
                    <Card
                      onClick={() =>
                        navigate(`/student/viewCourseDetails/${course._id}`, { state: { course } })
                      }
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        cursor: "pointer",
                        background: "#fff",
                        border: "1px solid #eef1f5",
                        "&:hover": { transform: "translateY(-3px)" },
                      }}
                    >
                      <Typography variant="subtitle1">{course.course_name}</Typography>
                      <Typography variant="caption">{course.teachers_user_id}</Typography>
                      <Box mt={1}>
                        <Chip
                          label="Enrolled"
                          size="small"
                          icon={<CheckCircleIcon style={{ fontSize: 16 }} />}
                          color="success"
                        />
                      </Box>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Grid>

          {/* Choose a Course */}
          <Grid item xs={12} md={6}>
            <MDTypography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Choose a Course
            </MDTypography>
            <Card sx={{ p: 2, borderRadius: 2, background: "#fff", border: "1px solid #eef1f5" }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Select
                  value={selectedCourseId}
                  onChange={(e) => {
                    setSelectedCourseId(e.target.value);
                    handleOpenDetails(e.target.value);
                  }}
                  displayEmpty
                  sx={{ width: "100%", pl: 1, height: "40px" }}
                >
                  <MenuItem value="">Select a course to enroll</MenuItem>
                  {availableCourses.map((c) => (
                    <MenuItem key={c._id} value={c._id}>
                      {c.course_name} — {c.teachers_user_id}
                    </MenuItem>
                  ))}
                </Select>
                <Button
                  variant="contained"
                  onClick={handleRequestCourse}
                  sx={{ whiteSpace: "nowrap", px: 2, height: "40px", color: "#fff" }}
                  startIcon={<AddCircleIcon />}
                >
                  Request
                </Button>
              </Box>
              <Typography variant="caption" mt={1}>
                Slots left: {5 - (enrolledCourses.length + pendingCourses.length)}
              </Typography>
            </Card>
          </Grid>

          {/* Pending Requests */}
          <Grid item xs={12}>
            <MDTypography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Pending Approval
            </MDTypography>
            <Grid container spacing={2}>
              {pendingCourses.length === 0 ? (
                <Grid item xs={12}>
                  <Typography>No pending requests.</Typography>
                </Grid>
              ) : (
                pendingCourses.map((course) => (
                  <Grid item xs={12} sm={6} md={4} key={course._id}>
                    <Card
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        background: "#fff",
                        border: "1px solid #eef1f5",
                        cursor: "pointer",
                      }}
                      onClick={() => handleOpenDetails(course._id)}
                    >
                      <Typography variant="subtitle1">{course.course_name}</Typography>
                      <Typography variant="caption">{course.teachers_user_id}</Typography>
                      <Box mt={1}>
                        <Chip
                          label="Pending"
                          size="small"
                          icon={<AccessTimeIcon style={{ fontSize: 16 }} />}
                          sx={{ backgroundColor: "#fff4d6", color: "#8a6d00" }}
                        />
                      </Box>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Grid>
        </Grid>
      </MDBox>

      {/* Course Details Dialog */}
      <Dialog open={!!showCourseDetails} onClose={handleCloseDetails} fullWidth maxWidth="sm">
        <DialogTitle sx={{ background: "#2e3b55", color: "#fff", fontWeight: 600 }}>
          Course Details
        </DialogTitle>
        <DialogContent sx={{ background: "#fafbfc" }}>
          {showCourseDetails && (
            <>
              <Typography variant="h6">{showCourseDetails.course_name}</Typography>
              <Typography variant="body2" mt={1}>
                Teacher: {showCourseDetails.teachers_user_id}
              </Typography>
              <Typography variant="body2" mt={1}>
                {showCourseDetails.course_description}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ background: "#fafbfc" }}>
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
