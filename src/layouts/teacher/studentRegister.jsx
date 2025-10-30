// studentRegister.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI & project components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Context for search
import { useMaterialUIController } from "context";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../../redux/studentRegister/studentRegisterThunks";
import {
  selectStudents,
  selectStudentsLoading,
  selectStudentsError,
} from "../../redux/studentRegister/studentRegisterReducer";

function Students() {
  const navigate = useNavigate();
  const [controller] = useMaterialUIController();
  const { search } = controller;

  const dispatch = useDispatch();

  // pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Redux state
  const studentsData = useSelector((state) => state.studentRegister.students) || [];
  const loading = useSelector((state) => state.studentRegister.loading);
  const error = useSelector((state) => state.studentRegister.error);

  // load students on mount
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);
  useEffect(() => {
    console.log(studentsData);
  }, [studentsData]);
  // Apply search filter
  const filteredStudents = studentsData.filter((student) =>
    Object.values(student).some((value) =>
      String(value)
        .toLowerCase()
        .includes((search || "").toLowerCase())
    )
  );

  // Pagination handlers
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
      <MDBox py={3}>
        <Grid container>
          <Grid item xs={12}>
            <Card sx={{ p: 3, boxShadow: 0, borderRadius: 0 }}>
              <MDTypography variant="h4" fontWeight="bold" gutterBottom>
                Student Register
              </MDTypography>

              {loading ? (
                <MDTypography variant="body2" color="text">
                  Loading students...
                </MDTypography>
              ) : error ? (
                <MDTypography variant="body2" color="error">
                  {String(error)}
                </MDTypography>
              ) : null}

              <TableContainer sx={{ width: "100%" }}>
                <Table
                  sx={{
                    borderCollapse: "separate",
                    borderSpacing: "0 8px",
                    width: "100%",
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{ borderBottom: "none", width: "33%", textAlign: "left", pl: 3 }}
                      >
                        <MDTypography variant="button" fontWeight="bold" color="text">
                          Name
                        </MDTypography>
                      </TableCell>
                      <TableCell
                        sx={{ borderBottom: "none", width: "33%", textAlign: "left", pl: 3 }}
                      >
                        <MDTypography variant="button" fontWeight="bold" color="text">
                          Student Id
                        </MDTypography>
                      </TableCell>
                      <TableCell
                        sx={{ borderBottom: "none", width: "34%", textAlign: "left", pl: 3 }}
                      >
                        <MDTypography variant="button" fontWeight="bold" color="text">
                          Email Id
                        </MDTypography>
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filteredStudents.length > 0 ? (
                      filteredStudents
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((student) => (
                          <TableRow
                            key={student.user_id}
                            hover
                            sx={{
                              cursor: "pointer",
                              backgroundColor: "#fff",
                              "&:hover": { backgroundColor: "#f5f5f5" },
                              boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
                            }}
                            onClick={() => navigate(`/students/${student.user_id}`)}
                          >
                            <TableCell sx={{ borderBottom: "none", width: "33%", pl: 3 }}>
                              {student.first_name + " " + student.last_name}
                            </TableCell>
                            <TableCell sx={{ borderBottom: "none", width: "33%", pl: 3 }}>
                              {student._id}
                            </TableCell>
                            <TableCell sx={{ borderBottom: "none", width: "34%", pl: 3 }}>
                              {student.email}
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} sx={{ textAlign: "center", py: 3 }}>
                          <MDTypography variant="body2" color="text">
                            No students available
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
                count={filteredStudents.length}
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

export default Students;

// ✅ Hardcoded JSON data (later replace with API call)
// const studentsData = [
//   {
//     user_id: "S101",
//     full_name: "Liam Harper",
//     email: "liam.harper@example.com",
//     roll_no: "2023-001",
//   },
//   {
//     user_id: "S102",
//     full_name: "Olivia Bennett",
//     email: "olivia.bennett@example.com",
//     roll_no: "2023-002",
//   },
//   {
//     user_id: "S103",
//     full_name: "Noah Carter",
//     email: "noah.carter@example.com",
//     roll_no: "2023-003",
//   },
//   {
//     user_id: "S104",
//     full_name: "Ava Davis",
//     email: "ava.davis@example.com",
//     roll_no: "2023-004",
//   },
//   {
//     user_id: "S105",
//     full_name: "Jackson Evans",
//     email: "jackson.evans@example.com",
//     roll_no: "2023-005",
//   },
//   {
//     user_id: "S106",
//     full_name: "Sophia Foster",
//     email: "sophia.foster@example.com",
//     roll_no: "2023-006",
//   },
//   {
//     user_id: "S107",
//     full_name: "Aiden Green",
//     email: "aiden.green@example.com",
//     roll_no: "2023-007",
//   },
//   {
//     user_id: "S108",
//     full_name: "Chloe Hayes",
//     email: "chloe.hayes@example.com",
//     roll_no: "2023-008",
//   },
//   {
//     user_id: "S109",
//     full_name: "Lucas Ingram",
//     email: "lucas.ingram@example.com",
//     roll_no: "2023-009",
//   },
//   {
//     user_id: "S110",
//     full_name: "Mia Jenkins",
//     email: "mia.jenkins@example.com",
//     roll_no: "2023-010",
//   },
// ];
