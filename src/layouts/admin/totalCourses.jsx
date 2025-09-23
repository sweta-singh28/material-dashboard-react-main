import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
import TablePagination from "@mui/material/TablePagination";

import { useMaterialUIController } from "context";

// Redux
import { fetchCourses } from "../../redux/totalCourses/totalCoursesThunks";

// --- SAMPLE DATA (Commented out) ---
// const coursesJSON = [
//   {
//     idCourses: 1,
//     course_name: "React Basics",
//     course_code: "RB101",
//     course_status: "Active",
//     course_description: "Introductory React course covering components, props, state and hooks.",
//     student_count: 45,
//     teacher: { idUsers: "t1", first_name: "Bob", last_name: "Martin", role: "teacher" },
//   },
//   {
//     idCourses: 2,
//     course_name: "NodeJS Advanced",
//     course_code: "NJS201",
//     course_status: "Completed",
//     course_description: "Deep dive into NodeJS internals, streams, clustering and performance tuning.",
//     student_count: 30,
//     teacher: { idUsers: "t2", first_name: "Alice", last_name: "Johnson", role: "teacher" },
//   },
//   {
//     idCourses: 3,
//     course_name: "CSS for Beginners",
//     course_code: "CSS101",
//     course_status: "Active",
//     course_description: "Learn modern CSS: Flexbox, Grid, responsive layouts and animations.",
//     student_count: 60,
//     teacher: { idUsers: "t3", first_name: "Charlie", last_name: "Gupta", role: "teacher" },
//   },
// ];

const AllCourses = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [controller] = useMaterialUIController();
  const { search } = controller;

  // Safe useSelector with default empty array
  const courses = useSelector((state) => state.allCourses?.courses || []);

  const [snackbar, setSnackbar] = useState({ open: false, message: "", color: "success" });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    const updatedCourse = location.state?.updatedCourse;
    if (updatedCourse) {
      setSnackbar({
        open: true,
        message: location.state?.message || "Course updated",
        color: location.state?.color || "success",
      });
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, navigate]);

  const handleView = (course) => {
    navigate("/courseDetails", { state: { course } });
  };

  const filteredCourses = courses.filter((course) =>
    Object.values(course).some((value) =>
      typeof value === "object"
        ? Object.values(value).some((nestedVal) =>
            String(nestedVal).toLowerCase().includes(search.toLowerCase())
          )
        : String(value).toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox mt={6} mb={3}>
        <MDBox px={3} mb={2}>
          <MDTypography variant="h4" fontWeight="bold">
            All Courses
          </MDTypography>
        </MDBox>

        <Card sx={{ p: 3, boxShadow: 0, borderRadius: 0 }}>
          <TableContainer>
            <Table sx={{ borderCollapse: "separate", borderSpacing: "0 8px" }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ borderBottom: "none" }}>Course Name</TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>Instructor</TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>Course Code</TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>Students</TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>Status</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredCourses
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((course) => {
                    const instructorName = course.teacher
                      ? `${course.teacher.first_name} ${course.teacher.last_name}`
                      : "-";

                    return (
                      <TableRow
                        key={course.idCourses}
                        hover
                        sx={{
                          cursor: "pointer",
                          backgroundColor: "#f9f9f9",
                          "&:hover": { backgroundColor: "#f0f0f0" },
                        }}
                        onClick={() => handleView(course)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) =>
                          (e.key === "Enter" || e.key === " ") && handleView(course)
                        }
                      >
                        <TableCell sx={{ borderBottom: "none" }}>{course.course_name}</TableCell>
                        <TableCell sx={{ borderBottom: "none" }}>{instructorName}</TableCell>
                        <TableCell sx={{ borderBottom: "none" }}>
                          {course.course_code || "-"}
                        </TableCell>
                        <TableCell sx={{ borderBottom: "none" }}>{course.student_count}</TableCell>
                        <TableCell sx={{ borderBottom: "none" }}>
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
                                course.course_status === "Active"
                                  ? "rgb(6,95,70)"
                                  : "rgb(78,85,93)",
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

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredCourses.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
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
