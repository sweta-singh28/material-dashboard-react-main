// ViewSubmissions.jsx (redesigned with thinner rows)

import { useState } from "react";
import { useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Layout
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Global search context
import { useSearch } from "context";

function ViewSubmissions() {
  const navigate = useNavigate();
  const { search } = useSearch();

  const [submissions, setSubmissions] = useState([
    {
      submission_id: "subm-101",
      submission_link: "https://files.example.com/submissions/subm-101.pdf",
      submission_time: "2025-09-10T15:30:00Z",
      approval: "pending",
      student_id: "user-789",
      assignment: {
        AN_id: "assign-001",
        AN_title: "ER Diagram Assignment",
        AN_link: "https://files.example.com/assignments/er_assignment.pdf",
      },
      course: {
        idCourses: "course-123",
        course_name: "Database Systems",
      },
    },
    {
      submission_id: "subm-102",
      submission_link: "https://files.example.com/submissions/subm-102.pdf",
      submission_time: "2025-09-11T18:45:00Z",
      approval: "approved",
      student_id: "user-456",
      assignment: {
        AN_id: "assign-001",
        AN_title: "ER Diagram Assignment",
        AN_link: "https://files.example.com/assignments/er_assignment.pdf",
      },
      course: {
        idCourses: "course-123",
        course_name: "Database Systems",
      },
    },
    {
      submission_id: "subm-201",
      submission_link: "https://files.example.com/submissions/subm-201.pdf",
      submission_time: "2025-09-12T09:20:00Z",
      approval: "pending",
      student_id: "user-222",
      assignment: {
        AN_id: "assign-002",
        AN_title: "SQL Queries Assignment",
        AN_link: "https://files.example.com/assignments/sql_assignment.pdf",
      },
      course: {
        idCourses: "course-456",
        course_name: "Advanced SQL",
      },
    },
  ]);

  const handleApprove = (id) => {
    setSubmissions((prev) =>
      prev.map((sub) => (sub.submission_id === id ? { ...sub, approval: "approved" } : sub))
    );
  };

  const handleMark = (id) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.submission_id === id
          ? { ...sub, approval: sub.approval === "marked" ? "pending" : "marked" }
          : sub
      )
    );
  };

  const handleStudentClick = (id) => {
    navigate(`/students/${id}`);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredSubmissions = submissions.filter(
    (sub) =>
      sub.student_id.toLowerCase().includes(search.toLowerCase()) ||
      sub.assignment.AN_title.toLowerCase().includes(search.toLowerCase()) ||
      sub.course.course_name.toLowerCase().includes(search.toLowerCase())
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
      <MDBox pt={6} pb={3}>
        <Grid container>
          <Grid item xs={12}>
            <Card sx={{ p: 3, boxShadow: 0, borderRadius: 0 }}>
              <MDTypography variant="h4" fontWeight="bold" mb={2}>
                📑 Student Submissions
              </MDTypography>

              <TableContainer>
                <Table sx={{ borderCollapse: "separate", borderSpacing: "0 6px" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ borderBottom: "none", py: 1 }}>
                        <MDTypography variant="button" fontWeight="bold" color="text">
                          Student ID
                        </MDTypography>
                      </TableCell>
                      <TableCell sx={{ borderBottom: "none", py: 1 }}>
                        <MDTypography variant="button" fontWeight="bold" color="text">
                          Assignment
                        </MDTypography>
                      </TableCell>
                      <TableCell sx={{ borderBottom: "none", py: 1 }}>
                        <MDTypography variant="button" fontWeight="bold" color="text">
                          Course
                        </MDTypography>
                      </TableCell>
                      <TableCell sx={{ borderBottom: "none", py: 1 }}>
                        <MDTypography variant="button" fontWeight="bold" color="text">
                          File
                        </MDTypography>
                      </TableCell>
                      <TableCell sx={{ borderBottom: "none", py: 1 }}>
                        <MDTypography variant="button" fontWeight="bold" color="text">
                          Status
                        </MDTypography>
                      </TableCell>
                      <TableCell sx={{ borderBottom: "none", py: 1 }}>
                        <MDTypography variant="button" fontWeight="bold" color="text">
                          Action
                        </MDTypography>
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filteredSubmissions
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((sub) => {
                        const isApproved = sub.approval === "approved";
                        const displayStatus = isApproved ? "Approved" : "Pending";

                        return (
                          <TableRow
                            key={sub.submission_id}
                            hover
                            sx={{
                              cursor: "pointer",
                              backgroundColor: "#f9f9f9",
                              "&:hover": { backgroundColor: "#f0f0f0" },
                            }}
                          >
                            <TableCell sx={{ borderBottom: "none", py: 0.8 }}>
                              <MDTypography
                                variant="body2"
                                sx={{
                                  cursor: "pointer",
                                  textDecoration: "underline",
                                  color: "#0b66ff",
                                }}
                                onClick={() => handleStudentClick(sub.student_id)}
                              >
                                {sub.student_id}
                              </MDTypography>
                            </TableCell>

                            <TableCell sx={{ borderBottom: "none", py: 0.8 }}>
                              {sub.assignment.AN_title}
                            </TableCell>

                            <TableCell sx={{ borderBottom: "none", py: 0.8 }}>
                              {sub.course.course_name}
                            </TableCell>

                            <TableCell sx={{ borderBottom: "none", py: 0.8 }}>
                              <a
                                href={sub.submission_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ textDecoration: "none", display: "inline-flex", gap: 6 }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Icon fontSize="small" sx={{ verticalAlign: "middle" }}>
                                  description
                                </Icon>
                                <span style={{ textDecoration: "underline", color: "#1a73e8" }}>
                                  View File
                                </span>
                              </a>
                            </TableCell>

                            <TableCell sx={{ borderBottom: "none", py: 0.8 }}>
                              <MDTypography
                                variant="caption"
                                sx={{
                                  display: "inline-block",
                                  px: 1.5,
                                  py: 0.3,
                                  borderRadius: "20px",
                                  fontWeight: 600,
                                  fontSize: "0.7rem",
                                  textTransform: "none",
                                  backgroundColor: isApproved ? "#e6f4ea" : "#fff7e6",
                                  color: isApproved ? "#14632a" : "#7a4a00",
                                }}
                              >
                                {displayStatus}
                              </MDTypography>
                            </TableCell>

                            <TableCell sx={{ borderBottom: "none", py: 0.8 }}>
                              {!isApproved ? (
                                <MDButton
                                  variant="gradient"
                                  color="success"
                                  size="small"
                                  onClick={() => handleApprove(sub.submission_id)}
                                >
                                  Approve
                                </MDButton>
                              ) : (
                                <MDButton
                                  variant="outlined"
                                  color="info"
                                  size="small"
                                  onClick={() => handleMark(sub.submission_id)}
                                >
                                  Mark
                                </MDButton>
                              )}
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
                count={filteredSubmissions.length}
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
}

export default ViewSubmissions;
