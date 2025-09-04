// AddNewCourse.jsx
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function AddNewCourse() {
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [teacherInfo, setTeacherInfo] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  // list of created courses
  const [courses, setCourses] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setThumbnail(file);
  };

  const handleCreate = () => {
    if (!courseName.trim() || !description.trim() || !teacherInfo.trim()) return;

    const newCourse = {
      id: courses.length + 1,
      name: courseName,
      description,
      teacher: teacherInfo,
      thumbnail: thumbnail ? thumbnail.name : "N/A",
      status: "Pending", // always pending until admin approves
    };

    setCourses([...courses, newCourse]);

    // reset form
    setCourseName("");
    setDescription("");
    setTeacherInfo("");
    setThumbnail(null);
  };

  const handleCancel = () => {
    setCourseName("");
    setDescription("");
    setTeacherInfo("");
    setThumbnail(null);
  };

  const chipColor = (status) =>
    status === "Approved" ? "success" : status === "Rejected" ? "error" : "warning";

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={8}>
            <MDBox p={3} borderRadius="lg" shadow="md" bgColor="white">
              <MDTypography variant="h4" gutterBottom>
                📚 Launch New Course
              </MDTypography>

              {/* Course Name */}
              <MDBox mb={2}>
                <TextField
                  fullWidth
                  label="Course Name"
                  variant="outlined"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </MDBox>

              {/* Course Description */}
              <MDBox mb={2}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Course Description"
                  variant="outlined"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </MDBox>

              {/* Teacher Info */}
              <MDBox mb={2}>
                <TextField
                  fullWidth
                  label="Teacher's Information"
                  variant="outlined"
                  placeholder="Enter your name, qualification, experience"
                  value={teacherInfo}
                  onChange={(e) => setTeacherInfo(e.target.value)}
                />
              </MDBox>

              {/* Thumbnail Upload */}
              <MDBox mb={2}>
                <MDTypography variant="button" fontWeight="medium">
                  Upload Course Thumbnail
                </MDTypography>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "block", marginTop: "8px" }}
                  onChange={handleFileChange}
                />
                {thumbnail && (
                  <MDTypography variant="caption" color="text" sx={{ display: "block", mt: 1 }}>
                    Selected: {thumbnail.name}
                  </MDTypography>
                )}
              </MDBox>

              {/* Action Buttons */}
              <MDBox mt={3} display="flex" justifyContent="flex-end" gap={2}>
                <MDButton variant="outlined" color="secondary" onClick={handleCancel}>
                  Cancel
                </MDButton>
                <MDButton variant="gradient" color="info" onClick={handleCreate}>
                  Create Course
                </MDButton>
              </MDBox>
            </MDBox>

            {/* Table of created courses */}
            {courses.length > 0 && (
              <MDBox mt={4}>
                <MDTypography variant="h5" gutterBottom>
                  📑 Your Submitted Courses
                </MDTypography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <b>Course Name</b>
                        </TableCell>
                        <TableCell>
                          <b>Description</b>
                        </TableCell>
                        <TableCell>
                          <b>Teacher</b>
                        </TableCell>
                        <TableCell>
                          <b>Thumbnail</b>
                        </TableCell>
                        <TableCell>
                          <b>Status</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {courses.map((course) => (
                        <TableRow key={course.id}>
                          <TableCell>{course.name}</TableCell>
                          <TableCell>{course.description}</TableCell>
                          <TableCell>{course.teacher}</TableCell>
                          <TableCell>{course.thumbnail}</TableCell>
                          <TableCell>
                            <Chip
                              label={course.status}
                              size="small"
                              color={chipColor(course.status)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </MDBox>
            )}
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AddNewCourse;
