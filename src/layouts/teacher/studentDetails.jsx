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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentDetails } from "../../redux/studentDetails/studentDetailsThunks";

function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { student, enrolledCourses, pendingCourses, subjects, loading } = useSelector(
    (state) => state.studentDetails
  );

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (id) dispatch(fetchStudentDetails(id));
  }, [id, dispatch]);

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

  if (loading) return <p>Loading...</p>;

  const studentData = student || {
    full_name: "Unknown",
    email: "-",
    rollNo: "-",
    profile_picture: null,
    enrolledCourses: [],
    pendingCourses: [],
    subjects: [],
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
            <Card sx={{ p: 3, mb: 3, borderRadius: "8px" }}>
              <MDBox display="flex" flexDirection="column" alignItems="center">
                <Avatar
                  src={studentData.picture || undefined}
                  alt={studentData.full_name || studentData.name}
                  sx={{ width: 150, height: 150, mb: 2 }}
                />
                <MDTypography variant="h5" fontWeight="medium">
                  {studentData.full_name || studentData.name}
                </MDTypography>
                <MDTypography variant="body2" color="text">
                  {studentData.email}
                </MDTypography>
                <MDTypography variant="body2" color="text">
                  Roll Number: {studentData.rollNo || studentData.roll_no}
                </MDTypography>
              </MDBox>
            </Card>

            <Card sx={{ p: 3, mb: 3, borderRadius: "8px" }}>
              <MDTypography variant="h6" fontWeight="medium" mb={2}>
                Courses Enrolled
              </MDTypography>
              <MDBox display="flex" flexWrap="wrap" gap={1}>
                {(enrolledCourses.length ? enrolledCourses : studentData.enrolledCourses).map(
                  (course) => (
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
                  )
                )}
              </MDBox>
            </Card>

            <Card sx={{ p: 3, mb: 3, borderRadius: "8px" }}>
              <MDTypography variant="h6" fontWeight="medium" mb={1}>
                Pending Course Requests
              </MDTypography>
              <MDTypography variant="body2" color="text">
                {pendingCourses.length ? pendingCourses.join(", ") : "No pending course requests."}
              </MDTypography>
            </Card>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={7}>
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
                    {(subjects.length ? subjects : studentData.subjects).map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{ "&:nth-of-type(odd)": { backgroundColor: "#fafafa" } }}
                      >
                        <TableCell>
                          <MDTypography variant="body2">
                            {row.subjectName || row.subject}
                          </MDTypography>
                        </TableCell>
                        <TableCell align="center">
                          <MDTypography variant="body2">
                            {row.completedAssignments || row.completed}
                          </MDTypography>
                        </TableCell>
                        <TableCell align="center">
                          <MDTypography variant="body2">
                            {row.expiredAssignments || row.expired}
                          </MDTypography>
                        </TableCell>
                        <TableCell align="center">
                          <MDTypography variant="body2">
                            {row.pendingAssignments || row.pending}
                          </MDTypography>
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
