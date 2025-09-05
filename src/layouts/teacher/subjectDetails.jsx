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
import { useParams, useNavigate, useLocation } from "react-router-dom";

// Charts
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function SubjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Dummy courses data
  const courses = [
    {
      name: "Mathematics",
      code: "MTH101",
      credits: 4,
      semester: "Semester 1",
      students: ["Sophia Clark", "Ethan Miller", "Olivia Davis"],
    },
    {
      name: "Computer Science",
      code: "CSE201",
      credits: 3,
      semester: "Semester 2",
      students: ["Liam Wilson", "Ava Martinez"],
    },
  ];

  const defaultCourse = {
    name: "Unknown",
    code: "-",
    credits: 0,
    semester: "-",
    students: [],
  };

  // use course from navigate state if present, else fallback to index
  const parsedId = id ? Number(id) : null;
  const courseFromParams = parsedId && courses[parsedId - 1] ? courses[parsedId - 1] : undefined;
  const course = location.state?.course || courseFromParams || defaultCourse;

  // Dummy progress data
  const progressData = [
    { week: "Week 1", completion: 70 },
    { week: "Week 2", completion: 80 },
    { week: "Week 3", completion: 90 },
    { week: "Week 4", completion: 60 },
  ];

  // Dummy assignments/resources
  const resources = [
    { title: "Assignment 1", status: "Published" },
    { title: "Assignment 2", status: "Pending" },
    { title: "Lecture Notes - Week 1", status: "Uploaded" },
  ];

  const getStatusChip = (status) => {
    switch (status) {
      case "Published":
        return <Chip label="Published" color="success" size="small" />;
      case "Pending":
        return <Chip label="Pending" color="warning" size="small" />;
      case "Uploaded":
        return <Chip label="Uploaded" color="info" size="small" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container justifyContent="center" spacing={3}>
          {/* Course Info Card */}
          <Grid item xs={12} md={8} lg={6}>
            <Card sx={{ p: 4, borderRadius: "16px", boxShadow: 4 }}>
              <MDTypography variant="h4" fontWeight="bold" gutterBottom>
                📘 Course Details
              </MDTypography>
              <Divider sx={{ my: 2 }} />

              <MDBox mb={2}>
                <MDTypography variant="h6">Course Name:</MDTypography>
                <MDTypography variant="body1">{course.name}</MDTypography>
              </MDBox>

              <MDBox mb={2}>
                <MDTypography variant="h6">Course Code:</MDTypography>
                <MDTypography variant="body1">{course.code}</MDTypography>
              </MDBox>

              <MDBox mb={2}>
                <MDTypography variant="h6">Credits:</MDTypography>
                <MDTypography variant="body1">{course.credits}</MDTypography>
              </MDBox>

              <MDBox mb={2}>
                <MDTypography variant="h6">Semester:</MDTypography>
                <MDTypography variant="body1">{course.semester}</MDTypography>
              </MDBox>

              <MDBox mb={2}>
                <MDTypography variant="h6">Enrolled Students:</MDTypography>
                <MDTypography variant="body1">
                  {course.students?.length
                    ? course.students.join(", ")
                    : "No students enrolled yet"}
                </MDTypography>
              </MDBox>

              {/* Back Button */}
              <MDBox mt={3} display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/teacher/allCourses")}
                  sx={{ borderRadius: "12px", textTransform: "none" }}
                >
                  ← Back to Courses
                </Button>
              </MDBox>
            </Card>
          </Grid>

          {/* Course Progress Chart */}
          <Grid item xs={12} md={10} lg={8}>
            <Card sx={{ p: 4, borderRadius: "16px", boxShadow: 4 }}>
              <MDTypography variant="h5" fontWeight="bold" gutterBottom>
                📊 Course Progress
              </MDTypography>
              <Divider sx={{ my: 2 }} />
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="completion" fill="#673ab7" name="Completion %" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>

          {/* Resources / Assignments */}
          <Grid item xs={12} md={10} lg={8}>
            <Card sx={{ p: 4, borderRadius: "16px", boxShadow: 4 }}>
              <MDTypography variant="h5" fontWeight="bold" gutterBottom>
                📑 Resources & Assignments
              </MDTypography>
              <Divider sx={{ my: 2 }} />
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>Title</strong>
                      </TableCell>
                      <TableCell align="right">
                        <strong>Status</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {resources.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.title}</TableCell>
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

export default SubjectDetails;
