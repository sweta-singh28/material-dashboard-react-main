// PendingApprovals.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";

import { useMaterialUIController } from "context";

// ✅ JSON STRUCTURE Matching DB Schema
const coursesJSON = [
  {
    idCourses: "c1",
    course_name: "Introduction to Data Science",
    course_pre_requisites: "Basic Math, Python",
    course_syllabus: {},
    course_code: "123",
    course_status: "Pending",
    course_description: "A comprehensive overview of data science...",
    course_thumbnail: "https://picsum.photos/seed/course1/240/140",
    teachers_user_id: "t1",
  },
  {
    idCourses: "c2",
    course_name: "Advanced Machine Learning",
    course_pre_requisites: "Intro to ML",
    course_syllabus: {},
    course_code: "123",
    course_status: "Pending",
    course_description: "In-depth study of advanced machine learning...",
    course_thumbnail: "https://picsum.photos/seed/course2/240/140",
    teachers_user_id: "t2",
  },
];

const usersJSON = [
  {
    idUsers: "t1",
    first_name: "Eleanor",
    last_name: "Vance",
  },
  {
    idUsers: "t2",
    first_name: "Samuel",
    last_name: "Harper",
  },
  {
    idUsers: "a1",
    first_name: "Admin",
    last_name: "User",
  },
  {
    idUsers: "s1",
    first_name: "Grace",
    last_name: "Hopper",
  },
];

const PendingApprovals = () => {
  const navigate = useNavigate();
  const [controller] = useMaterialUIController();
  const { search } = controller;

  const [pendingCourses, setPendingCourses] = useState([]);
  const [rejectionReason, setRejectionReason] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);

  // Pagination state to match ActiveCourses UI
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Load courses initially (can later replace with API call)
  useEffect(() => {
    setPendingCourses(coursesJSON);
  }, []);

  const filteredCourses = pendingCourses.filter(
    (c) =>
      c.course_status === "Pending" &&
      Object.values(c).some((v) => String(v).toLowerCase().includes(search.toLowerCase()))
  );

  const handleAction = (idCourses, action) => {
    setPendingCourses((prev) =>
      prev.map((c) =>
        c.idCourses === idCourses
          ? {
              ...c,
              course_status: action === "approve" ? "Approved" : "Rejected",
              course_code: courseCode,
            }
          : c
      )
    );
    console.log(`Course ${idCourses} ${action === "approve" ? "approved" : "rejected"}`);
    setCourseCode("");
    setRejectionReason("");
    setOpenDetails(false);
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox mb={3}>
          <MDTypography variant="h4" fontWeight="medium">
            Pending Course Approvals
          </MDTypography>
          <MDTypography variant="body2" color="text">
            Review and manage courses awaiting approval. There are{" "}
            <MDTypography component="span" fontWeight="bold">
              {filteredCourses.length}
            </MDTypography>{" "}
            courses in the queue.
          </MDTypography>
        </MDBox>

        {/* Updated Table (matches ActiveCourses UI/design) */}
        <MDBox mb={5}>
          <Grid container>
            <Grid item xs={12}>
              <Card sx={{ p: 3, boxShadow: 0, borderRadius: 0 }}>
                <TableContainer>
                  <Table sx={{ borderCollapse: "separate", borderSpacing: "0 8px" }}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ borderBottom: "none" }}>
                          <MDTypography variant="button" fontWeight="bold" color="text">
                            COURSE NAME
                          </MDTypography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: "none" }}>
                          <MDTypography variant="button" fontWeight="bold" color="text">
                            INSTRUCTOR
                          </MDTypography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: "none" }}>
                          <MDTypography variant="button" fontWeight="bold" color="text">
                            DESCRIPTION
                          </MDTypography>
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {filteredCourses
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((course) => (
                          <TableRow
                            key={course.idCourses}
                            hover
                            sx={{
                              cursor: "pointer",
                              backgroundColor: "#f9f9f9",
                              "&:hover": { backgroundColor: "#f0f0f0" },
                            }}
                            onClick={() => {
                              setSelectedCourse(course);
                              setOpenDetails(true);
                            }}
                          >
                            <TableCell sx={{ borderBottom: "none" }}>
                              {course.course_name}
                            </TableCell>
                            <TableCell sx={{ borderBottom: "none" }}>
                              {course.teachers_user_id || "Unknown Instructor"}
                            </TableCell>
                            <TableCell sx={{ borderBottom: "none" }}>
                              {course.course_description}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={filteredCourses.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />

      {/* Modal (left unchanged as requested) */}
      <Dialog open={openDetails} onClose={() => setOpenDetails(false)} fullWidth maxWidth="sm">
        <DialogTitle>Course Details</DialogTitle>
        <DialogContent dividers>
          {selectedCourse && (
            <MDBox>
              <MDBox
                component="img"
                src={selectedCourse.course_thumbnail}
                alt={`${selectedCourse.course_name} thumbnail`}
                sx={{ width: "100%", height: 180, objectFit: "cover", borderRadius: "8px", mb: 2 }}
              />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <MDTypography variant="caption" color="text">
                    Course Name
                  </MDTypography>
                  <MDInput value={selectedCourse.course_name} disabled fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <MDTypography variant="caption" color="text">
                    Instructor ID
                  </MDTypography>
                  <MDInput value={selectedCourse.teachers_user_id} disabled fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <MDTypography variant="caption" color="text">
                    Description
                  </MDTypography>
                  <MDInput
                    multiline
                    rows={3}
                    value={selectedCourse.course_description}
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <MDTypography variant="caption" color="text">
                    Assign Course Code
                  </MDTypography>
                  <MDInput
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <MDTypography variant="caption" color="text">
                    Rejection Reason
                  </MDTypography>
                  <MDInput
                    multiline
                    rows={3}
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </MDBox>
          )}
        </DialogContent>
        <DialogActions>
          <MDButton onClick={() => setOpenDetails(false)} color="dark" variant="text">
            Close
          </MDButton>
          <MDButton
            variant="gradient"
            color="error"
            onClick={() => handleAction(selectedCourse.idCourses, "reject")}
            disabled={!rejectionReason}
          >
            Reject
          </MDButton>
          <MDButton
            variant="gradient"
            color="success"
            onClick={() => handleAction(selectedCourse.idCourses, "approve")}
          >
            Approve
          </MDButton>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default PendingApprovals;
