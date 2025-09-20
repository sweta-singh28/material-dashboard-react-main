import React from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Avatar from "@mui/material/Avatar";
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
import TextField from "@mui/material/TextField";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Layout
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// React Router
import { useParams, useNavigate, useLocation } from "react-router-dom";

// A simple static component to represent the bar chart from the image
function CourseProgressBar() {
  const bars = [
    { value: 60, label: "Week 1" },
    { value: 90, label: "Week 2" },
    { value: 85, label: "Week 3" },
    { value: 100, label: "Week 4" },
  ];

  return (
    <MDBox display="flex" justifyContent="space-around" alignItems="flex-end" height="150px" mt={2}>
      {bars.map((bar, index) => (
        <MDBox key={index} textAlign="center">
          <MDBox
            display="flex"
            alignItems="flex-end"
            justifyContent="center"
            width="40px"
            height={`${bar.value}%`}
            sx={{
              backgroundColor: "#1A73E8",
              borderRadius: "4px",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                height: `${100 - bar.value}%`,
              },
            }}
          />
          <MDTypography variant="caption" color="text" mt={1}>
            {bar.label}
          </MDTypography>
        </MDBox>
      ))}
    </MDBox>
  );
}

function SubjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [updateText, setUpdateText] = React.useState("");

  const courses = [
    {
      course_id: 1,
      course_name: "Introduction to Programming",
      course_code: "CS101",
      course_syllabus: {
        chapters: [
          "Introduction to Programming Concepts",
          "Data Types and Variables",
          "Control Structures (Loops and Conditionals)",
          "Functions and Modularity",
          "Object-Oriented Programming",
        ],
      },
      course_current_completed: ["Introduction to Programming Concepts"],
      students: [
        {
          user_id: 101,
          full_name: "Sophia Clark",
          email: "sophia.clark@email.com",
          profile_picture: "https://i.pravatar.cc/150?u=sophia@example.com",
        },
        {
          user_id: 102,
          full_name: "Ethan Miller",
          email: "ethan.miller@email.com",
          profile_picture: "https://i.pravatar.cc/150?u=ethan@example.com",
        },
        {
          user_id: 103,
          full_name: "Olivia Davis",
          email: "olivia.davis@email.com",
          profile_picture: "https://i.pravatar.cc/150?u=olivia@example.com",
        },
        {
          user_id: 104,
          full_name: "Noah Wilson",
          email: "noah.wilson@email.com",
          profile_picture: "https://i.pravatar.cc/150?u=noah@example.com",
        },
        {
          user_id: 105,
          full_name: "Ava Taylor",
          email: "ava.taylor@email.com",
          profile_picture: "https://i.pravatar.cc/150?u=ava@example.com",
        },
      ],
    },
  ];

  const defaultCourse = {
    course_id: 0,
    course_name: "Unknown Course",
    course_code: "N/A",
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

  const [completedChapters, setCompletedChapters] = React.useState(
    course.course_current_completed || []
  );

  const handleToggleChapter = (chapter) => {
    setCompletedChapters((prev) =>
      prev.includes(chapter) ? prev.filter((c) => c !== chapter) : [...prev, chapter]
    );
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    console.log("Updated course info:", updateText);
    setUpdateText("");
  };

  const handleStudentClick = (userId) => {
    navigate(`/students/${userId}`);
  };

  const handleAddAssignment = () => {
    navigate("/uploadMaterials", { state: { course, type: "assignment" } });
  };

  const handleAddNotes = () => {
    navigate("/uploadMaterials", { state: { course, type: "notes" } });
  };

  const matchedButtonSx = {
    background: "linear-gradient(135deg,#1A73E8 0%, #1565C0 100%)",
    color: "#fff",
    borderRadius: "6px",
    padding: "6px 16px",
    minWidth: "180px",
    height: "40px",
    boxShadow: "0 6px 18px rgba(26,115,232,0.32)",
    textTransform: "none",
    fontWeight: 700,
    fontSize: "13px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    "&:hover": {
      boxShadow: "0 8px 24px rgba(26,115,232,0.38)",
      background: "linear-gradient(135deg,#1765d8 0%, #0f55b0 100%)",
    },
    "& .MuiSvgIcon-root, & .MuiIcon-root": {
      color: "#fff",
      fontSize: "17px",
      fontWeight: 700,
    },
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        {/* Header */}
        <MDBox mb={3}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <MDTypography variant="h4" fontWeight="bold">
                {course.course_name}
              </MDTypography>
              <MDTypography variant="body2" color="text">
                Course Code: {course.course_code}
              </MDTypography>
            </Grid>
            <Grid item>
              <MDButton onClick={() => navigate(-1)} sx={matchedButtonSx}>
                <Icon sx={{ fontWeight: "bold" }}>arrow_back</Icon>
                Back to Courses
              </MDButton>
            </Grid>
          </Grid>
        </MDBox>

        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} lg={8}>
            <Grid container spacing={3}>
              {/* Course Progress Card */}
              <Grid item xs={12}>
                <Card>
                  <MDBox p={2}>
                    <MDTypography variant="h6" fontWeight="medium">
                      Course Progress
                    </MDTypography>
                    <CourseProgressBar />
                  </MDBox>
                </Card>
              </Grid>

              {/* Enrolled Students Card */}
              <Grid item xs={12}>
                <Card>
                  <MDBox pt={2} px={2}>
                    <MDTypography variant="h6" fontWeight="medium">
                      Enrolled Students
                    </MDTypography>
                  </MDBox>
                  <TableContainer>
                    <Table>
                      <TableHead sx={{ display: "table-header-group" }}>
                        <TableRow>
                          <TableCell sx={{ px: 2, width: "15%", borderBottom: "none" }}>
                            <MDTypography variant="subtitle2">Roll Number</MDTypography>
                          </TableCell>
                          <TableCell sx={{ px: 2, borderBottom: "none" }}>
                            <MDTypography variant="subtitle2">Student</MDTypography>
                          </TableCell>
                          <TableCell sx={{ px: 2, borderBottom: "none" }}>
                            <MDTypography variant="subtitle2">Email Id</MDTypography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {course.students.map((student) => (
                          <TableRow
                            key={student.user_id}
                            hover
                            onClick={() => handleStudentClick(student.user_id)}
                            sx={{
                              cursor: "pointer",
                              "& > .MuiTableCell-root": {
                                borderBottom: "1px solid #e0e0e0",
                                py: 1.5,
                              },
                            }}
                          >
                            <TableCell sx={{ px: 2 }}>
                              <MDTypography variant="body2">{student.user_id}</MDTypography>
                            </TableCell>
                            <TableCell sx={{ px: 2 }}>
                              <MDBox display="flex" alignItems="center">
                                <Avatar
                                  src={student.profile_picture}
                                  alt={student.full_name}
                                  sx={{ width: 36, height: 36, mr: 2 }}
                                />
                                <MDTypography variant="body2" fontWeight="medium">
                                  {student.full_name}
                                </MDTypography>
                              </MDBox>
                            </TableCell>
                            <TableCell sx={{ px: 2 }}>
                              <MDTypography variant="body2" color="text">
                                {student.email}
                              </MDTypography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>
              </Grid>

              {/* Course Management Card */}
              <Grid item xs={12}>
                <Card>
                  <MDBox p={3}>
                    <MDTypography variant="h6" fontWeight="medium" mb={2}>
                      Course Management
                    </MDTypography>
                    <Grid container spacing={4}>
                      {/* Actions */}
                      <Grid item xs={12} md={4}>
                        <MDTypography variant="subtitle2" fontWeight="bold" color="text" mb={1}>
                          Actions
                        </MDTypography>
                        <MDBox
                          display="flex"
                          flexDirection="column"
                          gap={1.5}
                          alignItems="flex-start"
                        >
                          <MDButton onClick={handleAddAssignment} sx={matchedButtonSx}>
                            Add Assignments
                          </MDButton>
                          <MDButton onClick={handleAddNotes} sx={matchedButtonSx}>
                            Add Notes
                          </MDButton>
                        </MDBox>
                      </Grid>
                      {/* Update About Course */}
                      <Grid item xs={12} md={8}>
                        <MDTypography variant="subtitle2" fontWeight="bold" color="text" mb={1}>
                          Update About Course
                        </MDTypography>
                        <form onSubmit={handleUpdateSubmit}>
                          <TextField
                            label="Enter course description"
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                            value={updateText}
                            onChange={(e) => setUpdateText(e.target.value)}
                            sx={{ "& .MuiOutlinedInput-root": { padding: "8px 12px" } }}
                          />
                          <MDBox mt={1.5} display="flex" justifyContent="center">
                            <MDButton type="submit" sx={matchedButtonSx}>
                              Update About Course
                            </MDButton>
                          </MDBox>
                        </form>
                      </Grid>
                    </Grid>
                  </MDBox>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              {/* Course Completion % Card */}
              <Grid item xs={12}>
                <Card>
                  <MDBox p={2}>
                    <MDTypography variant="h6" fontWeight="medium">
                      Course Completion %
                    </MDTypography>
                    <MDTypography variant="body2" color="text">
                      Last 30 Days
                    </MDTypography>
                    <MDBox display="flex" alignItems="center" mt={2}>
                      <MDTypography variant="h4" fontWeight="bold">
                        78%
                      </MDTypography>
                      <MDTypography variant="body2" color="success" sx={{ ml: 1 }}>
                        +5%
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                </Card>
              </Grid>

              {/* Course Syllabus Checklist Card */}
              <Grid item xs={12}>
                <Card>
                  <MDBox pt={2} pb={1} px={2}>
                    <MDTypography variant="h6" fontWeight="medium">
                      Course Syllabus Checklist
                    </MDTypography>
                  </MDBox>
                  <MDBox>
                    <List dense sx={{ p: 0 }}>
                      {course.course_syllabus?.chapters?.map((chapter, index) => (
                        <ListItem
                          key={index}
                          onClick={() => handleToggleChapter(chapter)}
                          sx={{
                            cursor: "pointer",
                            px: 2,
                            py: 1,
                            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 0, mr: 1.5 }}>
                            <Checkbox
                              edge="start"
                              checked={completedChapters.includes(chapter)}
                              disableRipple
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={<MDTypography variant="body2">{chapter}</MDTypography>}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </MDBox>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default SubjectDetails;
