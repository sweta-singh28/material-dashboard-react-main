// TotalUsers.jsx
import React, { useState, useEffect, useMemo } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { useNavigate, useLocation } from "react-router-dom";
import { useMaterialUIController } from "context";

const TotalUsers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [controller] = useMaterialUIController();
  const { search } = controller;

  // ✅ 1. Pull dbJson from state (or use fallback hardcoded version)
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

  // ✅ 2. Transform Users to a simpler display structure
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

  const [filterRole, setFilterRole] = useState(
    location.state?.filterRole ? location.state.filterRole : "All"
  );

  const handleChange = (event) => {
    setFilterRole(event.target.value);
  };

  // ✅ 3. Apply filters + global search
  const filteredUsers = useMemo(() => {
    return allUsers
      .filter(filterRole === "All" ? () => true : (user) => user.role === filterRole)
      .filter((user) =>
        Object.values(user).some((value) =>
          String(value).toLowerCase().includes(search.toLowerCase())
        )
      );
  }, [allUsers, filterRole, search]);

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} alignItems="flex-end">
          {/* Title & Subtitle */}
          <Grid item xs={12} md={6}>
            <MDTypography variant="h4" fontWeight="bold" color="dark">
              User Management
            </MDTypography>
            <MDTypography variant="body2" color="text">
              Manage all users within the educational platform.
            </MDTypography>
          </Grid>

          {/* Role Filter */}
          <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Card sx={{ p: 1, boxShadow: 3, borderRadius: "8px", border: "1px solid #e0e0e0" }}>
              <FormControl variant="standard" sx={{ minWidth: 200 }}>
                <InputLabel
                  id="filter-by-role-label"
                  sx={{ color: "#9e9e9e", "&.Mui-focused": { color: "#333" } }}
                >
                  Filter by role
                </InputLabel>
                <Select
                  labelId="filter-by-role-label"
                  id="filter-by-role-select"
                  value={filterRole}
                  onChange={handleChange}
                  label="Filter by role"
                  disableUnderline
                  sx={{
                    "& .MuiSelect-select": { padding: "8px 12px", borderRadius: "4px" },
                    "&:before": { borderBottom: "none" },
                    "&:hover:not(.Mui-disabled):before": { borderBottom: "none" },
                    "&.Mui-focused": {
                      "& .MuiSelect-select": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                    },
                  }}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Student">Student</MenuItem>
                  <MenuItem value="Teacher">Teacher</MenuItem>
                </Select>
              </FormControl>
            </Card>
          </Grid>

          {/* Users Table */}
          <Grid item xs={12}>
            <Card sx={{ p: 2 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Email</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <TableRow
                          key={user.id}
                          hover
                          sx={{ cursor: "pointer" }}
                          onClick={() =>
                            navigate(`/userDetails/${user.id}`, { state: { user, dbJson } })
                          }
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              navigate(`/userDetails/${user.id}`, { state: { user, dbJson } });
                            }
                          }}
                        >
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>{user.email}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} align="center">
                          No users found.
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
