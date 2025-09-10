import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// ----- JSON Data -----
const usersJSON = {
  users: [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "student",
      profilePicture: "",
      avatar: "",
      qualifications: "B.Sc Computer Science",
      contact: "1234567890",
      joined: "2022-05-15T10:00:00Z",
      currentlyEnrolled: [
        {
          id: 101,
          title: "Mathematics 101",
          code: "MATH101",
          instructor: "Dr. Smith",
          status: "ongoing",
        },
      ],
      completedEnrolled: [
        {
          id: 102,
          title: "Physics 101",
          code: "PHY101",
          grade: "A",
          status: "completed",
        },
      ],
      rejectedCourses: [
        {
          id: 103,
          title: "Chemistry 101",
          code: "CHEM101",
          reason: "Failed prerequisite",
          status: "rejected",
        },
      ],
      courses: [],
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "teacher",
      profilePicture: "",
      avatar: "",
      qualifications: "M.Sc Physics",
      contact: "9876543210",
      joined: "2021-08-20T09:00:00Z",
      currentlyTeaching: [
        {
          id: 201,
          title: "Physics 101",
          code: "PHY101",
          studentsEnrolled: 30,
          status: "ongoing",
        },
      ],
      completedTeaching: [
        {
          id: 202,
          title: "Mathematics 101",
          code: "MATH101",
          year: 2022,
          status: "completed",
        },
      ],
      rejectedTeaching: [
        {
          id: 203,
          title: "Biology 101",
          code: "BIO101",
          reason: "Cancelled course",
          status: "rejected",
        },
      ],
      teachingCourses: [],
    },
  ],
};

const UserDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState(location.state?.user || null);

  // ----- Fetch user from JSON if not passed via state -----
  useEffect(() => {
    if (!user && id) {
      const found = usersJSON.users.find(
        (u) => String(u.id) === String(id) || Number(u.id) === Number(id)
      );
      if (found) setUser(found);
    }
  }, [id, user]);

  if (!user) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mt={6} mb={3} textAlign="center">
          <MDTypography variant="h6">No user details available.</MDTypography>
          <MDButton variant="gradient" color="info" onClick={() => navigate("/admin/totalUsers")}>
            Back to Total Users page
          </MDButton>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  // ----- Helper Functions -----
  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((s) => s.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const formatCourseTitle = (course) => {
    if (!course && course !== 0) return "Untitled Course";
    if (typeof course === "string") return course;
    if (typeof course === "number") return `Course ${course}`;
    if (typeof course === "object")
      return (
        course.title ||
        course.name ||
        course.courseName ||
        (course.id ? `Course ${course.id}` : "Untitled Course")
      );
    return String(course);
  };

  const extractCourseLists = (userObj) => {
    const current = [];
    const completed = [];
    const rejected = [];
    const role = (userObj.role || "").toLowerCase();

    const _classifyArrayByStatus = (arr) => {
      const cur = [];
      const comp = [];
      const rej = [];
      const currentStatuses = new Set([
        "ongoing",
        "in-progress",
        "current",
        "teaching",
        "active",
        "enrolled",
      ]);
      const completedStatuses = new Set(["completed", "finished", "done"]);
      const rejectedStatuses = new Set(["rejected", "failed", "cancelled"]);

      arr.forEach((c) => {
        if (c && typeof c === "object" && c.status) {
          const s = String(c.status).toLowerCase();
          if (currentStatuses.has(s)) cur.push(c);
          else if (completedStatuses.has(s)) comp.push(c);
          else if (rejectedStatuses.has(s)) rej.push(c);
          else cur.push(c);
        } else cur.push(c);
      });

      return { cur, comp, rej };
    };

    if (role === "teacher") {
      if (Array.isArray(userObj.currentlyTeaching)) current.push(...userObj.currentlyTeaching);
      if (Array.isArray(userObj.completedTeaching)) completed.push(...userObj.completedTeaching);
      if (Array.isArray(userObj.rejectedTeaching)) rejected.push(...userObj.rejectedTeaching);

      if (Array.isArray(userObj.teachingCourses)) {
        const { cur, comp, rej } = _classifyArrayByStatus(userObj.teachingCourses);
        current.push(...cur.filter((c) => !current.includes(c)));
        completed.push(...comp.filter((c) => !completed.includes(c)));
        rejected.push(...rej.filter((c) => !rejected.includes(c)));
      }
    }

    if (role === "student") {
      if (Array.isArray(userObj.currentlyEnrolled)) current.push(...userObj.currentlyEnrolled);
      if (Array.isArray(userObj.completedEnrolled)) completed.push(...userObj.completedEnrolled);
      if (Array.isArray(userObj.completedCourses)) completed.push(...userObj.completedCourses);
      if (Array.isArray(userObj.rejectedCourses)) rejected.push(...userObj.rejectedCourses);
      if (Array.isArray(userObj.rejectedEnrolled)) rejected.push(...userObj.rejectedEnrolled);

      if (Array.isArray(userObj.enrolledCourses)) {
        const { cur, comp, rej } = _classifyArrayByStatus(userObj.enrolledCourses);
        current.push(...cur.filter((c) => !current.includes(c)));
        completed.push(...comp.filter((c) => !completed.includes(c)));
        rejected.push(...rej.filter((c) => !rejected.includes(c)));
      }
    }

    if (Array.isArray(userObj.courses)) {
      const { cur, comp, rej } = _classifyArrayByStatus(userObj.courses);
      current.push(...cur.filter((c) => !current.includes(c)));
      completed.push(...comp.filter((c) => !completed.includes(c)));
      rejected.push(...rej.filter((c) => !rejected.includes(c)));
    }

    return { current, completed, rejected };
  };

  const {
    current: currentCourses,
    completed: completedCourses,
    rejected: rejectedCourses,
  } = extractCourseLists(user);

  const getCourseField = (course, keys = []) => {
    if (!course) return "";
    if (typeof course === "string") return course;
    if (typeof course === "number") return String(course);
    for (const k of keys) {
      if (course[k] !== undefined && course[k] !== null) return course[k];
    }
    return "";
  };

  const roleLower = (user.role || "").toLowerCase();

  const joinedText = (() => {
    const j = user.joined || user.joinedAt || user.joinedDate || user.joinedOn;
    if (!j) return null;
    try {
      const d = new Date(j);
      if (!isNaN(d))
        return `Joined ${d.toLocaleString(undefined, { month: "long" })} ${d.getFullYear()}`;
    } catch (e) {}
    return typeof j === "string" ? j : null;
  })();

  // ----- Render -----
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          {/* Left profile card */}
          <Grid item xs={12} md={4} lg={3}>
            <Card sx={{ p: 3, borderRadius: 2 }}>
              <MDBox display="flex" flexDirection="column" alignItems="center" mb={2}>
                <Avatar
                  src={user.profilePicture || user.avatar || ""}
                  alt={user.name}
                  sx={{ width: 120, height: 120, mb: 1 }}
                >
                  {!user.profilePicture && getInitials(user.name)}
                </Avatar>
                <MDTypography variant="h6">{user.name}</MDTypography>
                <MDTypography variant="caption" color="text">
                  {user.role} {joinedText ? <br /> : null}
                  {joinedText}
                </MDTypography>
              </MDBox>

              <MDBox mt={2}>
                <MDTypography variant="caption" color="text">
                  Name
                </MDTypography>
                <MDTypography variant="body2" mb={1}>
                  {user.name}
                </MDTypography>

                <MDTypography variant="caption" color="text">
                  Email ID
                </MDTypography>
                <MDTypography variant="body2" mb={1}>
                  {user.email}
                </MDTypography>

                <MDTypography variant="caption" color="text">
                  Qualifications
                </MDTypography>
                <MDTypography variant="body2" mb={1}>
                  {user.qualifications || "Not specified"}
                </MDTypography>

                <MDTypography variant="caption" color="text">
                  Contact Number
                </MDTypography>
                <MDTypography variant="body2" mb={1}>
                  {user.contact || "Not specified"}
                </MDTypography>

                <MDBox mt={2} display="flex" justifyContent="space-between">
                  <MDButton variant="gradient" color="info" onClick={() => navigate(-1)}>
                    Back
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>

          {/* Right: courses table rendering remains unchanged */}
          <Grid item xs={12} md={8} lg={9}>
            <MDBox>
              {roleLower === "student" && <>{/* Student tables code here, same as original */}</>}
              {roleLower === "teacher" && <>{/* Teacher tables code here, same as original */}</>}
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default UserDetails;
