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

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useMaterialUIController } from "context";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

/*
  IMPORTANT:
  - The `db` object below mirrors your database schema exactly (table/field names).
  - Replace `const db = {...}` with an API fetch and set the same-shaped object as the response.
  - Keys and relations:
      Users.user_id  <-> Courses.teachers_user_id
      Courses.course_active_students (JSON array of user ids)
      Courses.course_pending_students (JSON array of user ids)
*/

function StudentDashboard() {
  const navigate = useNavigate();
  const [controller] = useMaterialUIController();
  const { search } = controller;

  // ---------- Sample DB object matching your schema ----------
  // Replace this whole block with an API call that returns the same JSON structure.
  const db = useMemo(
    () => ({
      Users: [
        {
          email: "alice@student.edu",
          password: "hashed_pw",
          create_time: "2025-01-01T10:00:00Z",
          first_name: "Alice",
          last_name: "Kumar",
          user_id: "user-001", // CHAR(36) in real DB
          user_role: "student",
          user_picture: null,
          qualifications: "BSc",
        },
        {
          email: "raoji@uni.edu",
          password: "hashed_pw",
          create_time: "2018-08-10T08:00:00Z",
          first_name: "Rao",
          last_name: "Subramanian",
          user_id: "t-101",
          user_role: "teacher",
          user_picture: null,
          qualifications: "PhD",
        },
        {
          email: "iyer@uni.edu",
          password: "hashed_pw",
          create_time: "2017-03-20T09:00:00Z",
          first_name: "Anita",
          last_name: "Iyer",
          user_id: "t-102",
          user_role: "teacher",
          user_picture: null,
          qualifications: "PhD",
        },
        {
          email: "singh@uni.edu",
          password: "hashed_pw",
          create_time: "2016-05-12T09:00:00Z",
          first_name: "Ramesh",
          last_name: "Singh",
          user_id: "t-103",
          user_role: "teacher",
          user_picture: null,
          qualifications: "PhD",
        },
        {
          email: "patel@uni.edu",
          password: "hashed_pw",
          create_time: "2016-05-12T09:00:00Z",
          first_name: "Nisha",
          last_name: "Patel",
          user_id: "t-104",
          user_role: "teacher",
          user_picture: null,
          qualifications: "MA",
        },
        {
          email: "verma@uni.edu",
          password: "hashed_pw",
          create_time: "2016-05-12T09:00:00Z",
          first_name: "Arjun",
          last_name: "Verma",
          user_id: "t-105",
          user_role: "teacher",
          user_picture: null,
          qualifications: "MSc",
        },
        {
          email: "gupta@uni.edu",
          password: "hashed_pw",
          create_time: "2016-05-12T09:00:00Z",
          first_name: "Sonia",
          last_name: "Gupta",
          user_id: "t-106",
          user_role: "teacher",
          user_picture: null,
          qualifications: "PhD",
        },
      ],
      Courses: [
        {
          idCourses: "c1",
          course_name: "Mathematics I",
          course_pre_requisites: "",
          course_syllabus: JSON.stringify({ topics: ["Algebra", "Calculus"] }),
          course_code: "MATH101",
          course_status: "active",
          course_description: "Introductory mathematics",
          course_thumbnail: "https://via.placeholder.com/80x80.png?text=Math",
          course_current_completed: JSON.stringify([]),
          course_active_students: JSON.stringify(["user-001"]), // enrolled student ids
          course_pending_students: JSON.stringify([]), // user ids pending teacher approval
          teachers_user_id: "t-101",
        },
        {
          idCourses: "c2",
          course_name: "Physics I",
          course_pre_requisites: "",
          course_syllabus: JSON.stringify({ topics: ["Mechanics", "Waves"] }),
          course_code: "PHYS101",
          course_status: "active",
          course_description: "Introductory physics",
          course_thumbnail: "https://via.placeholder.com/80x80.png?text=Phys",
          course_current_completed: JSON.stringify([]),
          course_active_students: JSON.stringify(["user-001"]), // Alice is enrolled
          course_pending_students: JSON.stringify([]),
          teachers_user_id: "t-102",
        },
        {
          idCourses: "c3",
          course_name: "Chemistry",
          course_pre_requisites: "",
          course_syllabus: JSON.stringify({ topics: ["Organic", "Inorganic"] }),
          course_code: "CHEM101",
          course_status: "active",
          course_description: "Introductory chemistry",
          course_thumbnail: "https://via.placeholder.com/80x80.png?text=Chem",
          course_current_completed: JSON.stringify([]),
          course_active_students: JSON.stringify([]),
          course_pending_students: JSON.stringify([]),
          teachers_user_id: "t-103",
        },
        {
          idCourses: "c4",
          course_name: "English",
          course_pre_requisites: "",
          course_syllabus: JSON.stringify({ topics: ["Grammar", "Composition"] }),
          course_code: "ENG101",
          course_status: "active",
          course_description: "Introductory English",
          course_thumbnail: "https://via.placeholder.com/80x80.png?text=Eng",
          course_current_completed: JSON.stringify([]),
          course_active_students: JSON.stringify([]),
          course_pending_students: JSON.stringify([]),
          teachers_user_id: "t-104",
        },
        {
          idCourses: "c5",
          course_name: "Computer Science",
          course_pre_requisites: "",
          course_syllabus: JSON.stringify({ topics: ["Programming", "Data Structures"] }),
          course_code: "CS101",
          course_status: "active",
          course_description: "Introductory CS",
          course_thumbnail: "https://via.placeholder.com/80x80.png?text=CS",
          course_current_completed: JSON.stringify([]),
          course_active_students: JSON.stringify([]),
          course_pending_students: JSON.stringify([]),
          teachers_user_id: "t-105",
        },
        {
          idCourses: "c6",
          course_name: "Biology",
          course_pre_requisites: "",
          course_syllabus: JSON.stringify({ topics: ["Cells", "Genetics"] }),
          course_code: "BIO101",
          course_status: "active",
          course_description: "Introductory Biology",
          course_thumbnail: "https://via.placeholder.com/80x80.png?text=Bio",
          course_current_completed: JSON.stringify([]),
          course_active_students: JSON.stringify([]),
          course_pending_students: JSON.stringify([]),
          teachers_user_id: "t-106",
        },
      ],
      // You can also include Assignment_Notes and SubmittedAssignments here
      Assignment_Notes: [],
      SubmittedAssignments: [],
    }),
    []
  );

  // ---------- End sample DB ----------

  // Simulated "current logged-in user" from Users table:
  // In production replace with auth / API-provided current user
  const currentUser = db.Users.find((u) => u.user_id === "user-001");

  // Helper: convert DB courses into UI-friendly course objects
  const allCourses = useMemo(() => {
    return db.Courses.map((course) => {
      const teacher = db.Users.find((u) => u.user_id === course.teachers_user_id);
      // course_active_students and course_pending_students stored as JSON strings
      let activeArr = [];
      let pendingArr = [];
      try {
        activeArr = JSON.parse(course.course_active_students || "[]");
      } catch (e) {
        activeArr = [];
      }
      try {
        pendingArr = JSON.parse(course.course_pending_students || "[]");
      } catch (e) {
        pendingArr = [];
      }
      return {
        id: course.idCourses,
        title: course.course_name,
        teacher: teacher ? `${teacher.first_name} ${teacher.last_name}` : "Unknown",
        teacher_id: course.teachers_user_id,
        thumbnail: course.course_thumbnail || null,
        description: course.course_description,
        active_students: activeArr,
        pending_students: pendingArr,
        raw: course,
      };
    });
  }, [db]);

  // Build lists from DB for the current student
  const initialEnrolled = useMemo(
    () => allCourses.filter((c) => c.active_students.includes(currentUser.user_id)).map((c) => c),
    [allCourses, currentUser]
  );
  const initialPending = useMemo(
    () => allCourses.filter((c) => c.pending_students.includes(currentUser.user_id)).map((c) => c),
    [allCourses, currentUser]
  );

  // UI state
  const [enrolledCourses, setEnrolledCourses] = useState(initialEnrolled);
  const [pendingRequests, setPendingRequests] = useState(initialPending);
  const [selected, setSelected] = useState("");
  const [showCourseDetails, setShowCourseDetails] = useState(null);

  // Open details for a course id
  const handleOpenDetails = (courseId) => {
    const course = allCourses.find((c) => c.id === courseId);
    setShowCourseDetails(course || null);
  };

  const handleCloseDetails = () => {
    setShowCourseDetails(null);
    setSelected("");
  };

  // Request course: add to pendingRequests only in UI (server should persist)
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

    // UI-only update. In production call API to add currentUser.user_id to
    // course.course_pending_students and re-fetch or update local db.
    setPendingRequests((prev) => [...prev, course]);
    handleCloseDetails();
  };

  const handleView = (course) => {
    // Keep existing routing: navigate with course in state
    navigate("/student/viewCourseDetails", { state: { course } });
  };

  const allSelectedCourseIds = [
    ...enrolledCourses.map((c) => c.id),
    ...pendingRequests.map((c) => c.id),
  ];

  // Apply global search filter
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
      <MDBox py={3}>
        <Grid container spacing={3}>
          {/* Section 1: Enrolled Courses */}
          <Grid item xs={12}>
            <MDTypography variant="h5" gutterBottom>
              Enrolled Courses
            </MDTypography>
            <Grid container spacing={3}>
              {filteredEnrolled.length === 0 ? (
                <Grid item xs={12}>
                  <MDTypography variant="body2">No courses enrolled yet.</MDTypography>
                </Grid>
              ) : (
                filteredEnrolled.map((course) => (
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

          {/* Section 3: Pending Requests */}
          <Grid item xs={12}>
            <MDTypography variant="h5" gutterBottom>
              Pending Approval from Teacher
            </MDTypography>
            <Grid container spacing={3}>
              {filteredPending.length === 0 ? (
                <Grid item xs={12}>
                  <MDTypography variant="body2">No pending requests.</MDTypography>
                </Grid>
              ) : (
                filteredPending.map((course) => (
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
