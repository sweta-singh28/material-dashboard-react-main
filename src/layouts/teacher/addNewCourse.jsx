import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse } from "../../redux/addNewCourse/addNewCourseThunks";
import { resetCourseState } from "../../redux/addNewCourse/addNewCourseReducer";

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
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { useSearch } from "context";

function AddNewCourse() {
  const dispatch = useDispatch();
  const { search } = useSearch();

  // Redux state
  const { success, loading, error } = useSelector((state) => state.addNewCourse);

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

  // New state for dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setThumbnail(file);
  };

  const handleCreate = () => {
    if (!courseName.trim() || !description.trim() || !teacherInfo.trim()) return;

    const newCourse = {
      courseName,
      description,
      teacherId: teacherInfo,
      syllabus: syllabus ? syllabus.split(",").map((t) => t.trim()) : [],
      prerequisites: prerequisites ? prerequisites.split(",").map((t) => t.trim()) : [],
      expectations,
    };

    // dispatch thunk
    dispatch(addNewCourse(newCourse));

    const formattedCourse = {
      idCourses: `c${data.Courses.length + 1}`,
      course_name: courseName,
      course_pre_requisites: prerequisites,
      course_syllabus: JSON.stringify(newCourse.syllabus),
      course_code: `${courseName.toUpperCase().replace(/\s+/g, "")}-${data.Courses.length + 1}`,
      course_status: "Pending",
      course_description: description,
      course_thumbnail: thumbnail ? thumbnail.name : "N/A",
      course_current_completed: 0,
      course_active_students: JSON.stringify([]),
      course_pending_students: JSON.stringify([]),
      teachers_user_id: teacherInfo,
    };

    setData((prev) => ({
      ...prev,
      Courses: [...prev.Courses, formattedCourse],
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

  useEffect(() => {
    if (success) {
      console.log("✅ Course added successfully");
      dispatch(resetCourseState());
    }
    if (error) {
      console.error("❌ Error adding course:", error);
    }
  }, [success, error, dispatch]);

  const chipColor = (status) =>
    status === "Approved" ? "success" : status === "Rejected" ? "error" : "warning";

  // New functions for dialog
  const handleOpenDialog = (course) => {
    setSelectedCourse(course);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCourse(null);
  };

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
                Add a New Course
              </MDTypography>
              {loading && <MDTypography color="info">Saving...</MDTypography>}
              {error && <MDTypography color="error">{error}</MDTypography>}
              <MDTypography variant="body2" color="text" mb={3}>
                Fill out the form below to create a new course.
              </MDTypography>

              {/* Course Name */}
              <MDBox mb={2}>
                <TextField
                  fullWidth
                  label="Course Name"
                  variant="outlined"
                  placeholder="e.g., Introduction to Python Programming"
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
                  placeholder="A comprehensive overview of the course content and objectives."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </MDBox>

              {/* Teacher Info */}
              <MDBox mb={2}>
                <TextField
                  fullWidth
                  label="Teacher's Info"
                  variant="outlined"
                  placeholder="e.g., Dr. Jane Doe, PhD in Computer Science"
                  value={teacherInfo}
                  onChange={(e) => setTeacherInfo(e.target.value)}
                />
              </MDBox>

              {/* Course Expectations */}
              <MDBox mb={2}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Course Expectations"
                  variant="outlined"
                  placeholder="What students will learn and be able to do after completing the course."
                  value={expectations}
                  onChange={(e) => setExpectations(e.target.value)}
                />
              </MDBox>

              {/* Course Prerequisites */}
              <MDBox mb={2}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Course Prerequisites"
                  variant="outlined"
                  placeholder="Any required skills, knowledge, or prior courses."
                  value={prerequisites}
                  onChange={(e) => setPrerequisites(e.target.value)}
                />
              </MDBox>

              {/* Course Syllabus */}
              <MDBox mb={2}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Course Syllabus"
                  variant="outlined"
                  placeholder="A detailed week-by-week breakdown of topics, readings, and assignments."
                  value={syllabus}
                  onChange={(e) => setSyllabus(e.target.value)}
                />
              </MDBox>

              {/* Thumbnail Upload */}
              <MDBox
                mb={2}
                sx={{
                  border: "2px dashed #ccc",
                  borderRadius: "8px",
                  padding: "24px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  id="thumbnail-upload"
                />
                <label htmlFor="thumbnail-upload" style={{ cursor: "pointer", display: "block" }}>
                  <CloudUploadIcon color="info" sx={{ fontSize: 40 }} />
                  <MDTypography variant="body2" fontWeight="medium" mt={1}>
                    Upload a file or drag and drop
                  </MDTypography>
                  <MDTypography variant="caption" color="text">
                    PNG, JPG, GIF up to 10MB
                  </MDTypography>
                </label>
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
                  Submit Course
                </MDButton>
              </MDBox>
            </MDBox>

            {/* Table of submitted courses */}
            {filteredCourses.length > 0 && (
              <MDBox mt={4}>
                <MDTypography variant="h5" gutterBottom>
                  Your Submitted Courses
                </MDTypography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <b>COURSE NAME</b>
                        </TableCell>
                        <TableCell>
                          <b>STATUS</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredCourses.map((course) => (
                        <TableRow
                          key={course.idCourses}
                          hover
                          onClick={() => handleOpenDialog(course)}
                          sx={{ cursor: "pointer" }}
                        >
                          <TableCell>{course.course_name}</TableCell>
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

      {/* Dialog for viewing course details */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Course Details</DialogTitle>
        <DialogContent>
          {selectedCourse && (
            <List>
              <ListItem>
                <ListItemText primary="Course Name" secondary={selectedCourse.course_name} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Teacher's ID" secondary={selectedCourse.teachers_user_id} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Course Syllabus"
                  secondary={JSON.parse(selectedCourse.course_syllabus).join(", ")}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Status"
                  secondary={
                    <Chip
                      label={selectedCourse.course_status}
                      size="small"
                      color={chipColor(selectedCourse.course_status)}
                    />
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Course Description"
                  secondary={selectedCourse.course_description}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Prerequisites"
                  secondary={selectedCourse.course_pre_requisites}
                />
              </ListItem>
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <MDButton onClick={handleCloseDialog} color="info">
            Close
          </MDButton>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default AddNewCourse;
