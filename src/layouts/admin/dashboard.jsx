import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Recharts for the bar chart
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Cell,
} from "recharts";

const AdminDashboard = () => {
  // Sample data for users (replace with API data)
  const data = [
    { role: "Students", count: 120 },
    { role: "Teachers", count: 25 },
  ];

  // Custom colors for each role
  const colors = ["#3f51b5", "#ff7043"];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          {/* Title */}
          <Grid item xs={12}>
            <MDTypography variant="h4" fontWeight="bold" color="dark">
              Admin Dashboard
            </MDTypography>
          </Grid>

          {/* User Stats Card with Graph */}
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={2}>
                <MDTypography variant="h5" fontWeight="medium">
                  User Overview
                </MDTypography>
              </MDBox>
              <MDBox p={2} height="350px">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} barSize={50}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="role" tick={{ fontSize: 14 }} />
                    <YAxis tick={{ fontSize: 14 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default AdminDashboard;
