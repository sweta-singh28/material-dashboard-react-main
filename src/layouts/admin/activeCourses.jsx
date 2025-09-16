// ActiveCourses.jsx
import React, { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Material Dashboard 2 React components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { useSearch } from "context";

const ActiveCourses = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = useSearch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dbJson = location.state?.dbJson || {
    Courses: [
      {
        idCourses: "c_1",
        course_name: "Math 101",
        course_status: "active",
        course_description: "Basic mathematics",
        teachers_user_id: "u_3",
      },
      {
        idCourses: "c_2",
        course_name: "Science Basics",
        course_status: "active",
        course_description: "Intro to science",
        teachers_user_id: "u_4",
      },
      {
        idCourses: "c_3",
        course_name: "English Literature",
        course_status: "inactive",
        course_description: "English studies",
        teachers_user_id: "u_4",
      },
    ],
    Users: [
      { user_id: "u_3", first_name: "Charlie", last_name: "Khan", user_role: "Teacher" },
      { user_id: "u_4", first_name: "Diana", last_name: "Verma", user_role: "Teacher" },
    ],
  };

  const activeCourses = useMemo(() => {
    return dbJson.Courses.filter((c) => c.course_status === "active").map((course) => {
      const instructor = dbJson.Users.find((u) => u.user_id === course.teachers_user_id);
      const instructorName = instructor
        ? `${instructor.first_name} ${instructor.last_name}`
        : "Unknown Instructor";

      return {
        id: course.idCourses,
        title: course.course_name,
        instructor: instructorName,
        description: course.course_description,
        status: course.course_status,
      };
    });
  }, [dbJson]);

  const filteredCourses = useMemo(() => {
    return activeCourses.filter(
      (course) =>
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.instructor.toLowerCase().includes(search.toLowerCase())
    );
  }, [activeCourses, search]);

  const handleRowClick = (course) => {
    navigate("/courseDetails", { state: { course, dbJson } });
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container>
          <Grid item xs={12}>
            <Card sx={{ p: 3, boxShadow: 0, borderRadius: 0 }}>
              <MDTypography variant="h4" fontWeight="bold" mb={2}>
                Active Courses
              </MDTypography>

              <TableContainer>
                <Table sx={{ borderCollapse: "separate", borderSpacing: "0 8px" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ borderBottom: "none" }}>
                        <MDTypography variant="button" fontWeight="bold" color="text">
                          Course Title
                        </MDTypography>
                      </TableCell>
                      <TableCell sx={{ borderBottom: "none" }}>
                        <MDTypography variant="button" fontWeight="bold" color="text">
                          Instructor
                        </MDTypography>
                      </TableCell>
                      <TableCell sx={{ borderBottom: "none" }}>
                        <MDTypography variant="button" fontWeight="bold" color="text">
                          Description
                        </MDTypography>
                      </TableCell>
                      <TableCell sx={{ borderBottom: "none" }}>
                        <MDTypography variant="button" fontWeight="bold" color="text">
                          Status
                        </MDTypography>
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filteredCourses
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((course) => (
                        <TableRow
                          key={course.id}
                          hover
                          sx={{
                            cursor: "pointer",
                            backgroundColor: "#f9f9f9",
                            "&:hover": { backgroundColor: "#f0f0f0" },
                          }}
                          onClick={() => handleRowClick(course)}
                        >
                          <TableCell sx={{ borderBottom: "none" }}>{course.title}</TableCell>
                          <TableCell sx={{ borderBottom: "none" }}>{course.instructor}</TableCell>
                          <TableCell sx={{ borderBottom: "none" }}>{course.description}</TableCell>
                          <TableCell sx={{ borderBottom: "none" }}>
                            <MDTypography
                              variant="button"
                              fontWeight="bold"
                              sx={{
                                color: course.status === "active" ? "green" : "red",
                                textTransform: "uppercase",
                              }}
                            >
                              {course.status}
                            </MDTypography>
                          </TableCell>
                        </TableRow>
                      ))}
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
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default ActiveCourses;
