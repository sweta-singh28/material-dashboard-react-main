import React, { useState, useEffect } from "react";
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

// Context for global search
import { useMaterialUIController } from "context";

// Dummy Users
const initialUsers = [
  { id: 1, name: "Sophia Clark", email: "sophia.clark@email.com", role: "Teacher" },
  { id: 2, name: "Ethan Bennett", email: "ethan.bennett@email.com", role: "Student" },
  { id: 3, name: "Olivia Carter", email: "olivia.carter@email.com", role: "Teacher" },
  { id: 4, name: "Liam Davis", email: "liam.davis@email.com", role: "Student" },
  { id: 5, name: "Ava Evans", email: "ava.evans@email.com", role: "Teacher" },
  { id: 6, name: "Noah Foster", email: "noah.foster@email.com", role: "Student" },
];

const TotalUsers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [controller] = useMaterialUIController();
  const { search } = controller; // global search

  const [users, setUsers] = useState(() => {
    const stored = localStorage.getItem("users");
    try {
      if (stored) {
        const parsedStored = JSON.parse(stored);
        if (Array.isArray(parsedStored) && parsedStored.length > 0) {
          return parsedStored;
        }
      }
    } catch (e) {
      console.error("Failed to parse users from localStorage", e);
    }
    return initialUsers;
  });

  const [filterRole, setFilterRole] = useState(() => {
    const fromNav = location.state?.filterRole;
    return fromNav ?? "All";
  });

  useEffect(() => {
    if (location.state?.removedUserId) {
      const updated = users.filter((u) => u.id !== location.state.removedUserId);
      setUsers(updated);
      localStorage.setItem("users", JSON.stringify(updated));
      window.history.replaceState({}, document.title);
    }
  }, [location.state, users]);

  const handleChange = (event) => {
    setFilterRole(event.target.value);
  };

  // Apply both role filter and global search
  const filteredUsers = users
    .filter(filterRole === "All" ? () => true : (user) => user.role === filterRole)
    .filter((user) =>
      Object.values(user).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    );

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
                          onClick={() => navigate(`/userDetails/${user.id}`, { state: { user } })}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              navigate(`/userDetails/${user.id}`, { state: { user } });
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
