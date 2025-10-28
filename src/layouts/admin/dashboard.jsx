// AdminDashboard.jsx
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

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

// Global search context
import { useSearch } from "context";

// Redux: reducer & thunk
import { fetchAdminStats } from "../../redux/adminDashboard/adminDashboardThunks";

const StatCard = ({ icon, color, title, value, onClick }) => (
  <Card
    onClick={onClick}
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

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { search } = useSearch(); // Global search (can be used later for filtering)

  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.adminDashboard || {});

  useEffect(() => {
    dispatch(fetchAdminStats());
  }, [dispatch]);
  console.log("Admin Dashboard Stats:", stats);
  const totalUsers = stats.totalUsers || 0;
  const activeCourses = stats.activeCourses || 0;
  const pendingApprovals = stats.pendingCourses || 0;

  // Users breakdown for chart (Students vs Teachers)
  const userRoleCounts = stats.userRoleCounts || [];
  const usersChartData = Object.keys(userRoleCounts).map((role) => ({
    role,
    count: userRoleCounts[role],
  }));

  const courseEnrollmentCounts = stats.courseEnrollmentCounts || [];
  const topCoursesData = Object.entries(courseEnrollmentCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([course_name, count]) => ({ course_name, count }));

  const userColors = ["#3f51b5", "#ff7043", "#4caf50", "#2196f3"];
  const courseColors = ["#4caf50", "#2196f3", "#ff9800", "#9c27b0", "#f44336"];

  const handleUserBarClick = (entryRole) => {
    const mapRole =
      entryRole === "Students" ? "Student" : entryRole === "Teachers" ? "Teacher" : entryRole;
    if (mapRole) {
      navigate("/admin/totalUsers", { state: { filterRole: mapRole } });
    } else {
      navigate("/admin/totalUsers");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MDTypography variant="h4" fontWeight="bold" color="dark">
              Dashboard Overview
            </MDTypography>
          </Grid>

          <Grid item xs={12} md={4}>
            <StatCard
              icon={<PeopleAltIcon />}
              color="#3f51b5"
              title="Total Users"
              value={totalUsers}
              onClick={() => navigate("/admin/totalUsers")}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <StatCard
              icon={<MenuBookIcon />}
              color="#4caf50"
              title="Active Courses"
              value={activeCourses}
              onClick={() => navigate("/admin/activeCourses")}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <StatCard
              icon={<AssignmentTurnedInIcon />}
              color="#ffc107"
              title="Pending Approvals"
              value={pendingApprovals}
              onClick={() => navigate("/admin/pendingApprovals")}
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <Card sx={{ height: "100%", boxShadow: 3 }}>
              <ChartCardHeader
                title="User Enrollment Analytics"
                description="Breakdown of students vs. teachers"
              />
              <MDBox p={2} height="350px">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={usersChartData} barSize={50}>
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
                      {usersChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={userColors[index % userColors.length]}
                          cursor="pointer"
                          onClick={() => handleUserBarClick(entry.role)}
                        />
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
                title="Top 5 Most Enrolled Courses"
                description="By student Enrollment"
              />
              <MDBox p={2} height="350px">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={topCoursesData}
                    margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis type="number" tick={{ fontSize: 10 }} />
                    <YAxis type="category" dataKey="course_name" tick={{ fontSize: 10 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                      }}
                    />
                    <Bar dataKey="count" radius={[0, 10, 10, 0]}>
                      {topCoursesData.map((entry, index) => (
                        <Cell
                          key={`cell-course-${index}`}
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

//JSON
// const dashboardData = {
//   stats: { totalUsers, activeCourses, pendingApprovals },
//   users: usersChartData,
//   courses: topCoursesData,
//   dbJson,
// };
