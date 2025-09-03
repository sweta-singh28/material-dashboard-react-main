// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// React Router
import { useParams, useNavigate } from "react-router-dom";

// Charts
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function StudentDetails() {
  const { id } = useParams(); // Student ID from route
  const navigate = useNavigate();

  // Dummy student data
  const students = [
    { name: "Sophia Clark", email: "sophia@example.com", enrolled: 4, pending: 1 },
    { name: "Ethan Miller", email: "ethan@example.com", enrolled: 3, pending: 2 },
    { name: "Olivia Davis", email: "olivia@example.com", enrolled: 5, pending: 0 },
    { name: "Liam Wilson", email: "liam@example.com", enrolled: 2, pending: 1 },
    { name: "Ava Martinez", email: "ava@example.com", enrolled: 6, pending: 0 },
  ];

  const student = students[id] || { name: "Unknown", email: "-", enrolled: 0, pending: 0 };

  // Dummy subject performance data (marks out of 100)
  const performanceData = [
    { subject: "Math", score: 85 },
    { subject: "Science", score: 72 },
    { subject: "English", score: 90 },
    { subject: "History", score: 60 },
    { subject: "Computer", score: 95 },
  ];

  // Dummy assignments data
  const assignments = [
    { assignment: "Math Homework 1", status: "Submitted" },
    { assignment: "English Essay", status: "Graded" },
    { assignment: "Science Project", status: "Not Submitted" },
  ];

  // Helper for status chip color
  const getStatusChip = (status) => {
    switch (status) {
      case "Submitted":
        return <Chip label="Submitted" color="warning" size="small" />;
      case "Graded":
        return <Chip label="Graded" color="success" size="small" />;
      case "Not Submitted":
        return <Chip label="Not Submitted" color="error" size="small" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container justifyContent="center" spacing={3}>
          {/* Student Info Card */}
          <Grid item xs={12} md={8} lg={6}>
            <Card sx={{ p: 4, borderRadius: "16px", boxShadow: 4 }}>
              <MDTypography variant="h4" fontWeight="bold" gutterBottom>
                👩‍🎓 Student Details
              </MDTypography>
              <Divider sx={{ my: 2 }} />

              <MDBox mb={2}>
                <MDTypography variant="h6">Name:</MDTypography>
                <MDTypography variant="body1" color="text">
                  {student.name}
                </MDTypography>
              </MDBox>

              <MDBox mb={2}>
                <MDTypography variant="h6">Email:</MDTypography>
                <MDTypography variant="body1" color="text">
                  {student.email}
                </MDTypography>
              </MDBox>

              <MDBox mb={2}>
                <MDTypography variant="h6">Courses Enrolled:</MDTypography>
                <MDTypography variant="body1" color="text">
                  {student.enrolled}
                </MDTypography>
              </MDBox>

              <MDBox mb={2}>
                <MDTypography variant="h6">Pending Requests:</MDTypography>
                <MDTypography variant="body1" color="error">
                  {student.pending}
                </MDTypography>
              </MDBox>

              {/* Back Button */}
              <MDBox mt={3} display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/teacher/studentRegister")}
                  sx={{ borderRadius: "12px", textTransform: "none" }}
                >
                  ← Back to Students
                </Button>
              </MDBox>
            </Card>
          </Grid>

          {/* Subject Performance Graph */}
          <Grid item xs={12} md={10} lg={8}>
            <Card sx={{ p: 4, borderRadius: "16px", boxShadow: 4 }}>
              <MDTypography variant="h5" fontWeight="bold" gutterBottom>
                📊 Subject Performance
              </MDTypography>
              <Divider sx={{ my: 2 }} />
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#2196f3" name="Score" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>

          {/* Assignments Section */}
          <Grid item xs={12} md={10} lg={8}>
            <Card sx={{ p: 4, borderRadius: "16px", boxShadow: 4 }}>
              <MDTypography variant="h5" fontWeight="bold" gutterBottom>
                📑 Assignments
              </MDTypography>
              <Divider sx={{ my: 2 }} />

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>Assignment</strong>
                      </TableCell>
                      <TableCell align="right">
                        <strong>Status</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {assignments.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.assignment}</TableCell>
                        <TableCell align="right">{getStatusChip(row.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default StudentDetails;
