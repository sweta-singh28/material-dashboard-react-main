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

  // NEW fields
  const [expectations, setExpectations] = useState("");
  const [prerequisites, setPrerequisites] = useState("");
  const [syllabus, setSyllabus] = useState(""); // now text input instead of pdf

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
      // NEW properties
      expectations,
      prerequisites,
      syllabus: syllabus || "N/A", // now stores text topics
      status: "Pending", // always pending until admin approves
    };

    setCourses([...courses, newCourse]);

    // reset form (including new fields)
    setCourseName("");
    setDescription("");
    setTeacherInfo("");
    setThumbnail(null);
    setExpectations("");
    setPrerequisites("");
    setSyllabus("");
  };

  const handleCancel = () => {
    setCourseName("");
    setDescription("");
    setTeacherInfo("");
    setThumbnail(null);
    // reset new fields too
    setExpectations("");
    setPrerequisites("");
    setSyllabus("");
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

              {/* New: Course Expectations */}
              <MDBox mb={2}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Course Expectations"
                  variant="outlined"
                  placeholder="What students will learn / outcomes"
                  value={expectations}
                  onChange={(e) => setExpectations(e.target.value)}
                />
              </MDBox>

              {/* New: Course Prerequisites */}
              <MDBox mb={2}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Course Prerequisites"
                  variant="outlined"
                  placeholder="Required knowledge or tools"
                  value={prerequisites}
                  onChange={(e) => setPrerequisites(e.target.value)}
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

              {/* New: Syllabus Topics */}
              <MDBox mb={2}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Course Syllabus"
                  variant="outlined"
                  placeholder="Add topics separated by commas"
                  value={syllabus}
                  onChange={(e) => setSyllabus(e.target.value)}
                />
                <MDTypography variant="caption" color="text" sx={{ display: "block", mt: 1 }}>
                  *Add topics separated by commas
                </MDTypography>
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

                        {/* NEW columns */}
                        <TableCell>
                          <b>Expectations</b>
                        </TableCell>
                        <TableCell>
                          <b>Prerequisites</b>
                        </TableCell>
                        <TableCell>
                          <b>Syllabus (Topics)</b>
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

                          {/* NEW values */}
                          <TableCell>{course.expectations || "-"}</TableCell>
                          <TableCell>{course.prerequisites || "-"}</TableCell>
                          <TableCell>{course.syllabus}</TableCell>

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
