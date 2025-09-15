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

        {/* Courses Table */}
        <MDBox mb={5} sx={{ overflowX: "auto" }}>
          <MDBox
            component="table"
            width="100%"
            border="1px solid #e0e0e0"
            borderRadius="8px"
            sx={{ borderCollapse: "collapse" }}
          >
            <MDBox
              component="thead"
              sx={{ borderBottom: "1px solid #e0e0e0", backgroundColor: "#f9f9f9" }}
            >
              <MDBox component="tr">
                <MDTypography component="th" variant="button" fontWeight="bold" p={2}>
                  COURSE NAME
                </MDTypography>
                <MDTypography component="th" variant="button" fontWeight="bold" p={2}>
                  INSTRUCTOR
                </MDTypography>
                <MDTypography component="th" variant="button" fontWeight="bold" p={2}>
                  DESCRIPTION
                </MDTypography>
              </MDBox>
            </MDBox>

            <MDBox component="tbody">
              {filteredCourses.map((course) => (
                <MDBox
                  component="tr"
                  key={course.idCourses}
                  sx={{
                    "&:not(:last-child)": { borderBottom: "1px solid #e0e0e0" },
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#fafafa" },
                  }}
                  onClick={() => {
                    setSelectedCourse(course);
                    setOpenDetails(true);
                  }}
                >
                  <MDTypography component="td" variant="body2" p={2}>
                    {course.course_name}
                  </MDTypography>
                  <MDTypography component="td" variant="body2" p={2}>
                    {course.teachers_user_id}
                  </MDTypography>
                  <MDTypography component="td" variant="body2" p={2}>
                    {course.course_description}
                  </MDTypography>
                </MDBox>
              ))}
            </MDBox>
          </MDBox>
        </MDBox>
      </MDBox>
      <Footer />

      {/* Modal */}
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
