// AdminDashboard.jsx
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

// Global search context
import { useSearch } from "context";

// ---------------- StatCard Component ----------------
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
  const { search } = useSearch(); // Global search (can be used later for filtering)

  // ---------------- Dynamic JSON (matches your DB schema) ----------------
  // Replace `dbJson` later with an API response matching the same schema
  const dbJson = {
    total_users_count: 5,
    active_courses_count: 0,
    pending_approvals_count: 0,
  };
  // -----------------------------------------------------------------------

  // ---------- derive dashboard-friendly aggregates from dbJson ----------
  const totalUsers = Array.isArray(dbJson.Users) ? dbJson.Users.length : 0;

  const activeCourses = Array.isArray(dbJson.Courses)
    ? dbJson.Courses.filter((c) => c.course_status === "active").length
    : 0;

  const pendingApprovals = Array.isArray(dbJson.SubmittedAssignments)
    ? dbJson.SubmittedAssignments.filter((s) => String(s.approval).toLowerCase() === "pending")
        .length
    : 0;

  // Users breakdown for chart (Students vs Teachers)
  const userRoleCounts = {};
  if (Array.isArray(dbJson.Users)) {
    dbJson.Users.forEach((u) => {
      const role = u.user_role || "Unknown";
      userRoleCounts[role] = (userRoleCounts[role] || 0) + 1;
    });
  }
  const usersChartData = Object.keys(userRoleCounts).map((role) => ({
    role,
    count: userRoleCounts[role],
  }));

  // Courses breakdown (derive a subject from the course_name first token, e.g., "Math 101" -> "Math")
  const courseSubjectCounts = {};
  if (Array.isArray(dbJson.Courses)) {
    dbJson.Courses.forEach((c) => {
      const name = c.course_name || "";
      const subject = (name.split(" ")[0] || "Other").trim();
      courseSubjectCounts[subject] = (courseSubjectCounts[subject] || 0) + 1;
    });
  }
  const coursesChartData = Object.keys(courseSubjectCounts).map((subject) => ({
    subject,
    count: courseSubjectCounts[subject],
  }));
  // ---------------------------------------------------------------------

  const userColors = ["#3f51b5", "#ff7043", "#4caf50", "#2196f3"];
  const courseColors = ["#4caf50", "#2196f3", "#ff9800", "#9c27b0", "#f44336"];

  const handleUserBarClick = (entryRole) => {
    const mapRole =
      entryRole === "Students" ? "Student" : entryRole === "Teachers" ? "Teacher" : entryRole;
    // Keep navigation consistent with your existing routing patterns
    if (mapRole) {
      navigate("/admin/totalUsers", { state: { filterRole: mapRole } });
    } else {
      navigate("/admin/totalUsers");
    }
  };

  // Build a small object similar to your old `dashboardData` to reuse the UI without changing other code
  const dashboardData = {
    stats: {
      totalUsers,
      activeCourses,
      pendingApprovals,
    },
    users: usersChartData,
    courses: coursesChartData,
    // Keep full payload available if some other page wants to inspect original tables
    dbJson,
  };

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
              value={dashboardData.stats.totalUsers}
              onClick={() => navigate("/admin/totalUsers")}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <StatCard
              icon={<MenuBookIcon />}
              color="#4caf50"
              title="Active Courses"
              value={dashboardData.stats.activeCourses}
              onClick={() => navigate("/admin/activeCourses")}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <StatCard
              icon={<AssignmentTurnedInIcon />}
              color="#ffc107"
              title="Pending Approvals"
              value={dashboardData.stats.pendingApprovals}
              onClick={() => navigate("/admin/pendingApprovals")}
            />
          </Grid>

          {/* User Enrollment Graph */}
          <Grid item xs={12} lg={6}>
            <Card sx={{ height: "100%", boxShadow: 3 }}>
              <ChartCardHeader
                title="User Enrollment Analytics"
                description="Breakdown of students vs. teachers"
              />
              <MDBox p={2} height="350px">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboardData.users} barSize={50}>
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
                      {dashboardData.users.map((entry, index) => (
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
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default AdminDashboard;
