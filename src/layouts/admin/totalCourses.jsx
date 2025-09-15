import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { useMaterialUIController } from "context";

// --- UPDATED SAMPLE DATA (can later come from API) ---
const coursesJSON = [
  {
    idCourses: 1,
    course_name: "React Basics",
    course_code: "RB101",
    course_status: "Active",
    course_description: "Introductory React course covering components, props, state and hooks.",
    student_count: 45,
    teacher: {
      idUsers: "t1",
      first_name: "Bob",
      last_name: "Martin",
      role: "teacher",
    },
  },
  {
    idCourses: 2,
    course_name: "NodeJS Advanced",
    course_code: "NJS201",
    course_status: "Completed",
    course_description:
      "Deep dive into NodeJS internals, streams, clustering and performance tuning.",
    student_count: 30,
    teacher: {
      idUsers: "t2",
      first_name: "Alice",
      last_name: "Johnson",
      role: "teacher",
    },
  },
  {
    idCourses: 3,
    course_name: "CSS for Beginners",
    course_code: "CSS101",
    course_status: "Active",
    course_description: "Learn modern CSS: Flexbox, Grid, responsive layouts and animations.",
    student_count: 60,
    teacher: {
      idUsers: "t3",
      first_name: "Charlie",
      last_name: "Gupta",
      role: "teacher",
    },
  },
];

const AllCourses = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [controller] = useMaterialUIController();
  const { search } = controller;

  const [courses, setCourses] = useState(coursesJSON);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", color: "success" });

  // Update course status when returning from CourseDetails
  useEffect(() => {
    const updatedCourse = location.state?.updatedCourse;
    if (updatedCourse) {
      setCourses((prev) =>
        prev.map((c) =>
          c.idCourses === updatedCourse.idCourses
            ? { ...c, course_status: updatedCourse.course_status }
            : c
        )
      );

      setSnackbar({
        open: true,
        message: location.state?.message || "Course updated",
        color: location.state?.color || "success",
      });

      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, navigate]);

  // Navigation to details page
  const handleView = (course) => {
    navigate("/courseDetails", { state: { course } });
  };

  // Apply search
  const filteredCourses = courses.filter((course) =>
    Object.values(course).some((value) =>
      typeof value === "object"
        ? Object.values(value).some((nestedVal) =>
            String(nestedVal).toLowerCase().includes(search.toLowerCase())
          )
        : String(value).toLowerCase().includes(search.toLowerCase())
    )
  );

  // showing text calculations
  const showingFrom = filteredCourses.length > 0 ? 1 : 0;
  const showingTo = filteredCourses.length;
  const totalResults = courses.length;

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox mt={6} mb={3}>
        {/* Page heading */}
        <MDBox px={3} mb={2}>
          <MDTypography variant="h4" fontWeight="bold">
            All Courses
          </MDTypography>
        </MDBox>

        <Card
          sx={{
            mx: 3,
            borderRadius: 2,
            overflow: "visible",
            boxShadow: 0,
            border: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          {/* table header spacing */}
          <MDBox px={3} pt={2} pb={1}>
            {/* optional subtitle or controls could go here */}
          </MDBox>

          <TableContainer component={Paper} sx={{ boxShadow: "none", borderRadius: 0 }}>
            <Table sx={{ minWidth: 800 }} aria-label="all courses table">
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "#f6f8fa",
                    "& th": {
                      fontWeight: 700,
                      color: (theme) => theme.palette.text.primary,
                      borderBottom: "none",
                    },
                    "& th:first-of-type": { borderTopLeftRadius: 8 },
                    "& th:last-of-type": { borderTopRightRadius: 8 },
                  }}
                >
                  <TableCell sx={{ py: 2 }}>
                    <MDTypography variant="button" fontWeight="bold">
                      Course Name
                    </MDTypography>
                  </TableCell>

                  <TableCell sx={{ py: 2 }}>
                    <MDTypography variant="button" fontWeight="bold">
                      Instructor
                    </MDTypography>
                  </TableCell>

                  <TableCell sx={{ py: 2 }}>
                    <MDTypography variant="button" fontWeight="bold">
                      Course Code
                    </MDTypography>
                  </TableCell>

                  <TableCell sx={{ py: 2 }}>
                    <MDTypography variant="button" fontWeight="bold">
                      Students
                    </MDTypography>
                  </TableCell>

                  <TableCell sx={{ py: 2 }}>
                    <MDTypography variant="button" fontWeight="bold">
                      Status
                    </MDTypography>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredCourses.map((course) => {
                  const instructorName = course.teacher
                    ? `${course.teacher.first_name} ${course.teacher.last_name}`
                    : "-";

                  return (
                    <TableRow
                      key={course.idCourses}
                      hover
                      sx={{
                        cursor: "pointer",
                        "&:not(:last-of-type) td": {
                          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                        },
                        backgroundColor: "#fff",
                      }}
                      onClick={() => handleView(course)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleView(course)}
                    >
                      <TableCell sx={{ verticalAlign: "middle", py: 2 }}>
                        <MDTypography variant="button" fontWeight="medium">
                          {course.course_name}
                        </MDTypography>
                      </TableCell>

                      <TableCell sx={{ verticalAlign: "middle", py: 2 }}>
                        <MDTypography variant="caption" color="text">
                          {instructorName}
                        </MDTypography>
                      </TableCell>

                      <TableCell sx={{ verticalAlign: "middle", py: 2 }}>
                        <MDTypography variant="caption" color="text">
                          {course.course_code || "-"}
                        </MDTypography>
                      </TableCell>

                      <TableCell sx={{ verticalAlign: "middle", py: 2 }}>
                        <MDTypography variant="caption" color="text">
                          {course.student_count}
                        </MDTypography>
                      </TableCell>

                      <TableCell sx={{ verticalAlign: "middle", py: 2 }}>
                        <Chip
                          label={course.course_status}
                          size="small"
                          sx={{
                            borderRadius: "16px",
                            textTransform: "none",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            padding: "2px 10px",
                            backgroundColor:
                              course.course_status === "Active"
                                ? "rgba(16,185,129,0.12)"
                                : "#f1f3f5",
                            color:
                              course.course_status === "Active" ? "rgb(6,95,70)" : "rgb(78,85,93)",
                            "& .MuiChip-label": { padding: 0 },
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          {/* footer: showing text + pagination buttons */}
          <MDBox display="flex" justifyContent="space-between" alignItems="center" px={3} py={2}>
            {/* left: showing text */}
            <MDTypography variant="caption" color="text">
              Showing {showingFrom} to {showingTo} of {totalResults} results
            </MDTypography>

            {/* right: previous / next */}
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: 1,
                  textTransform: "none",
                  boxShadow: "none",
                  borderColor: (theme) => theme.palette.divider,
                }}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: 1,
                  textTransform: "none",
                  boxShadow: "none",
                  borderColor: (theme) => theme.palette.divider,
                }}
              >
                Next
              </Button>
            </Box>
          </MDBox>
        </Card>
      </MDBox>

      <MDSnackbar
        color={snackbar.color}
        icon="notifications"
        title="Admin"
        content={snackbar.message}
        open={snackbar.open}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        close={() => setSnackbar((s) => ({ ...s, open: false }))}
      />
      <Footer />
    </DashboardLayout>
  );
};

export default AllCourses;
