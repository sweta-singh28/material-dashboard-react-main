// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

// icons
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddCircleIcon from "@mui/icons-material/AddCircle";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  // teacher-provided courses (sample data)
  const teacherCourses = [
    { id: "c1", title: "Mathematics I", teacher: "Dr. Rao" },
    { id: "c2", title: "Physics I", teacher: "Dr. Iyer" },
    { id: "c3", title: "Chemistry", teacher: "Dr. Singh" },
    { id: "c4", title: "English", teacher: "Ms. Patel" },
    { id: "c5", title: "Computer Science", teacher: "Mr. Verma" },
    { id: "c6", title: "Biology", teacher: "Dr. Gupta" },
  ];

  const [enrolled, setEnrolled] = useState([]);
  const [selected, setSelected] = useState("");

  const handleAddCourse = () => {
    if (!selected) return;
    if (enrolled.length >= 5) {
      alert("You can only choose up to 5 courses");
      return;
    }
    const course = teacherCourses.find((c) => c.id === selected);
    if (enrolled.find((c) => c.id === course.id)) {
      alert("Already enrolled in this course");
      return;
    }
    setEnrolled([...enrolled, course]);
    setSelected("");
  };

  const handleRemove = (id) => {
    setEnrolled(enrolled.filter((c) => c.id !== id));
  };

  const handleView = (course) => {
    navigate("/student/viewCourseDetails", { state: { course } });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          {/* Course Chooser */}
          <Grid item xs={12} md={6}>
            <Card style={{ padding: "16px" }}>
              <MDTypography variant="h5" gutterBottom>
                Choose a Course (Max 5)
              </MDTypography>
              <MDBox display="flex" gap={2} alignItems="center">
                <Select
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                  displayEmpty
                  style={{ minWidth: 200 }}
                >
                  <MenuItem value="">-- Select Course --</MenuItem>
                  {teacherCourses
                    .filter((c) => !enrolled.some((e) => e.id === c.id))
                    .map((c) => (
                      <MenuItem key={c.id} value={c.id}>
                        {c.title} — {c.teacher}
                      </MenuItem>
                    ))}
                </Select>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddCircleIcon />}
                  onClick={handleAddCourse}
                  disabled={enrolled.length >= 5}
                >
                  Add
                </Button>
              </MDBox>
              <Typography variant="caption" color="textSecondary">
                Slots left: {5 - enrolled.length}
              </Typography>
            </Card>
          </Grid>

          {/* Enrolled Courses */}
          <Grid item xs={12}>
            <Card style={{ padding: "16px" }}>
              <MDTypography variant="h5" gutterBottom>
                Enrolled Courses
              </MDTypography>
              {enrolled.length === 0 ? (
                <MDTypography variant="body2">No courses enrolled yet.</MDTypography>
              ) : (
                enrolled.map((course) => (
                  <MDBox
                    key={course.id}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    p={1}
                    mb={1}
                    borderRadius="8px"
                    style={{ backgroundColor: "#f9f9f9" }}
                  >
                    <MDTypography variant="body1">
                      {course.title} — {course.teacher}
                    </MDTypography>
                    <MDBox>
                      <IconButton color="primary" onClick={() => handleView(course)}>
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleRemove(course.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </MDBox>
                  </MDBox>
                ))
              )}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
