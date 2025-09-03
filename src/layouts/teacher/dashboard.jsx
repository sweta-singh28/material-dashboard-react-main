// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TeacherDashboard() {
  const navigate = useNavigate();

  // Dummy course data
  const courses = [
    { id: 1, name: "Math 101", students: 120, pending: 8 },
    { id: 2, name: "History 202", students: 95, pending: 5 },
    { id: 3, name: "English 101", students: 150, pending: 12 },
    { id: 4, name: "Science 101", students: 130, pending: 6 },
    { id: 5, name: "Art History", students: 70, pending: 2 },
  ];

  // Chart data
  const chartData = courses.map((c) => ({
    course: c.name,
    students: c.students,
  }));

  // Modal state
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleOpen = (course) => {
    setSelectedCourse(course);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedCourse(null);
    setOpen(false);
  };

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
              {courses.map((course) => (
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
                    onClick={() => handleOpen(course)}
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

      {/* Modal for Course Details */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedCourse?.name} - Course Details</DialogTitle>
        <DialogContent dividers>
          {selectedCourse && (
            <MDBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={2}
              sx={{
                border: "1px solid #eee",
                borderRadius: "12px",
                background: "#fafafa",
              }}
            >
              {/* Left side - Students */}
              <MDTypography variant="body1" display="flex" alignItems="center" gap={1}>
                👥 {selectedCourse.students} Students
              </MDTypography>

              {/* Right side - Pending Badge */}
              <MDBox
                sx={{
                  background: "#fce4ec",
                  color: "#c62828",
                  px: 2,
                  py: 0.5,
                  borderRadius: "12px",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                }}
              >
                {selectedCourse.pending} Pending
              </MDBox>
            </MDBox>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </DashboardLayout>
  );
}

export default TeacherDashboard;
