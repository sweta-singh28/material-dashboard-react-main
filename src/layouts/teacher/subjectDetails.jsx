import React from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// React Router
import { useParams, useNavigate, useLocation } from "react-router-dom";

// Charts
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function SubjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [openUpdateForm, setOpenUpdateForm] = React.useState(false);
  const [updateText, setUpdateText] = React.useState("");

  // ✅ Schema-based JSON (hardcoded, API-ready)
  const courses = [
    {
      course_id: 1,
      course_name: "Mathematics",
      course_code: "MTH101",
      course_syllabus: {
        chapters: [
          "Linear Equations",
          "Quadratic Equations",
          "Polynomials",
          "Lines & Angles",
          "Triangles",
          "Circles",
          "Coordinate Geometry",
          "Limits & Continuity",
          "Derivatives",
          "Integrals",
          "Probability Basics",
          "Distributions",
          "Data Analysis",
        ],
      },
      course_current_completed: ["Linear Equations", "Quadratic Equations", "Lines & Angles"],
      students: [
        {
          user_id: 1,
          full_name: "Sophia Clark",
          email: "sophia@example.com",
          profile_picture: "https://i.pravatar.cc/150?u=sophia@example.com",
        },
        {
          user_id: 2,
          full_name: "Ethan Miller",
          email: "ethan@example.com",
          profile_picture: "https://i.pravatar.cc/150?u=ethan@example.com",
        },
      ],
    },
  ];

  const defaultCourse = {
    course_id: 0,
    course_name: "Unknown",
    course_code: "-",
    course_syllabus: { chapters: [] },
    course_current_completed: [],
    students: [],
  };

  const parsedId = id ? Number(id) : null;
  const courseFromParams =
    parsedId && courses.find((c) => c.course_id === parsedId)
      ? courses.find((c) => c.course_id === parsedId)
      : undefined;

  const course = location.state?.course || courseFromParams || courses[0] || defaultCourse;

  // ✅ Track completed chapters in state (tickable)
  const [completedChapters, setCompletedChapters] = React.useState(
    course.course_current_completed || []
  );

  const handleToggleChapter = (chapter) => {
    setCompletedChapters((prev) =>
      prev.includes(chapter) ? prev.filter((c) => c !== chapter) : [...prev, chapter]
    );
  };

  // Dummy progress data
  const progressData = [
    { week: "Week 1", completion: 70 },
    { week: "Week 2", completion: 80 },
    { week: "Week 3", completion: 90 },
    { week: "Week 4", completion: 60 },
  ];

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    console.log("Updated course info:", updateText);
    setUpdateText("");
    setOpenUpdateForm(false);
  };

  // Navigate to student details
  const handleStudentClick = (userId) => {
    navigate(`/students/${userId}`);
  };

  // Navigate to upload materials with type 'assignment'
  const handleAddAssignment = () => {
    navigate("/uploadMaterials", { state: { course, type: "assignment" } });
  };

  // Navigate to upload materials with type 'notes'
  const handleAddNotes = () => {
    navigate("/uploadMaterials", { state: { course, type: "notes" } });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container justifyContent="center" spacing={3}>
          {/* Course Info Card */}
          <Grid item xs={12} md={8} lg={6}>
            <Card sx={{ p: 4, borderRadius: "16px", boxShadow: 4 }}>
              <MDTypography variant="h4" fontWeight="bold" gutterBottom>
                📘 Course Details
              </MDTypography>
              <Divider sx={{ my: 2 }} />

              <MDBox mb={2}>
                <MDTypography variant="h6">Course Name:</MDTypography>
                <MDTypography variant="body1">{course.course_name}</MDTypography>
              </MDBox>

              <MDBox mb={2}>
                <MDTypography variant="h6">Course Code:</MDTypography>
                <MDTypography variant="body1">{course.course_code}</MDTypography>
              </MDBox>

              <MDBox mb={2}>
                <MDTypography variant="h6">Enrolled Students:</MDTypography>
                {course.students?.length ? (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell>Profile</TableCell>
                          <TableCell>Student Name</TableCell>
                          <TableCell>Email</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {course.students.map((student, index) => (
                          <TableRow
                            key={student.user_id}
                            hover
                            sx={{ cursor: "pointer" }}
                            onClick={() => handleStudentClick(student.user_id)}
                          >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                              <img
                                src={student.profile_picture}
                                alt={student.full_name}
                                width={40}
                                height={40}
                                style={{ borderRadius: "50%" }}
                              />
                            </TableCell>
                            <TableCell>{student.full_name}</TableCell>
                            <TableCell>{student.email}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <MDTypography variant="body1">No students enrolled yet</MDTypography>
                )}
              </MDBox>

              {/* Add Assignment & Notes Buttons */}
              <MDBox
                mt={3}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap={2}
              >
                <Button
                  variant="contained"
                  color="info"
                  onClick={handleAddAssignment}
                  sx={{ borderRadius: "12px", textTransform: "none" }}
                >
                  ➕ Add Assignment
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  onClick={handleAddNotes}
                  sx={{ borderRadius: "12px", textTransform: "none" }}
                >
                  📝 Add Notes
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(-1)}
                  sx={{ borderRadius: "12px", textTransform: "none" }}
                >
                  ← Back to Courses
                </Button>
              </MDBox>
            </Card>
          </Grid>

          {/* Course Progress Chart */}
          <Grid item xs={12} md={10} lg={8}>
            <Card sx={{ p: 4, borderRadius: "16px", boxShadow: 4 }}>
              <MDTypography variant="h5" fontWeight="bold" gutterBottom>
                📊 Course Progress
              </MDTypography>
              <Divider sx={{ my: 2 }} />
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="completion" fill="#673ab7" name="Completion %" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>

          {/* ✅ Course Syllabus Checklist */}
          <Grid item xs={12} md={10} lg={8}>
            <Card sx={{ p: 4, borderRadius: "16px", boxShadow: 4 }}>
              <MDTypography variant="h5" fontWeight="bold" gutterBottom>
                📑 Course Syllabus Checklist
              </MDTypography>
              <Divider sx={{ my: 2 }} />
              <List>
                {course.course_syllabus?.chapters?.map((chapter, index) => (
                  <ListItem key={index} button onClick={() => handleToggleChapter(chapter)}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={completedChapters.includes(chapter)}
                        tabIndex={-1}
                        disableRipple
                        sx={{ color: "#673ab7" }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={chapter} />
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>

          {/* Teacher Update Section */}
          <Grid item xs={12} md={10} lg={8}>
            <Card sx={{ p: 4, borderRadius: "16px", boxShadow: 4 }}>
              <MDTypography variant="h5" fontWeight="bold" gutterBottom>
                ✏️ Update About Course
              </MDTypography>
              <Divider sx={{ my: 2 }} />

              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: "12px", textTransform: "none", mb: 2 }}
                onClick={() => setOpenUpdateForm(!openUpdateForm)}
              >
                Update About Course
              </Button>

              <Collapse in={openUpdateForm}>
                <form onSubmit={handleUpdateSubmit}>
                  <MDBox display="flex" flexDirection="column" gap={2} mt={2}>
                    <TextField
                      label="Write updates about assignments / notes"
                      multiline
                      rows={4}
                      variant="outlined"
                      value={updateText}
                      onChange={(e) => setUpdateText(e.target.value)}
                      fullWidth
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      sx={{ borderRadius: "12px", textTransform: "none" }}
                    >
                      Submit Update
                    </Button>
                  </MDBox>
                </form>
              </Collapse>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default SubjectDetails;
