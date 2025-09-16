// TotalUsers.jsx
import React, { useState, useMemo } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { useNavigate, useLocation } from "react-router-dom";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useMaterialUIController } from "context";

const TotalUsers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [controller] = useMaterialUIController();
  const { search } = controller;

  const dbJson = location.state?.dbJson || {
    Users: [
      {
        user_id: "u_1",
        first_name: "Sophia",
        last_name: "Clark",
        email: "sophia.clark@email.com",
        user_role: "Teacher",
      },
      {
        user_id: "u_2",
        first_name: "Ethan",
        last_name: "Bennett",
        email: "ethan.bennett@email.com",
        user_role: "Student",
      },
      {
        user_id: "u_3",
        first_name: "Olivia",
        last_name: "Carter",
        email: "olivia.carter@email.com",
        user_role: "Teacher",
      },
      {
        user_id: "u_4",
        first_name: "Liam",
        last_name: "Davis",
        email: "liam.davis@email.com",
        user_role: "Student",
      },
    ],
  };

  const allUsers = useMemo(
    () =>
      dbJson.Users.map((u) => ({
        id: u.user_id,
        name: `${u.first_name} ${u.last_name}`,
        email: u.email,
        role: u.user_role,
      })),
    [dbJson]
  );

  const [filterRole, setFilterRole] = useState(location.state?.filterRole || "All");

  const filteredUsers = useMemo(() => {
    return allUsers
      .filter(filterRole === "All" ? () => true : (user) => user.role === filterRole)
      .filter((user) =>
        Object.values(user).some((value) =>
          String(value).toLowerCase().includes(search.toLowerCase())
        )
      );
  }, [allUsers, filterRole, search]);

  // Pagination state (UI only, mirrors PendingStudentApprovals look)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const renderRoleChip = (role) => {
    const chipBase = {
      fontWeight: 600,
      fontSize: "0.75rem",
      borderRadius: "999px",
      height: 22,
      px: 1.1,
    };
    const teacherStyle = {
      ...chipBase,
      backgroundColor: "rgba(52, 105, 255, 0.08)",
      color: "#3469FF",
    };
    const studentStyle = {
      ...chipBase,
      backgroundColor: "rgba(72, 201, 176, 0.10)",
      color: "#2E8A6A",
    };
    return <Chip label={role} size="small" sx={role === "Teacher" ? teacherStyle : studentStyle} />;
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox pt={6} pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {/* Heading changed to match PendingStudentApprovals style */}
            <MDTypography variant="h4" fontWeight="bold" mb={2}>
              Total Users
            </MDTypography>
          </Grid>

          {/* Role Filter Pills */}
          <Grid item xs={12}>
            <Box
              sx={{
                display: "inline-flex",
                backgroundColor: "#F9FAFB",
                p: 0.5,
                borderRadius: "8px",
              }}
            >
              {["All", "Teacher", "Student"].map((r) => {
                const isActive = filterRole === (r === "All" ? "All" : r);
                return (
                  <Button
                    key={r}
                    onClick={() => setFilterRole(r === "All" ? "All" : r)}
                    disableElevation
                    sx={{
                      textTransform: "none",
                      borderRadius: "6px",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      px: 2.5,
                      py: 0.5,
                      minWidth: "90px",
                      /* ensure active button text is clearly white and overrides MUI defaults */
                      color: isActive ? "#ffffff !important" : "#344054",
                      backgroundColor: isActive ? "#1D4ED8" : "transparent",
                      "&:hover": {
                        backgroundColor: isActive ? "#1E40AF" : "rgba(0,0,0,0.04)",
                        color: isActive ? "#ffffff !important" : "#344054",
                      },
                      /* keep focus/active states white too */
                      "&.Mui-focusVisible, &:focus": {
                        color: isActive ? "#ffffff !important" : undefined,
                      },
                    }}
                  >
                    {r === "Teacher" ? "Teachers" : r === "Student" ? "Students" : "All"}
                  </Button>
                );
              })}
            </Box>
          </Grid>

          {/* Table UI updated to match PendingStudentApprovals look */}
          <Grid item xs={12}>
            <Card sx={{ p: 3, boxShadow: 0, borderRadius: 0 }}>
              <TableContainer>
                <Table sx={{ borderCollapse: "separate", borderSpacing: "0 8px" }}>
                  <TableHead>
                    <TableRow>
                      {[
                        { label: "Name", align: "left" },
                        { label: "Role", align: "center" },
                        { label: "Email", align: "right" },
                      ].map((head) => (
                        <TableCell
                          key={head.label}
                          align={head.align}
                          sx={{ borderBottom: "none" }}
                        >
                          <MDTypography variant="button" fontWeight="bold" color="text">
                            {head.label}
                          </MDTypography>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((user) => (
                          <TableRow
                            key={user.id}
                            hover
                            sx={{
                              cursor: "pointer",
                              backgroundColor: "#f9f9f9",
                              "&:hover": { backgroundColor: "#f0f0f0" },
                            }}
                            onClick={() =>
                              navigate(`/userDetails/${user.id}`, { state: { user, dbJson } })
                            }
                          >
                            <TableCell sx={{ borderBottom: "none" }}>
                              <MDTypography
                                variant="body1"
                                fontWeight="600"
                                color="dark"
                                sx={{
                                  fontSize: "0.95rem",
                                  fontFamily: "Inter, Roboto, sans-serif",
                                }}
                              >
                                {user.name}
                              </MDTypography>
                            </TableCell>

                            <TableCell align="center" sx={{ borderBottom: "none" }}>
                              {renderRoleChip(user.role)}
                            </TableCell>

                            <TableCell align="right" sx={{ borderBottom: "none" }}>
                              <MDTypography
                                variant="body2"
                                color="text"
                                sx={{ fontSize: "0.9rem", fontFamily: "Inter, Roboto, sans-serif" }}
                              >
                                {user.email}
                              </MDTypography>
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} align="center" sx={{ py: 3, borderBottom: "none" }}>
                          <MDTypography color="text">No users found.</MDTypography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Pagination UI to match PendingStudentApprovals */}
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredUsers.length}
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

export default TotalUsers;
