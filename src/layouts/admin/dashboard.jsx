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
    Users: [
      {
        email: "alice.student@example.com",
        password: "hashed_pw_1",
        create_time: "2025-01-10T09:30:00Z",
        first_name: "Alice",
        last_name: "Mistry",
        user_id: "u_1",
        user_role: "Student",
        user_picture: null,
        qualifications: "High School",
      },
      {
        email: "bob.student@example.com",
        password: "hashed_pw_2",
        create_time: "2025-02-14T11:20:00Z",
        first_name: "Bob",
        last_name: "Sharma",
        user_id: "u_2",
        user_role: "Student",
        user_picture: null,
        qualifications: "High School",
      },
      {
        email: "charlie.teacher@example.com",
        password: "hashed_pw_3",
        create_time: "2024-12-01T08:00:00Z",
        first_name: "Charlie",
        last_name: "Khan",
        user_id: "u_3",
        user_role: "Teacher",
        user_picture: null,
        qualifications: "M.Ed",
      },
      {
        email: "diana.teacher@example.com",
        password: "hashed_pw_4",
        create_time: "2024-11-05T10:45:00Z",
        first_name: "Diana",
        last_name: "Verma",
        user_id: "u_4",
        user_role: "Teacher",
        user_picture: null,
        qualifications: "PhD",
      },
      {
        email: "eve.student@example.com",
        password: "hashed_pw_5",
        create_time: "2025-03-05T14:10:00Z",
        first_name: "Eve",
        last_name: "Singh",
        user_id: "u_5",
        user_role: "Student",
        user_picture: null,
        qualifications: "High School",
      },
      // add more users if needed
    ],
    Courses: [
      {
        idCourses: "c_1",
        course_name: "Math 101",
        course_pre_requisites: "[]",
        course_syllabus: JSON.stringify({ chapters: ["Algebra", "Geometry"] }),
        course_code: "MATH101",
        course_status: "active",
        course_description: "Basic mathematics",
        course_thumbnail: null,
        course_current_completed: JSON.stringify([]),
        course_active_students: JSON.stringify(["u_1", "u_2"]),
        course_pending_students: JSON.stringify([]),
        teachers_user_id: "u_3",
      },
      {
        idCourses: "c_2",
        course_name: "Science Basics",
        course_pre_requisites: "[]",
        course_syllabus: JSON.stringify({ chapters: ["Physics", "Chemistry"] }),
        course_code: "SCI101",
        course_status: "active",
        course_description: "Intro to science",
        course_thumbnail: null,
        course_current_completed: JSON.stringify([]),
        course_active_students: JSON.stringify(["u_5"]),
        course_pending_students: JSON.stringify(["u_2"]),
        teachers_user_id: "u_4",
      },
      {
        idCourses: "c_3",
        course_name: "English Literature",
        course_pre_requisites: "[]",
        course_syllabus: JSON.stringify({ chapters: ["Poetry", "Prose"] }),
        course_code: "ENG101",
        course_status: "inactive",
        course_description: "English studies",
        course_thumbnail: null,
        course_current_completed: JSON.stringify([]),
        course_active_students: JSON.stringify([]),
        course_pending_students: JSON.stringify([]),
        teachers_user_id: "u_4",
      },
    ],
    Assignment_Notes: [
      {
        AN_id: "a_1",
        AN_link: "https://example.com/assignments/a_1.pdf",
        AN_title: "Math Assignment 1",
        AssignmentOrNotes: 1, // 1 => assignment, 0 => notes (per your DB)
        AssignmentDeadline: "2025-04-30T23:59:00Z",
        creation_date: "2025-04-01T08:00:00Z",
        Users_user_id: "u_3",
        Courses_idCourses: "c_1",
      },
      {
        AN_id: "a_2",
        AN_link: "https://example.com/notes/n_1.pdf",
        AN_title: "Science Notes Week 1",
        AssignmentOrNotes: 0,
        AssignmentDeadline: null,
        creation_date: "2025-03-20T10:00:00Z",
        Users_user_id: "u_4",
        Courses_idCourses: "c_2",
      },
    ],
    SubmittedAssignments: [
      {
        submission_id: "s_1",
        submission_link: "https://example.com/submissions/s_1.pdf",
        submission_time: "2025-04-15T12:00:00Z",
        approval: "pending",
        Assignment_Notes_AN_id: "a_1",
        Users_user_id: "u_1",
      },
      {
        submission_id: "s_2",
        submission_link: "https://example.com/submissions/s_2.pdf",
        submission_time: "2025-04-16T13:30:00Z",
        approval: "approved",
        Assignment_Notes_AN_id: "a_1",
        Users_user_id: "u_2",
      },
    ],
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
