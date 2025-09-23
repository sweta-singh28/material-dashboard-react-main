import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMaterialUIController } from "context";

// Material UI & Dashboard components
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
import Chip from "@mui/material/Chip";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { fetchStudentDashboard } from "../../redux/studentDashboard/studentDashboardThunks";

// -------------------- Sample JSON (Commented) --------------------
/*
const db = useMemo(() => ({
  courses: [
    {
      user_id: "user-001",
      activeCourses: [
        { idCourses: "c1", course_name: "Introduction to CS", course_description: "Basics", course_thumbnail: "/thumb1.png", course_active_students: ["user-001"], course_pending_students: ["user-009"], teachers_user_id: "Prof A" },
        { idCourses: "c2", course_name: "Calculus I", course_description: "Math basics", course_thumbnail: "/thumb2.png", course_active_students: ["user-001"], course_pending_students: [], teachers_user_id: "Prof B" },
      ],
      pendingCourses: [
        { idCourses: "c3", course_name: "Physics", course_description: "Physics course", course_thumbnail: "/thumb3.png", course_active_students: [], course_pending_students: ["user-001"], teachers_user_id: "Prof C" },
      ],
      expiredCourses: [],
    },
  ],
}), []);
*/
// -----------------------------------------------------------------

function StudentDashboard() {
  const navigate = useNavigate();
  const [controller] = useMaterialUIController();
  const { search } = controller;
  const dispatch = useDispatch();

  // Fetch data from Redux
  const dashboardData = useSelector((state) => state.studentDashboard.data);

  useEffect(() => {
    dispatch(fetchStudentDashboard());
  }, [dispatch]);

  const db = dashboardData.length ? dashboardData : undefined;

  const currentUser = db?.courses?.find((c) => c.user_id === "user-001");

  const allCourses = useMemo(() => {
    if (!currentUser) return [];
    const courseList = [
      ...currentUser.activeCourses,
      ...currentUser.pendingCourses,
      ...currentUser.expiredCourses,
    ];
    return courseList.map((course) => ({
      id: course.idCourses,
      title: course.course_name,
      teacher: course.teachers_user_id || "Unknown",
      thumbnail: course.course_thumbnail || null,
      description: course.course_description,
      active_students: course.course_active_students || [],
      pending_students: course.course_pending_students || [],
    }));
  }, [db, currentUser]);

  const initialEnrolled = useMemo(
    () => allCourses.filter((c) => c.active_students.includes(currentUser?.user_id)),
    [allCourses, currentUser]
  );
  const initialPending = useMemo(
    () => allCourses.filter((c) => c.pending_students.includes(currentUser?.user_id)),
    [allCourses, currentUser]
  );

  const [enrolledCourses, setEnrolledCourses] = useState(initialEnrolled);
  const [pendingRequests, setPendingRequests] = useState(initialPending);
  const [selected, setSelected] = useState("");
  const [showCourseDetails, setShowCourseDetails] = useState(null);

  const handleOpenDetails = (courseId) => {
    const course = allCourses.find((c) => c.id === courseId);
    setShowCourseDetails(course || null);
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
    setPendingRequests((prev) => [...prev, course]);
    handleCloseDetails();
  };

  const handleView = (course) => {
    navigate("/student/viewCourseDetails", { state: { course } });
  };

  const allSelectedCourseIds = [
    ...enrolledCourses.map((c) => c.id),
    ...pendingRequests.map((c) => c.id),
  ];

  const filteredEnrolled = enrolledCourses.filter(
    (c) =>
      c.title.toLowerCase().includes((search || "").toLowerCase()) ||
      c.teacher.toLowerCase().includes((search || "").toLowerCase())
  );

  const filteredPending = pendingRequests.filter(
    (c) =>
      c.title.toLowerCase().includes((search || "").toLowerCase()) ||
      c.teacher.toLowerCase().includes((search || "").toLowerCase())
  );

  const availableCourses = allCourses
    .filter((c) => !allSelectedCourseIds.includes(c.id))
    .filter(
      (c) =>
        c.title.toLowerCase().includes((search || "").toLowerCase()) ||
        c.teacher.toLowerCase().includes((search || "").toLowerCase())
    );

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={4} px={3} sx={{ backgroundColor: "#f7f9fb", minHeight: "100vh" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MDTypography variant="h4" sx={{ color: "#1f2a44", fontWeight: 800, mb: 1 }}>
              Student Dashboard
            </MDTypography>
          </Grid>

          {/* Enrolled Courses */}
          <Grid item xs={12}>
            <MDTypography variant="h6" sx={{ color: "#2e3b55", fontWeight: 700, mb: 2 }}>
              Enrolled Courses
            </MDTypography>
            <Grid container spacing={2}>
              {filteredEnrolled.length === 0 ? (
                <Grid item xs={12}>
                  <MDTypography>No courses enrolled yet.</MDTypography>
                </Grid>
              ) : (
                filteredEnrolled.map((course) => (
                  <Grid item xs={12} sm={6} md={4} key={course.id}>
                    <Card
                      onClick={() => handleView(course)}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        textAlign: "left",
                        padding: 2,
                        borderRadius: 2,
                        cursor: "pointer",
                        background: "#fff",
                        border: "1px solid #eef1f5",
                        boxShadow: "0 6px 18px rgba(26, 34, 54, 0.04)",
                        "&:hover": { transform: "translateY(-4px)" },
                      }}
                    >
                      <Typography variant="subtitle1">{course.title}</Typography>
                      <Typography variant="caption">{course.teacher}</Typography>
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
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#2e3b55", mb: 2 }}>
              Choose a Course
            </Typography>
            <Card
              sx={{ padding: 2, borderRadius: 2, background: "#fff", border: "1px solid #eef1f5" }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Select
                  value={selected}
                  onChange={(e) => {
                    setSelected(e.target.value);
                    if (e.target.value) handleOpenDetails(e.target.value);
                  }}
                  displayEmpty
                  sx={{ width: "100%", pl: 1, height: "40px" }}
                >
                  <MenuItem value="">Select a course to enroll</MenuItem>
                  {availableCourses.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.title} — {c.teacher}
                    </MenuItem>
                  ))}
                </Select>
                <Button
                  variant="contained"
                  onClick={() => selected && handleOpenDetails(selected)}
                  sx={{ whiteSpace: "nowrap", px: 2, height: "40px", color: "#fff" }}
                >
                  Enroll Now
                </Button>
              </Box>
              <Typography variant="caption">
                Slots left: {5 - (enrolledCourses.length + pendingRequests.length)}
              </Typography>
            </Card>
          </Grid>

          {/* Pending Requests */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: "#2e3b55", fontWeight: 700, mb: 2 }}>
              Pending Approval
            </Typography>
            <Grid container spacing={2}>
              {filteredPending.length === 0 ? (
                <Grid item xs={12}>
                  <Typography>No pending requests.</Typography>
                </Grid>
              ) : (
                filteredPending.map((course) => (
                  <Grid item xs={12} sm={6} md={4} key={course.id}>
                    <Card
                      sx={{
                        padding: 2,
                        borderRadius: 2,
                        textAlign: "left",
                        background: "#fff",
                        border: "1px solid #eef1f5",
                      }}
                    >
                      <Typography variant="subtitle1">{course.title}</Typography>
                      <Typography variant="caption">{course.teacher}</Typography>
                      <Box mt={2}>
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

      <Dialog open={!!showCourseDetails} onClose={handleCloseDetails} fullWidth maxWidth="sm">
        <DialogTitle sx={{ background: "#2e3b55", color: "#fff", fontWeight: 600 }}>
          Course Details
        </DialogTitle>
        <DialogContent sx={{ background: "#fafbfc" }}>
          {showCourseDetails && (
            <Box>
              <Typography variant="h6" sx={{ color: "#2e3b55" }}>
                {showCourseDetails.title}
              </Typography>
              <Typography variant="body1" sx={{ color: "#6c757d" }}>
                Teacher: {showCourseDetails.teacher}
              </Typography>
              <Typography variant="body2" mt={2} sx={{ color: "#495057" }}>
                Requesting this course will add it to your pending requests. It will only be
                enrolled after teacher approval.
              </Typography>
            </Box>
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
