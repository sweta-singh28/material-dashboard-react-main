import React, { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Material Dashboard 2 React components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material UI
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";

// Global search context
import { useSearch } from "context";

const CompletedCourses = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = useSearch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // ✅ 1. Get dbJson (fallback if not passed)
  const dbJson = location.state?.dbJson || {
    Courses: [
      {
        idCourses: "c_1",
        course_name: "Math 101",
        course_pre_requisites: "[]",
        course_status: "completed",
        course_description: "Basic mathematics",
        teachers_user_id: "u_3",
      },
      {
        idCourses: "c_2",
        course_name: "Science Basics",
        course_code: "SCI101",
        course_status: "completed",
        course_description: "Intro to science",
        teachers_user_id: "u_4",
      },
      {
        idCourses: "c_3",
        course_name: "English Literature",
        course_code: "ENG101",
        course_status: "completed",
        course_description: "English studies",
        teachers_user_id: "u_4",
      },
    ],
    Users: [
      { user_id: "u_3", first_name: "Charlie", last_name: "Khan", user_role: "Teacher" },
      { user_id: "u_4", first_name: "Diana", last_name: "Verma", user_role: "Teacher" },
    ],
  };

  // ✅ 2. Derive only completed courses
  const completedCourses = useMemo(() => {
    return dbJson.Courses.filter((c) => c.course_status === "completed").map((course) => {
      const instructor = dbJson.Users.find((u) => u.user_id === course.teachers_user_id);
      const instructorName = instructor
        ? `${instructor.first_name} ${instructor.last_name}`
        : "Unknown Instructor";

      return {
        id: course.idCourses,
        title: course.course_name,
        instructor: instructorName,
        started: course.create_time || "N/A",
        description: course.course_description,
        status: course.course_status,
      };
    });
  }, [dbJson]);

  // ✅ 3. Filtered results by global search
  const filteredCourses = useMemo(() => {
    return completedCourses.filter(
      (course) =>
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.instructor.toLowerCase().includes(search.toLowerCase())
    );
  }, [completedCourses, search]);

  // ✅ 4. Navigate with state
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
              <MDTypography variant="h4" fontWeight="medium" mb={2}>
                Completed Courses
              </MDTypography>

              <MDTypography variant="body2" color="text" mb={2}>
                Manage all completed courses. There are{" "}
                <MDTypography component="span" fontWeight="bold">
                  {filteredCourses.length}
                </MDTypography>{" "}
                completed courses.
              </MDTypography>

              {/* Courses Table (styled like ActiveCourses) */}
              <TableContainer>
                <Table sx={{ borderCollapse: "separate", borderSpacing: "0 8px" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ borderBottom: "none" }}>
                        <MDTypography component="div" variant="button" fontWeight="bold">
                          COURSE TITLE
                        </MDTypography>
                      </TableCell>
                      <TableCell sx={{ borderBottom: "none" }}>
                        <MDTypography component="div" variant="button" fontWeight="bold">
                          INSTRUCTOR
                        </MDTypography>
                      </TableCell>
                      <TableCell sx={{ borderBottom: "none" }}>
                        <MDTypography component="div" variant="button" fontWeight="bold">
                          DESCRIPTION
                        </MDTypography>
                      </TableCell>
                      <TableCell sx={{ borderBottom: "none", textAlign: "right" }}>
                        <MDTypography component="div" variant="button" fontWeight="bold">
                          STATUS
                        </MDTypography>
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filteredCourses.length > 0 ? (
                      filteredCourses
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((course) => (
                          <TableRow
                            key={course.id}
                            hover
                            role="button"
                            tabIndex={0}
                            onClick={() => handleRowClick(course)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") handleRowClick(course);
                            }}
                            sx={{
                              cursor: "pointer",
                              backgroundColor: "#f9f9f9",
                              "&:hover": { backgroundColor: "#f0f0f0" },
                            }}
                          >
                            <TableCell sx={{ borderBottom: "none" }}>{course.title}</TableCell>
                            <TableCell sx={{ borderBottom: "none" }}>{course.instructor}</TableCell>
                            <TableCell sx={{ borderBottom: "none" }}>
                              {course.description}
                            </TableCell>
                            <TableCell sx={{ borderBottom: "none", textAlign: "right" }}>
                              <MDTypography
                                variant="button"
                                fontWeight="bold"
                                sx={{
                                  color: course.status === "completed" ? "blue" : "grey",
                                  textTransform: "uppercase",
                                }}
                              >
                                {course.status}
                              </MDTypography>
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} sx={{ borderBottom: "none", textAlign: "center" }}>
                          <MDTypography variant="body2" color="text">
                            No courses found
                          </MDTypography>
                        </TableCell>
                      </TableRow>
                    )}
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

export default CompletedCourses;
