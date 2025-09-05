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

const getStoredUsers = () => {
  try {
    const raw = localStorage.getItem("users");
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return [];
};

const UserDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState(location.state?.user || null);

  // If user wasn't passed through state (direct URL)
  useEffect(() => {
    if (!user && id) {
      const stored = getStoredUsers();
      const found = stored.find((u) => String(u.id) === String(id) || Number(u.id) === Number(id));
      if (found) setUser(found);
    }
  }, [id, user]);

  if (!user) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mt={6} mb={3} textAlign="center">
          <MDTypography variant="h6">No user details available.</MDTypography>
          <MDButton variant="gradient" color="info" onClick={() => navigate("/totalUsers")}>
            Back to Total Users page
          </MDButton>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  // ---------- Helper utilities (added to show profile pic & course lists) ----------
  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map((s) => s.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

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
    const role = (userObj.role || "").toLowerCase();

    const _classifyArrayByStatus = (arr) => {
      const cur = [];
      const comp = [];
      const currentStatuses = new Set([
        "ongoing",
        "in-progress",
        "current",
        "teaching",
        "active",
        "enrolled",
      ]);
      const completedStatuses = new Set(["completed", "finished", "done"]);

      arr.forEach((c) => {
        if (c && typeof c === "object" && c.status) {
          const s = String(c.status).toLowerCase();
          if (currentStatuses.has(s)) cur.push(c);
          else if (completedStatuses.has(s)) comp.push(c);
          else cur.push(c); // unknown status -> treat as current
        } else {
          // no status provided -> treat as current
          cur.push(c);
        }
      });

      return { cur, comp };
    };

    // Teacher-specific keys
    if (role === "teacher") {
      if (Array.isArray(userObj.currentlyTeaching)) current.push(...userObj.currentlyTeaching);
      if (Array.isArray(userObj.completedTeaching)) completed.push(...userObj.completedTeaching);

      if (Array.isArray(userObj.teachingCourses)) {
        const { cur, comp } = _classifyArrayByStatus(userObj.teachingCourses);
        // avoid duplicates
        current.push(...cur.filter((c) => !current.includes(c)));
        completed.push(...comp.filter((c) => !completed.includes(c)));
      }
    }

    // Student-specific keys
    if (role === "student") {
      if (Array.isArray(userObj.currentlyEnrolled)) current.push(...userObj.currentlyEnrolled);
      if (Array.isArray(userObj.completedEnrolled)) completed.push(...userObj.completedEnrolled);
      if (Array.isArray(userObj.completedCourses)) completed.push(...userObj.completedCourses);

      if (Array.isArray(userObj.enrolledCourses)) {
        const { cur, comp } = _classifyArrayByStatus(userObj.enrolledCourses);
        current.push(...cur.filter((c) => !current.includes(c)));
        completed.push(...comp.filter((c) => !completed.includes(c)));
      }
    }

    // Generic fallback: user.courses
    if (Array.isArray(userObj.courses)) {
      const { cur, comp } = _classifyArrayByStatus(userObj.courses);
      current.push(...cur.filter((c) => !current.includes(c)));
      completed.push(...comp.filter((c) => !completed.includes(c)));
    }

    return { current, completed };
  };

  const { current: currentCourses, completed: completedCourses } = extractCourseLists(user);

  // helper to safely pick course fields
  const getCourseField = (course, keys = []) => {
    if (!course) return "";
    if (typeof course === "string") return course;
    if (typeof course === "number") return String(course);
    for (const k of keys) {
      if (course[k] !== undefined && course[k] !== null) return course[k];
    }
    return "";
  };

  // ---------- existing remove logic unchanged ----------
  const handleRemoveUser = () => {
    const stored = getStoredUsers();
    const updated = stored.filter((u) => String(u.id) !== String(user.id));
    localStorage.setItem("users", JSON.stringify(updated));

    navigate("/admin/totalUsers", { state: { removedUserId: user.id } });
  };

  const roleLower = (user.role || "").toLowerCase();

  // small renderer helpers for tables
  const StudentTables = () => (
    <>
      <MDBox mb={3}>
        <MDTypography variant="h6" mb={1}>
          Currently Enrolled Courses
        </MDTypography>

        <TableContainer component={Paper} elevation={0}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Course Name</TableCell>
                <TableCell>Course Code</TableCell>
                <TableCell>Instructor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentCourses && currentCourses.length > 0 ? (
                currentCourses.map((c, i) => (
                  <TableRow key={`stud-cur-${i}`}>
                    <TableCell>{formatCourseTitle(c)}</TableCell>
                    <TableCell>
                      {getCourseField(c, ["code", "courseCode", "course_id", "id"])}
                    </TableCell>
                    <TableCell>
                      {getCourseField(c, [
                        "instructor",
                        "teacher",
                        "instructorName",
                        "teacherName",
                      ])}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3}>None</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </MDBox>

      <MDBox>
        <MDTypography variant="h6" mb={1}>
          Completed Courses
        </MDTypography>

        <TableContainer component={Paper} elevation={0}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Course Name</TableCell>
                <TableCell>Course Code</TableCell>
                <TableCell>Grade</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {completedCourses && completedCourses.length > 0 ? (
                completedCourses.map((c, i) => (
                  <TableRow key={`stud-comp-${i}`}>
                    <TableCell>{formatCourseTitle(c)}</TableCell>
                    <TableCell>
                      {getCourseField(c, ["code", "courseCode", "course_id", "id"])}
                    </TableCell>
                    <TableCell>{getCourseField(c, ["grade", "score", "result"])}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3}>None</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </MDBox>
    </>
  );

  const TeacherTables = () => (
    <>
      <MDBox mb={3}>
        <MDTypography variant="h6" mb={1}>
          Currently Teaching Courses
        </MDTypography>

        <TableContainer component={Paper} elevation={0}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Course Name</TableCell>
                <TableCell>Course Code</TableCell>
                <TableCell>Students Enrolled</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentCourses && currentCourses.length > 0 ? (
                currentCourses.map((c, i) => (
                  <TableRow key={`teach-cur-${i}`}>
                    <TableCell>{formatCourseTitle(c)}</TableCell>
                    <TableCell>
                      {getCourseField(c, ["code", "courseCode", "course_id", "id"])}
                    </TableCell>
                    <TableCell>
                      {getCourseField(c, ["studentsEnrolled", "enrolled", "students", "count"])}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3}>None</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </MDBox>

      <MDBox>
        <MDTypography variant="h6" mb={1}>
          Completed Courses
        </MDTypography>

        <TableContainer component={Paper} elevation={0}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Course Name</TableCell>
                <TableCell>Course Code</TableCell>
                <TableCell>Year Completed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {completedCourses && completedCourses.length > 0 ? (
                completedCourses.map((c, i) => (
                  <TableRow key={`teach-comp-${i}`}>
                    <TableCell>{formatCourseTitle(c)}</TableCell>
                    <TableCell>
                      {getCourseField(c, ["code", "courseCode", "course_id", "id"])}
                    </TableCell>
                    <TableCell>
                      {getCourseField(c, ["year", "completedYear", "yearCompleted"])}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3}>None</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </MDBox>
    </>
  );

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
                  <MDButton variant="gradient" color="error" onClick={handleRemoveUser}>
                    Remove User
                  </MDButton>
                  <MDButton variant="gradient" color="info" onClick={() => navigate(-1)}>
                    Back
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>

          {/* Right: courses */}
          <Grid item xs={12} md={8} lg={9}>
            <MDBox>
              {roleLower === "student" ? <StudentTables /> : null}
              {roleLower === "teacher" ? <TeacherTables /> : null}

              {/* If role is neither student nor teacher, still show both lists generically */}
              {roleLower !== "student" && roleLower !== "teacher" && (
                <>
                  <MDTypography variant="h6" mb={1}>
                    Current Courses
                  </MDTypography>
                  <TableContainer component={Paper} elevation={0}>
                    <Table size="small">
                      <TableBody>
                        {currentCourses && currentCourses.length > 0 ? (
                          currentCourses.map((c, i) => (
                            <TableRow key={`gen-cur-${i}`}>
                              <TableCell>{formatCourseTitle(c)}</TableCell>
                              <TableCell>
                                {getCourseField(c, ["code", "courseCode", "course_id", "id"])}
                              </TableCell>
                              <TableCell>
                                {getCourseField(c, ["instructor", "teacher", "instructorName"])}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={3}>None</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <MDTypography variant="h6" mb={1} mt={3}>
                    Completed Courses
                  </MDTypography>
                  <TableContainer component={Paper} elevation={0}>
                    <Table size="small">
                      <TableBody>
                        {completedCourses && completedCourses.length > 0 ? (
                          completedCourses.map((c, i) => (
                            <TableRow key={`gen-comp-${i}`}>
                              <TableCell>{formatCourseTitle(c)}</TableCell>
                              <TableCell>
                                {getCourseField(c, ["code", "courseCode", "course_id", "id"])}
                              </TableCell>
                              <TableCell>
                                {getCourseField(c, ["grade", "year", "completedYear"])}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={3}>None</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
};

export default UserDetails;
