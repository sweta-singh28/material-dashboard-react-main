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

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { useSearch } from "context";

function AddNewCourse() {
  const { search } = useSearch();

  // JSON object matching DB schema
  const [data, setData] = useState({
    Courses: [
      {
        idCourses: "c001",
        course_name: "React Basics",
        course_pre_requisites: "HTML, CSS, JS",
        course_syllabus: JSON.stringify(["JSX", "Props", "State", "Hooks"]),
        course_code: "REACT101",
        course_status: "Pending",
        course_description: "Learn the fundamentals of React and component-based development.",
        course_thumbnail: "react-course.png",
        course_current_completed: 0,
        course_active_students: JSON.stringify([]),
        course_pending_students: JSON.stringify([]),
        teachers_user_id: "u101",
      },
    ],
  });

  // form fields
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [teacherInfo, setTeacherInfo] = useState(""); // will become teachers_user_id in DB
  const [thumbnail, setThumbnail] = useState(null);
  const [expectations, setExpectations] = useState("");
  const [prerequisites, setPrerequisites] = useState("");
  const [syllabus, setSyllabus] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setThumbnail(file);
  };

  const handleCreate = () => {
    if (!courseName.trim() || !description.trim() || !teacherInfo.trim()) return;

    const newCourse = {
      idCourses: `c${data.Courses.length + 1}`,
      course_name: courseName,
      course_pre_requisites: prerequisites,
      course_syllabus: JSON.stringify(syllabus ? syllabus.split(",").map((t) => t.trim()) : []),
      course_code: `${courseName.toUpperCase().replace(/\s+/g, "")}-${data.Courses.length + 1}`,
      course_status: "Pending",
      course_description: description,
      course_thumbnail: thumbnail ? thumbnail.name : "N/A",
      course_current_completed: 0,
      course_active_students: JSON.stringify([]),
      course_pending_students: JSON.stringify([]),
      teachers_user_id: teacherInfo, // You can later map this to actual Users table
    };

    setData((prev) => ({
      ...prev,
      Courses: [...prev.Courses, newCourse],
    }));

    // reset form
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
    setExpectations("");
    setPrerequisites("");
    setSyllabus("");
  };

  const chipColor = (status) =>
    status === "Approved" ? "success" : status === "Rejected" ? "error" : "warning";

  // search filter
  const filteredCourses = data.Courses.filter((course) =>
    course.course_name.toLowerCase().includes(search.toLowerCase())
  );

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
                  label="Teacher's ID / Info"
                  variant="outlined"
                  placeholder="Enter user_id or teacher's info"
                  value={teacherInfo}
                  onChange={(e) => setTeacherInfo(e.target.value)}
                />
              </MDBox>

              {/* Course Expectations (just informational for now) */}
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

              {/* Course Prerequisites */}
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

              {/* Syllabus Topics */}
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

            {/* Table of submitted courses */}
            {filteredCourses.length > 0 && (
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
                          <b>Prerequisites</b>
                        </TableCell>
                        <TableCell>
                          <b>Syllabus</b>
                        </TableCell>
                        <TableCell>
                          <b>Status</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredCourses.map((course) => (
                        <TableRow key={course.idCourses}>
                          <TableCell>{course.course_name}</TableCell>
                          <TableCell>{course.course_description}</TableCell>
                          <TableCell>{course.teachers_user_id}</TableCell>
                          <TableCell>{course.course_thumbnail}</TableCell>
                          <TableCell>{course.course_pre_requisites}</TableCell>
                          <TableCell>{JSON.parse(course.course_syllabus).join(", ")}</TableCell>
                          <TableCell>
                            <Chip
                              label={course.course_status}
                              size="small"
                              color={chipColor(course.course_status)}
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
