import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Material Dashboard components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDSnackbar from "components/MDSnackbar";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";

const AllCourses = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "React Basics",
      instructor: "Bob Martin",
      students: 45,
      status: "Active",
      courseCode: "RB101",
      description: "Introductory React course covering components, props, state and hooks.",
    },
    {
      id: 2,
      title: "NodeJS Advanced",
      instructor: "Alice Johnson",
      students: 30,
      status: "Completed",
      courseCode: "NJS201",
      description: "Deep dive into NodeJS internals, streams, clustering and performance tuning.",
    },
    {
      id: 3,
      title: "CSS for Beginners",
      instructor: "Charlie Gupta",
      students: 60,
      status: "Active",
      courseCode: "CSS101",
      description: "Learn modern CSS: Flexbox, Grid, responsive layouts and animations.",
    },
  ]);

  const [snackbar, setSnackbar] = useState({ open: false, message: "", color: "success" });

  // Update course status when returning
  useEffect(() => {
    const updatedCourse = location.state?.updatedCourse;
    if (updatedCourse) {
      setCourses((prev) =>
        prev.map((c) => (c.id === updatedCourse.id ? { ...c, status: updatedCourse.status } : c))
      );

      setSnackbar({
        open: true,
        message: location.state?.message || "Course updated",
        color: location.state?.color || "success",
      });

      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, navigate]);

  // Changed to route to CourseDetails with course state
  const handleView = (course) => {
    navigate("/courseDetails", { state: { course } });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Card>
          <MDBox p={3}>
            <MDTypography variant="h5" fontWeight="medium">
              All Courses
            </MDTypography>
          </MDBox>

          {/* Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <MDTypography variant="button" fontWeight="bold">
                      Course
                    </MDTypography>
                  </TableCell>

                  <TableCell>
                    <MDTypography variant="button" fontWeight="bold">
                      Instructor
                    </MDTypography>
                  </TableCell>

                  <TableCell>
                    <MDTypography variant="button" fontWeight="bold">
                      Students
                    </MDTypography>
                  </TableCell>

                  {/* NEW: Course Code column */}
                  <TableCell>
                    <MDTypography variant="button" fontWeight="bold">
                      Course Code
                    </MDTypography>
                  </TableCell>

                  <TableCell>
                    <MDTypography variant="button" fontWeight="bold">
                      Status
                    </MDTypography>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {courses.map((course) => (
                  // Entire row is clickable and navigates to CourseDetails
                  <TableRow
                    key={course.id}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleView(course)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") handleView(course);
                    }}
                  >
                    <TableCell sx={{ verticalAlign: "middle", py: 1 }}>
                      <MDTypography variant="button" fontWeight="medium">
                        {course.title}
                      </MDTypography>
                    </TableCell>

                    <TableCell sx={{ verticalAlign: "middle", py: 1 }}>
                      <MDTypography variant="caption" color="text">
                        {course.instructor}
                      </MDTypography>
                    </TableCell>

                    <TableCell sx={{ verticalAlign: "middle", py: 1 }}>
                      <MDTypography variant="caption" color="text">
                        {course.students}
                      </MDTypography>
                    </TableCell>

                    {/* NEW: Course Code */}
                    <TableCell sx={{ verticalAlign: "middle", py: 1 }}>
                      <MDTypography variant="caption" color="text">
                        {course.courseCode || "-"}
                      </MDTypography>
                    </TableCell>

                    <TableCell sx={{ verticalAlign: "middle", py: 1 }}>
                      <Chip
                        label={course.status}
                        size="small"
                        color={course.status === "Active" ? "success" : "default"}
                        sx={{ fontSize: "0.75rem", fontWeight: "bold" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </MDBox>

      <MDSnackbar
        color={snackbar.color}
        icon="notifications"
        title="Admin"
        content={snackbar.message}
        dateTime=""
        open={snackbar.open}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        close={() => setSnackbar((s) => ({ ...s, open: false }))}
      />
      <Footer />
    </DashboardLayout>
  );
};

export default AllCourses;
