import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// MUI Icons
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

// Recharts
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

// ---------------- StatCard Component ----------------
const StatCard = ({ icon, color, title, value, onClick }) => (
  <Card
    onClick={onClick} // make the entire card clickable
    sx={{
      p: 2,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "space-between",
      minHeight: "140px",
      boxShadow: 3,
      transition: "transform 0.2s, box-shadow 0.2s",
      cursor: "pointer",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: 6,
      },
    }}
  >
    <MDBox
      sx={{
        backgroundColor: color,
        p: 1.2,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 1.5,
      }}
    >
      {React.cloneElement(icon, { sx: { fontSize: 20, color: "#fff" } })}
    </MDBox>
    <MDTypography variant="h6" fontWeight="bold">
      {value}
    </MDTypography>
    <MDBox display="flex" justifyContent="space-between" width="100%" alignItems="center" mt={0.5}>
      <MDTypography variant="caption" color="text" fontWeight="medium" textTransform="uppercase">
        {title}
      </MDTypography>
      <ArrowForwardIcon sx={{ fontSize: 18, color: "text.secondary" }} />
    </MDBox>
  </Card>
);

StatCard.propTypes = {
  icon: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onClick: PropTypes.func.isRequired,
};

// ---------------- ChartCardHeader Component ----------------
const ChartCardHeader = ({ title, description }) => (
  <MDBox p={2}>
    <MDTypography variant="body1" fontWeight="medium" sx={{ fontSize: "1rem" }} mb={0.5}>
      {title}
    </MDTypography>
    <MDTypography variant="caption" color="text" fontWeight="regular" sx={{ fontSize: "0.75rem" }}>
      {description}
    </MDTypography>
  </MDBox>
);

ChartCardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

// ---------------- AdminDashboard Component ----------------
const AdminDashboard = () => {
  const navigate = useNavigate();

  const userData = [
    { role: "Students", count: 120 },
    { role: "Teachers", count: 25 },
  ];

  const courseData = [
    { subject: "Math", count: 10 },
    { subject: "Science", count: 8 },
    { subject: "English", count: 6 },
    { subject: "History", count: 5 },
    { subject: "Computer", count: 3 },
  ];

  const userColors = ["#3f51b5", "#ff7043"];
  const courseColors = ["#4caf50", "#2196f3", "#ff9800", "#9c27b0", "#f44336"];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3}>
          {/* Title */}
          <Grid item xs={12}>
            <MDTypography variant="h4" fontWeight="bold" color="dark">
              Dashboard Overview
            </MDTypography>
          </Grid>

          {/* Stats */}
          <Grid item xs={12} md={4}>
            <StatCard
              icon={<PeopleAltIcon />}
              color="#3f51b5"
              title="Total Users"
              value="1,250"
              onClick={() => navigate("/admin/totalUsers")}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <StatCard
              icon={<MenuBookIcon />}
              color="#4caf50"
              title="Active Courses"
              value="32"
              onClick={() => navigate("/admin/activeCourses")}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <StatCard
              icon={<AssignmentTurnedInIcon />}
              color="#ffc107"
              title="Pending Approvals"
              value="5"
              onClick={() => navigate("/admin/pendingApprovals")}
            />
          </Grid>

          {/* Graphs */}
          <Grid item xs={12} lg={6}>
            <Card sx={{ height: "100%", boxShadow: 3 }}>
              <ChartCardHeader
                title="User Enrollment Analytics"
                description="Breakdown of students vs. teachers"
              />
              <MDBox p={2} height="350px">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userData} barSize={50}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="role" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                      {userData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={userColors[index % userColors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </MDBox>
            </Card>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Card sx={{ height: "100%", boxShadow: 3 }}>
              <ChartCardHeader
                title="Courses Overview"
                description="Number of courses by subject"
              />
              <MDBox p={2} height="350px">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={courseData} barSize={40}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="subject" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                      {courseData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={courseColors[index % courseColors.length]}
                        />
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
