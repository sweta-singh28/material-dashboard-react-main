import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeacherCourses } from "../../redux/teacherDashboard/teacherDashboardThunks";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import { useSearch } from "context";

function TeacherDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useSearch();

  const { teacherData, loading, error } = useSelector((state) => state.teacherDashboard);

  useEffect(() => {
    dispatch(fetchTeacherCourses());
  }, [dispatch]);

  // Backend returns: [ { _id, course_name, course_status, ... } ]
  const courses = teacherData?.courses || [];

  console.log("Courses in dashboard:", courses);

  const filteredCourses = courses.filter((course) =>
    course.course_name?.toLowerCase().includes(search.toLowerCase())
  );

  // Chart Data (use placeholders since backend doesn’t yet send student counts)
  const chartData = courses.map((c) => ({
    course: c.course_name,
    students: c.course_active_students ? Object.keys(c.course_active_students).length : 0,
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
                Welcome back! Here’s an overview of your courses.
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
              {loading && (
                <Grid item xs={12}>
                  <MDTypography>Loading...</MDTypography>
                </Grid>
              )}
              {error && (
                <Grid item xs={12}>
                  <MDTypography color="error">{error}</MDTypography>
                </Grid>
              )}

              {!loading && !error && filteredCourses.length > 0
                ? filteredCourses.map((course) => (
                    <Grid item xs={12} sm={6} md={4} key={course._id}>
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
                        onClick={() => navigate(`/teacher/subjectDetails/${course._id}`)}
                      >
                        <MDTypography variant="h6" fontWeight="medium" gutterBottom>
                          {course.course_name}
                        </MDTypography>
                        <MDTypography variant="body2" color="textSecondary" gutterBottom>
                          {course.course_description}
                        </MDTypography>
                        <MDBox display="flex" justifyContent="space-between" mt={1}>
                          <MDBox>
                            <MDTypography variant="subtitle2" color="textSecondary">
                              Status
                            </MDTypography>
                            <MDTypography variant="body2" fontWeight="bold">
                              {course.course_status}
                            </MDTypography>
                          </MDBox>
                          <MDBox>
                            <MDTypography variant="subtitle2" color="textSecondary">
                              Students
                            </MDTypography>
                            <MDTypography variant="body2" fontWeight="bold">
                              {chartData.find((c) => c.course === course.course_name)?.students ||
                                0}
                            </MDTypography>
                          </MDBox>
                        </MDBox>
                      </Card>
                    </Grid>
                  ))
                : !loading &&
                  !error && (
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
