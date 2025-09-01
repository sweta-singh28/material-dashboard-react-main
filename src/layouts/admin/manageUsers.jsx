import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

const ManageUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", role: "Student", email: "alice@example.com" },
    { id: 2, name: "Bob", role: "Teacher", email: "bob@example.com" },
    { id: 3, name: "Charlie", role: "Student", email: "charlie@example.com" },
  ]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    color: "success",
  });

  const handleAddUser = () => {
    const newUser = {
      id: Date.now(),
      name: "New User",
      role: "Student",
      email: "newuser@example.com",
    };
    setUsers([...users, newUser]);
    setSnackbar({
      open: true,
      message: "User added successfully!",
      color: "success",
    });
  };

  const handleRemoveUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    setSnackbar({
      open: true,
      message: "User removed successfully!",
      color: "warning",
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Card>
              <MDBox p={2} display="flex" justifyContent="space-between" alignItems="center">
                <MDTypography variant="h5" fontWeight="medium">
                  Manage Users
                </MDTypography>
                <MDButton variant="gradient" color="success" onClick={handleAddUser}>
                  Add User
                </MDButton>
              </MDBox>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">
                        <strong>Name</strong>
                      </TableCell>
                      <TableCell align="center">
                        <strong>Role</strong>
                      </TableCell>
                      <TableCell align="center">
                        <strong>Email</strong>
                      </TableCell>
                      <TableCell align="center">
                        <strong>Actions</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell align="left">{user.name}</TableCell>
                        <TableCell align="center">{user.role}</TableCell>
                        <TableCell align="center">{user.email}</TableCell>
                        <TableCell align="center">
                          <MDButton
                            color="error"
                            variant="outlined"
                            onClick={() => handleRemoveUser(user.id)}
                          >
                            Remove
                          </MDButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <MDSnackbar
        color={snackbar.color}
        icon="notifications"
        title="Admin"
        content={snackbar.message}
        dateTime=""
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        close={() => setSnackbar({ ...snackbar, open: false })}
      />

      <Footer />
    </DashboardLayout>
  );
};

export default ManageUsers;
