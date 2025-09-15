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

      <MDBox mt={6} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MDTypography
              variant="h6"
              fontWeight="medium"
              color="text"
              sx={{
                fontFamily: "Inter, Roboto, Helvetica, Arial, sans-serif",
                fontSize: "1.05rem",
              }}
            >
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
                      color: isActive ? "#fff" : "#344054",
                      backgroundColor: isActive ? "#1D4ED8" : "transparent",
                      "&:hover": { backgroundColor: isActive ? "#1E40AF" : "rgba(0,0,0,0.04)" },
                    }}
                  >
                    {r === "Teacher" ? "Teachers" : r === "Student" ? "Students" : "All"}
                  </Button>
                );
              })}
            </Box>
          </Grid>

          {/* Table with thinner rows */}
          <Grid item xs={12}>
            <Card
              sx={{
                borderRadius: 2,
                border: "1px solid rgba(226,233,239,1)",
                boxShadow: "none",
                backgroundColor: "#F4F6F7",
              }}
            >
              <TableContainer sx={{ p: 2 }}>
                <Table
                  sx={{
                    width: "100%",
                    borderCollapse: "separate",
                    borderSpacing: "0 8px", // slightly reduced vertical spacing
                  }}
                >
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
                          sx={{
                            fontWeight: 700,
                            textTransform: "uppercase",
                            fontSize: "0.7rem",
                            color: "#6B7280",
                            borderBottom: "none",
                            py: 1,
                            backgroundColor: "transparent",
                            letterSpacing: "0.03em",
                          }}
                        >
                          {head.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <TableRow
                          key={user.id}
                          hover
                          sx={{
                            cursor: "pointer",
                            "& td": {
                              borderBottom: "none",
                              backgroundColor: "#F8F9FA",
                              py: 1.4, // reduced vertical padding for thinner row
                              px: 3,
                            },
                            "& td:first-of-type": {
                              borderTopLeftRadius: 8,
                              borderBottomLeftRadius: 8,
                            },
                            "& td:last-of-type": {
                              borderTopRightRadius: 8,
                              borderBottomRightRadius: 8,
                            },
                            "&:hover td": {
                              backgroundColor: "#F3F6FB",
                            },
                          }}
                          onClick={() =>
                            navigate(`/userDetails/${user.id}`, { state: { user, dbJson } })
                          }
                        >
                          <TableCell sx={{ py: 0 }}>
                            <MDTypography
                              variant="body1"
                              fontWeight="600"
                              color="dark"
                              sx={{ fontSize: "0.95rem", fontFamily: "Inter, Roboto, sans-serif" }}
                            >
                              {user.name}
                            </MDTypography>
                          </TableCell>

                          <TableCell align="center" sx={{ py: 0 }}>
                            {renderRoleChip(user.role)}
                          </TableCell>

                          <TableCell align="right" sx={{ py: 0 }}>
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
                        <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                          <MDTypography color="text">No users found.</MDTypography>
                        </TableCell>
                      </TableRow>
                    )}
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
};

export default TotalUsers;
