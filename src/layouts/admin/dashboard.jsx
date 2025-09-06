import React, { useEffect, useState } from "react";
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

  // State to hold counts
  const [userData, setUserData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeCourses, setActiveCourses] = useState(0);
  const [pendingApprovals, setPendingApprovals] = useState(0);

  // Mock lists (simulate DB data)
  const studentsList = [
    { id: 1, name: "John" },
    { id: 2, name: "Alice" },
    { id: 3, name: "Raj" },
    // ...more
  ];

  const teachersList = [
    { id: 1, name: "Mr. Smith" },
    { id: 2, name: "Mrs. Patel" },
    // ...more
  ];

  const coursesList = [
    { id: 1, subject: "Math", status: "active" },
    { id: 2, subject: "Science", status: "active" },
    { id: 3, subject: "English", status: "active" },
    { id: 4, subject: "History", status: "inactive" },
    { id: 5, subject: "Computer", status: "pending" },
    // ...more
  ];

  useEffect(() => {
    // Count users
    const studentCount = studentsList.length;
    const teacherCount = teachersList.length;

    setUserData([
      { role: "Students", count: studentCount },
      { role: "Teachers", count: teacherCount },
    ]);

    setTotalUsers(studentCount + teacherCount);

    // Count courses
    const subjectCounts = {};
    coursesList.forEach((course) => {
      subjectCounts[course.subject] = (subjectCounts[course.subject] || 0) + 1;
    });

    const formattedCourseData = Object.entries(subjectCounts).map(([subject, count]) => ({
      subject,
      count,
    }));

    setCourseData(formattedCourseData);

    // Active courses
    setActiveCourses(coursesList.filter((c) => c.status === "active").length);

    // Pending approvals
    setPendingApprovals(coursesList.filter((c) => c.status === "pending").length);
  }, []);

  const userColors = ["#3f51b5", "#ff7043"];
  const courseColors = ["#4caf50", "#2196f3", "#ff9800", "#9c27b0", "#f44336"];

  const handleUserBarClick = (entryRole) => {
    const mapRole =
      entryRole === "Students" ? "Student" : entryRole === "Teachers" ? "Teacher" : null;
    if (mapRole) {
      navigate("/admin/totalUsers", { state: { filterRole: mapRole } });
    } else {
      navigate("/admin/totalUsers");
    }
  };

  const handleCoursesCardClick = () => {
    navigate("/admin/totalCourses");
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

          {/* Courses Overview graph removed as requested */}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default AdminDashboard;
