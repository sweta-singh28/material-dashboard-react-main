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
  const studentsData = useSelector(selectStudents) || [];
  const loading = useSelector(selectStudentsLoading);
  const error = useSelector(selectStudentsError);

  // load students on mount
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

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

              <TableContainer>
                <Table sx={{ borderCollapse: "separate", borderSpacing: "0 8px" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ borderBottom: "none" }}>
                        <MDTypography variant="button" fontWeight="bold" color="text">
                          Name
                        </MDTypography>
                      </TableCell>
                      <TableCell sx={{ borderBottom: "none" }}>
                        <MDTypography variant="button" fontWeight="bold" color="text">
                          Roll No.
                        </MDTypography>
                      </TableCell>
                      <TableCell sx={{ borderBottom: "none" }}>
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
                              backgroundColor: "#f9f9f9",
                              "&:hover": {
                                backgroundColor: "#f0f0f0",
                              },
                            }}
                            onClick={() => navigate(`/students/${student.user_id}`)}
                          >
                            <TableCell sx={{ borderBottom: "none" }}>{student.full_name}</TableCell>
                            <TableCell sx={{ borderBottom: "none" }}>{student.roll_no}</TableCell>
                            <TableCell sx={{ borderBottom: "none" }}>{student.email}</TableCell>
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
