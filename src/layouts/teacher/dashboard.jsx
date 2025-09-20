import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "context";

function TeacherDashboard() {
  const navigate = useNavigate();
  const { search } = useSearch();

  const allCourses = [
    {
      idCourses: "c1",
      course_name: "Math 101",
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

  const teacherId = "teacher-123";

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
        id: c.idCourses,
        name: c.course_name,
        students: activeCount,
        pending: pendingCount,
      };
    });

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );

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
            <MDBox>
              <MDTypography variant="h4" fontWeight="bold">
                Dashboard
              </MDTypography>
              <MDTypography variant="body2" color="textSecondary">
                Welcome back, Ms. Johnson! Here’s an overview of your courses.
              </MDTypography>
            </MDBox>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#1976d2",
                color: "#ffffff",
                fontWeight: "bold",
                borderRadius: "10px",
                textTransform: "none",
                px: 3,
                py: 1,
                "& .MuiButton-label": {
                  color: "#ffffff",
                },
                "&:hover": { backgroundColor: "#1565c0" },
              }}
              onClick={() => navigate("/addNewCourse")}
            >
              + Upload New Course
            </Button>
          </Grid>

          {/* Enrollment Chart */}
          <Grid item xs={12}>
            <Card
              sx={{
                p: 3,
                borderRadius: "12px",
                boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",
              }}
            >
              <MDTypography variant="h6" fontWeight="medium" gutterBottom>
                Student Enrollment
              </MDTypography>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={chartData} barCategoryGap="20%" barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="course" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip
                    wrapperStyle={{ fontSize: "0.8rem" }}
                    cursor={{ fill: "rgba(0,0,0,0.02)" }}
                  />
                  <Bar
                    dataKey="students"
                    fill="#1976d2"
                    radius={[4, 4, 0, 0]}
                    barSize={36}
                    isAnimationActive={false}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>

          {/* Courses Section */}
          <Grid item xs={12}>
            <MDTypography variant="h6" fontWeight="medium" gutterBottom>
              My Courses
            </MDTypography>
            <Grid container spacing={3}>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <Grid item xs={12} sm={6} md={4} key={course.id}>
                    <Card
                      sx={{
                        p: 3,
                        borderRadius: "12px",
                        boxShadow: "0px 3px 12px rgba(0,0,0,0.08)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                        },
                      }}
                      onClick={() => navigate(`/teacher/subjectDetails/${course.id}`)}
                    >
                      <MDTypography variant="h6" fontWeight="medium" gutterBottom>
                        {course.name}
                      </MDTypography>
                      <MDBox display="flex" justifyContent="space-between" mt={1}>
                        <MDBox>
                          <MDTypography variant="subtitle2" color="textSecondary">
                            Pending Students
                          </MDTypography>
                          <MDTypography variant="body2" fontWeight="bold">
                            {course.pending}
                          </MDTypography>
                        </MDBox>
                        <MDBox>
                          <MDTypography variant="subtitle2" color="textSecondary">
                            Enrolled Students
                          </MDTypography>
                          <MDTypography variant="body2" fontWeight="bold">
                            {course.students}
                          </MDTypography>
                        </MDBox>
                      </MDBox>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <MDBox textAlign="center" py={5}>
                    <MDTypography variant="body2" color="text">
                      No courses available
                    </MDTypography>
                  </MDBox>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default TeacherDashboard;
