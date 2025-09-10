// TeacherDashboard.jsx

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Charts
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// React
import React from "react";
import { useNavigate } from "react-router-dom";

// Context
import { useSearch } from "context";

function TeacherDashboard() {
  const navigate = useNavigate();
  const { search } = useSearch();

  // --------------------------------------------------
  // Hardcoded JSON simulating your Courses table rows.
  // Fields match your DB schema where relevant:
  //  - idCourses, course_name, course_active_students (JSON array of user ids),
  //  - course_pending_students (JSON array of user ids), teachers_user_id
  // Replace `allCourses` / the filtering below with your API call that returns
  // only the courses for the specific teacher (by teacherId).
  // --------------------------------------------------
  const allCourses = [
    {
      idCourses: "c1",
      course_name: "Math 101",
      course_pre_requisites: "[]",
      course_syllabus: { chapters: ["Algebra", "Geometry"] },
      course_code: "MTH101",
      course_status: "active",
      course_description: "Basic Mathematics",
      course_thumbnail: "",
      course_current_completed: [],
      course_active_students: ["u1", "u2", "u3", "u4", "u5"],
      course_pending_students: ["u21", "u22"],
      teachers_user_id: "teacher-123",
    },
    {
      idCourses: "c2",
      course_name: "History 202",
      course_active_students: ["u6", "u7", "u8"],
      course_pending_students: ["u23"],
      teachers_user_id: "teacher-123",
    },
    {
      idCourses: "c3",
      course_name: "English 101",
      course_active_students: ["u9", "u10", "u11", "u12"],
      course_pending_students: ["u24", "u25", "u26"],
      teachers_user_id: "teacher-456",
    },
    {
      idCourses: "c4",
      course_name: "Science 101",
      course_active_students: ["u13", "u14"],
      course_pending_students: [],
      teachers_user_id: "teacher-123",
    },
    {
      idCourses: "c5",
      course_name: "Art History",
      course_active_students: ["u15"],
      course_pending_students: ["u27"],
      teachers_user_id: "teacher-789",
    },
  ];

  // Simulate the teacher id you'll query with (replace with actual teacher id / prop)
  const teacherId = "teacher-123";

  // Filter courses coming from the "API" by teacher id and compute counts from JSON arrays
  const courses = allCourses
    .filter((c) => c.teachers_user_id === teacherId)
    .map((c) => {
      const activeCount = Array.isArray(c.course_active_students)
        ? c.course_active_students.length
        : 0;
      const pendingCount = Array.isArray(c.course_pending_students)
        ? c.course_pending_students.length
        : 0;

      return {
        id: c.idCourses, // used for navigation
        name: c.course_name,
        // Keep 'students' as **active students count** (so UI/Chart reflect active users)
        students: activeCount,
        // Keep pending separately so the badge shows pending request count
        pending: pendingCount,
      };
    });

  // Search filter ONLY for course cards (searches the teacher's courses)
  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  // Chart data (shows teacher's courses)
  const chartData = courses.map((c) => ({
    course: c.name,
    students: c.students,
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          {/* Header + Upload Button */}
          <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
            <div>
              <MDTypography variant="h4" fontWeight="bold">
                Teacher Dashboard
              </MDTypography>
              <MDTypography variant="body2" color="textSecondary">
                Welcome back, Ms. Johnson! Here’s an overview of your courses.
              </MDTypography>
            </div>
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: "12px", textTransform: "none" }}
              onClick={() => navigate("/addNewCourse")}
            >
              ➕ Upload New Course
            </Button>
          </Grid>

          {/* Enrollment Chart */}
          <Grid item xs={12}>
            <Card sx={{ p: 3, borderRadius: "16px" }}>
              <MDTypography variant="h6" gutterBottom>
                Course Enrollment
              </MDTypography>
              <MDTypography variant="body2" color="textSecondary" mb={2}>
                Visualizing student enrollment across your courses.
              </MDTypography>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="course" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="students" fill="#f48fb1" radius={[6, 6, 0, 0]} barSize={45} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>

          {/* Course Cards */}
          <Grid item xs={12}>
            <MDTypography variant="h6" gutterBottom>
              Your Courses
            </MDTypography>
            <Grid container spacing={2}>
              {filteredCourses.map((course) => (
                <Grid item xs={12} sm={6} md={4} key={course.id}>
                  <Card
                    sx={{
                      p: 2.5,
                      borderRadius: "16px",
                      boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
                      cursor: "pointer",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
                      },
                    }}
                    onClick={() => navigate(`/teacher/subjectDetails/${course.id}`)}
                  >
                    <MDTypography variant="h6" gutterBottom>
                      {course.name}
                    </MDTypography>

                    {/* Students & Pending Badge */}
                    <MDBox display="flex" justifyContent="space-between" alignItems="center">
                      <MDTypography variant="body2" color="textSecondary">
                        👥 {course.students} Students
                      </MDTypography>
                      <MDBox
                        sx={{
                          background: "#fce4ec",
                          color: "#c62828",
                          px: 1.5,
                          py: 0.3,
                          borderRadius: "12px",
                          fontSize: "0.8rem",
                          fontWeight: 500,
                        }}
                      >
                        {course.pending} Pending
                      </MDBox>
                    </MDBox>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default TeacherDashboard;
