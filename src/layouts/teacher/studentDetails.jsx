// StudentDetails.jsx

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Hardcoded JSON data
  const studentsData = [
    {
      user_id: "S101",
      full_name: "Sophia Clark",
      email: "sophia.clark@email.com",
      roll_no: "2023-SC-001",
      profile_picture: "https://i.pravatar.cc/150?u=sophia@example.com",
      courses_enrolled: ["Mathematics", "Physics", "Chemistry"],
      pending_requests: 0,
      assignments: [],
    },
    {
      user_id: "S102",
      full_name: "Liam Johnson",
      email: "liam.johnson@email.com",
      roll_no: "2023-LJ-002",
      profile_picture: "https://i.pravatar.cc/150?u=liam@example.com",
      courses_enrolled: ["Biology", "English", "History"],
      pending_requests: 1,
      assignments: [],
    },
  ];

  const assignmentSummaryData = [
    { subject: "Mathematics", completed: 10, expired: 2, pending: 3 },
    { subject: "Physics", completed: 8, expired: 1, pending: 4 },
    { subject: "Chemistry", completed: 12, expired: 0, pending: 1 },
  ];

  const student = studentsData.find((s) => s.user_id === id || s.roll_no === id) || {
    full_name: "Unknown",
    email: "-",
    roll_no: "-",
    profile_picture: null,
    courses_enrolled: [],
    pending_requests: 0,
    assignments: [],
  };

  const [selectedCategory, setSelectedCategory] = useState(null);

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

  // Unified Back Button style
  const backButtonSx = {
    background: "linear-gradient(135deg,#1A73E8 0%, #1565C0 100%)",
    color: "#fff",
    borderRadius: "8px",
    textTransform: "none",
    fontWeight: 700,
    fontSize: "13px",
    px: 4,
    py: 1.25,
    minWidth: 160,
    "&:hover": {
      background: "linear-gradient(135deg,#1765d8 0%, #0f55b0 100%)",
    },
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container justifyContent="center" spacing={3}>
          <Grid item xs={12}>
            <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <MDBox>
                <MDTypography variant="h4" fontWeight="medium">
                  Student Details
                </MDTypography>
                <MDTypography variant="body2" color="text">
                  View and manage student information and assignment progress.
                </MDTypography>
              </MDBox>

              <MDButton onClick={() => navigate("/teacher/studentRegister")} sx={backButtonSx}>
                ← Back to Students
              </MDButton>
            </MDBox>
          </Grid>

          {/* Left Column */}
          <Grid item xs={12} md={5}>
            {/* Student Info Card */}
            <Card sx={{ p: 3, mb: 3, borderRadius: "8px" }}>
              <MDBox display="flex" flexDirection="column" alignItems="center">
                <Avatar
                  src={student.profile_picture || undefined}
                  alt={student.full_name}
                  sx={{ width: 150, height: 150, mb: 2 }}
                />
                <MDTypography variant="h5" fontWeight="medium">
                  {student.full_name}
                </MDTypography>
                <MDTypography variant="body2" color="text">
                  {student.email}
                </MDTypography>
                <MDTypography variant="body2" color="text">
                  Roll Number: {student.roll_no}
                </MDTypography>
              </MDBox>
            </Card>

            {/* Courses Enrolled Card */}
            <Card sx={{ p: 3, mb: 3, borderRadius: "8px" }}>
              <MDTypography variant="h6" fontWeight="medium" mb={2}>
                Courses Enrolled
              </MDTypography>
              <MDBox display="flex" flexWrap="wrap" gap={1}>
                {student.courses_enrolled.map((course) => (
                  <Chip
                    key={course}
                    label={course}
                    sx={{
                      fontWeight: "medium",
                      bgcolor: "#e3f2fd",
                      color: "#2196f3",
                      border: "1px solid #2196f3",
                      fontSize: "0.85rem",
                    }}
                  />
                ))}
              </MDBox>
            </Card>

            {/* Pending Course Requests Card */}
            <Card sx={{ p: 3, mb: 3, borderRadius: "8px" }}>
              <MDTypography variant="h6" fontWeight="medium" mb={1}>
                Pending Course Requests
              </MDTypography>
              <MDTypography variant="body2" color="text">
                No pending course requests.
              </MDTypography>
            </Card>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={7}>
            {/* Assignment Summary Card */}
            <Card sx={{ p: 3, mb: 3, borderRadius: "8px" }}>
              <MDTypography variant="h6" fontWeight="medium" mb={2}>
                Assignment Summary
              </MDTypography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <MDTypography variant="button" fontWeight="medium">
                          Subject
                        </MDTypography>
                      </TableCell>
                      <TableCell align="center">
                        <MDTypography variant="button" fontWeight="medium">
                          Completed
                        </MDTypography>
                      </TableCell>
                      <TableCell align="center">
                        <MDTypography variant="button" fontWeight="medium">
                          Expired
                        </MDTypography>
                      </TableCell>
                      <TableCell align="center">
                        <MDTypography variant="button" fontWeight="medium">
                          Pending
                        </MDTypography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {assignmentSummaryData.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{ "&:nth-of-type(odd)": { backgroundColor: "#fafafa" } }}
                      >
                        <TableCell>
                          <MDTypography variant="body2">{row.subject}</MDTypography>
                        </TableCell>
                        <TableCell align="center">
                          <MDTypography variant="body2">{row.completed}</MDTypography>
                        </TableCell>
                        <TableCell align="center">
                          <MDTypography variant="body2">{row.expired}</MDTypography>
                        </TableCell>
                        <TableCell align="center">
                          <MDTypography variant="body2">{row.pending}</MDTypography>
                        </TableCell>
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
