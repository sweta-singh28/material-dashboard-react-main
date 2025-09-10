// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
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
import { useState } from "react";

function StudentDetails() {
  const { id } = useParams(); // id will be user_id or roll_no
  const navigate = useNavigate();

  // Hardcoded JSON data (later replace with API call)
  const studentsData = [
    {
      user_id: "S101",
      full_name: "Sophia Clark",
      email: "sophia@example.com",
      roll_no: "R101",
      profile_picture: "https://i.pravatar.cc/150?u=sophia@example.com",
      courses_enrolled: ["Math 101", "English 101", "Science 101"],
      pending_requests: 1,
      assignments: [
        { assignment: "Math Homework 1", status: "Submitted" },
        { assignment: "English Essay", status: "Graded" },
        { assignment: "Science Project", status: "Not Submitted" },
        { assignment: "History Assignment", status: "Expired" },
      ],
    },
    {
      user_id: "S102",
      full_name: "Ethan Miller",
      email: "ethan@example.com",
      roll_no: "R102",
      profile_picture: "https://i.pravatar.cc/150?u=ethan@example.com",
      courses_enrolled: ["History 202", "Science 101"],
      pending_requests: 2,
      assignments: [
        { assignment: "History Essay", status: "Graded" },
        { assignment: "Science Lab Work", status: "Not Submitted" },
      ],
    },
  ];

  // Find student by user_id or roll_no
  const student = studentsData.find((s) => s.user_id === id || s.roll_no === id) || {
    full_name: "Unknown",
    email: "-",
    roll_no: "-",
    profile_picture: null,
    courses_enrolled: [],
    pending_requests: 0,
    assignments: [],
  };

  // Assignment categories
  const completedStatuses = ["Submitted", "Graded"];
  const completedAssignments = student.assignments.filter((a) =>
    completedStatuses.includes(a.status)
  );
  const pendingAssignments = student.assignments.filter((a) => a.status === "Not Submitted");
  const expiredAssignments = student.assignments.filter((a) => a.status === "Expired");

  const [selectedCategory, setSelectedCategory] = useState(null);

  // Helper for status chip color
  const getStatusChip = (status) => {
    switch (status) {
      case "Submitted":
        return <Chip label="Submitted" color="warning" size="small" />;
      case "Graded":
        return <Chip label="Graded" color="success" size="small" />;
      case "Not Submitted":
        return <Chip label="Not Submitted" color="error" size="small" />;
      case "Expired":
        return <Chip label="Expired" color="error" size="small" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  // Get assignments by selected category
  const getAssignmentsByCategory = () => {
    if (selectedCategory === "Completed") return completedAssignments;
    if (selectedCategory === "Pending") return pendingAssignments;
    if (selectedCategory === "Expired") return expiredAssignments;
    return [];
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

              {/* Avatar + Info */}
              <MDBox display="flex" alignItems="center" mb={2}>
                <Avatar
                  src={student.profile_picture || undefined}
                  alt={student.full_name}
                  sx={{ width: 80, height: 80, mr: 2 }}
                >
                  {student.full_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </Avatar>

                <MDBox>
                  <MDTypography variant="h6">Name:</MDTypography>
                  <MDTypography variant="body1">{student.full_name}</MDTypography>

                  <MDBox mt={1}>
                    <MDTypography variant="h6">Email:</MDTypography>
                    <MDTypography variant="body1">{student.email}</MDTypography>
                  </MDBox>
                </MDBox>
              </MDBox>

              {/* Roll No */}
              <MDBox mb={2}>
                <MDTypography variant="h6">Roll No:</MDTypography>
                <MDTypography variant="body1">{student.roll_no}</MDTypography>
              </MDBox>

              {/* Courses Enrolled */}
              <MDBox mb={2}>
                <MDTypography variant="h6">Courses Enrolled:</MDTypography>
                <MDTypography variant="body1">{student.courses_enrolled.length}</MDTypography>
              </MDBox>

              {/* Pending Requests */}
              <MDBox mb={2}>
                <MDTypography variant="h6">Pending Requests:</MDTypography>
                <MDTypography variant="body1" color="error">
                  {student.pending_requests}
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

          {/* Assignments Section */}
          <Grid item xs={12} md={10} lg={8}>
            <Card sx={{ p: 4, borderRadius: "16px", boxShadow: 4 }}>
              <MDTypography variant="h5" fontWeight="bold" gutterBottom>
                📑 Assignments Summary
              </MDTypography>
              <Divider sx={{ my: 2 }} />

              {/* Summary counts */}
              <MDBox display="flex" alignItems="center" gap={2} mb={2}>
                <Chip
                  label={`Completed: ${completedAssignments.length}`}
                  color="success"
                  size="small"
                  onClick={() => setSelectedCategory("Completed")}
                />
                <Chip
                  label={`Pending: ${pendingAssignments.length}`}
                  color="warning"
                  size="small"
                  onClick={() => setSelectedCategory("Pending")}
                />
                <Chip
                  label={`Expired: ${expiredAssignments.length}`}
                  color="error"
                  size="small"
                  onClick={() => setSelectedCategory("Expired")}
                />
              </MDBox>

              {/* Assignments list */}
              {selectedCategory && (
                <MDBox>
                  <MDTypography variant="h6" gutterBottom>
                    {selectedCategory} Assignments
                  </MDTypography>
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
                        {getAssignmentsByCategory().map((row, index) => (
                          <TableRow key={index}>
                            <TableCell>{row.assignment}</TableCell>
                            <TableCell align="right">{getStatusChip(row.status)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </MDBox>
              )}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default StudentDetails;
