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

// React Router
import { useNavigate } from "react-router-dom";

function TeacherDashboard() {
  const navigate = useNavigate();

  // Sample course progress data
  const data = [
    { course: "Maths", progress: 80 },
    { course: "Science", progress: 65 },
    { course: "English", progress: 90 },
    { course: "History", progress: 55 },
    { course: "Computer", progress: 70 },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          {/* Header + Upload Button */}
          <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
            <MDTypography variant="h4">📊 Teacher Dashboard</MDTypography>
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: "12px", textTransform: "none" }}
              onClick={() => navigate("/addNewCourse")}
            >
              ➕ Upload New Course
            </Button>
          </Grid>

          {/* Progress Graph */}
          <Grid item xs={12}>
            <Card sx={{ p: 3, borderRadius: "16px" }}>
              <MDTypography variant="h6" gutterBottom>
                Student Progress (Course-wise)
              </MDTypography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="course" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="progress" fill="#1E88E5" barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default TeacherDashboard;
