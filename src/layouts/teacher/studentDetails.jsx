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
  const { id } = useParams(); // Student ID from route
  const navigate = useNavigate();

  // Dummy student data with rollNo added
  const students = [
    { name: "Sophia Clark", email: "sophia@example.com", rollNo: "R101", enrolled: 4, pending: 1 },
    { name: "Ethan Miller", email: "ethan@example.com", rollNo: "R102", enrolled: 3, pending: 2 },
    { name: "Olivia Davis", email: "olivia@example.com", rollNo: "R103", enrolled: 5, pending: 0 },
    { name: "Liam Wilson", email: "liam@example.com", rollNo: "R104", enrolled: 2, pending: 1 },
    { name: "Ava Martinez", email: "ava@example.com", rollNo: "R105", enrolled: 6, pending: 0 },
  ];

  const student = students[id] || {
    name: "Unknown",
    email: "-",
    rollNo: "-",
    enrolled: 0,
    pending: 0,
  };

  // generate a simple avatar URL based on email; will fallback to initials if image fails to load
  const photoUrl =
    student.email && student.email !== "-"
      ? `https://i.pravatar.cc/150?u=${encodeURIComponent(student.email)}`
      : null;

  // Dummy assignments data
  const assignments = [
    { assignment: "Math Homework 1", status: "Submitted" },
    { assignment: "English Essay", status: "Graded" },
    { assignment: "Science Project", status: "Not Submitted" },
    { assignment: "History Assignment", status: "Expired" },
  ];

  // compute assignment counts
  const completedStatuses = ["Submitted", "Graded"];
  const completedAssignments = assignments.filter((a) => completedStatuses.includes(a.status));
  const pendingAssignments = assignments.filter((a) => a.status === "Not Submitted");
  const expiredAssignments = assignments.filter((a) => a.status === "Expired");

  const completedCount = completedAssignments.length;
  const pendingCount = pendingAssignments.length;
  const expiredCount = expiredAssignments.length;

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

  // Get assignments list by category
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
          {/* Student Info Card with Avatar */}
          <Grid item xs={12} md={8} lg={6}>
            <Card sx={{ p: 4, borderRadius: "16px", boxShadow: 4 }}>
              <MDTypography variant="h4" fontWeight="bold" gutterBottom>
                👩‍🎓 Student Details
              </MDTypography>
              <Divider sx={{ my: 2 }} />

              {/* Avatar + basic info */}
              <MDBox display="flex" alignItems="center" mb={2}>
                <Avatar
                  src={photoUrl || undefined}
                  alt={student.name}
                  sx={{ width: 80, height: 80, mr: 2 }}
                >
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </Avatar>

                <MDBox>
                  <MDTypography variant="h6">Name:</MDTypography>
                  <MDTypography variant="body1" color="text">
                    {student.name}
                  </MDTypography>

                  <MDBox mt={1}>
                    <MDTypography variant="h6">Email:</MDTypography>
                    <MDTypography variant="body1" color="text">
                      {student.email}
                    </MDTypography>
                  </MDBox>
                </MDBox>
              </MDBox>

              {/* Roll Number */}
              <MDBox mb={2}>
                <MDTypography variant="h6">Roll No:</MDTypography>
                <MDTypography variant="body1" color="text">
                  {student.rollNo}
                </MDTypography>
              </MDBox>

              {/* Courses Enrolled */}
              <MDBox mb={2}>
                <MDTypography variant="h6">Courses Enrolled:</MDTypography>
                <MDTypography variant="body1" color="text">
                  {student.enrolled}
                </MDTypography>
              </MDBox>

              {/* Pending Requests */}
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

          {/* Assignments Section with counts and details on click */}
          <Grid item xs={12} md={10} lg={8}>
            <Card sx={{ p: 4, borderRadius: "16px", boxShadow: 4 }}>
              <MDTypography variant="h5" fontWeight="bold" gutterBottom>
                📑 Assignments Summary
              </MDTypography>
              <Divider sx={{ my: 2 }} />

              {/* Summary counts with clickable chips */}
              <MDBox display="flex" alignItems="center" gap={2} mb={2}>
                <Chip
                  label={`Completed: ${completedCount}`}
                  color="success"
                  size="small"
                  onClick={() => setSelectedCategory("Completed")}
                />
                <Chip
                  label={`Pending: ${pendingCount}`}
                  color="warning"
                  size="small"
                  onClick={() => setSelectedCategory("Pending")}
                />
                <Chip
                  label={`Expired: ${expiredCount}`}
                  color="error"
                  size="small"
                  onClick={() => setSelectedCategory("Expired")}
                />
              </MDBox>

              {/* Show assignments list for selected category */}
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
