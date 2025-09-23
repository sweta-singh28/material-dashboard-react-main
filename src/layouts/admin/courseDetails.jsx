import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";

import { fetchCourseDetails } from "../../redux/courseDetails/courseDetailsThunks";

// Sample courses JSON (commented, kept in component)
/*
const courses = [
  {
    idCourses: "c1",
    course_name: "Introduction to Computer Science",
    course_code: "CS101",
    course_status: "pending_approval",
    course_description: "This foundational course provides a comprehensive introduction to the principles of computer science...",
    course_pre_requisites: "Basic knowledge of mathematics and logic is recommended.",
    course_syllabus: { week_1: "Introduction to Programming", week_2: "Data Structures", week_3: "Algorithms" },
    course_thumbnail: "https://example.com/images/cs101_thumbnail.jpg",
    course_current_completed: "95%",
    teachers_user_id: "t1",
    course_notes: [
      { AN_id: "n1", AN_title: "Lecture 1 - Introduction.pdf", AN_link: "https://example.com/notes/lecture1.pdf" },
      { AN_id: "n2", AN_title: "Lecture 2 - Advanced Concepts.pdf", AN_link: "https://example.com/notes/lecture2.pdf" },
      { AN_id: "n3", AN_title: "Practice Questions.pdf", AN_link: "https://example.com/notes/practice.pdf" },
    ],
  },
  {
    idCourses: "c2",
    course_name: "Data Science Fundamentals",
    course_code: "DS205",
    course_status: "approved",
    course_description: "An introductory course on the core concepts of data science, including statistical analysis, machine learning, and data visualization.",
    course_pre_requisites: "CS101 or equivalent.",
    course_syllabus: { week_1: "Introduction to Data Science", week_2: "Probability and Statistics" },
    course_thumbnail: "https://example.com/images/ds205_thumbnail.jpg",
    course_current_completed: "80%",
    teachers_user_id: "t2",
    course_notes: [],
  },
];

const usersJSON = [
  { idUsers: "t1", first_name: "Eleanor", last_name: "Vance" },
  { idUsers: "t2", first_name: "Samuel", last_name: "Harper" },
  { idUsers: "a1", first_name: "Admin", last_name: "User" },
  { idUsers: "s1", first_name: "Grace", last_name: "Hopper" },
];
*/

const CourseDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { course } = location.state || {};

  const courseDetails = useSelector((state) => state.courseDetails?.course);

  useEffect(() => {
    if (course?.idCourses) {
      dispatch(fetchCourseDetails(course.idCourses));
    }
  }, [course, dispatch]);

  if (!course) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox p={3}>
          <MDAlert color="error">
            <MDTypography variant="body2" color="white">
              Course details not found.
            </MDTypography>
          </MDAlert>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  // Map teacher ID to name
  const instructor = (usersJSON || []).find((u) => u.idUsers === course.teachers_user_id);
  const instructorName = instructor
    ? `${instructor.first_name} ${instructor.last_name}`
    : course.teachers_user_id;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MDTypography variant="h4" fontWeight="medium" mb={2}>
              {course.course_name}
            </MDTypography>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="bold">
                  Course Information
                </MDTypography>
              </MDBox>
              <CardContent>
                <MDTypography variant="body2" color="text" mb={2}>
                  <MDTypography component="span" fontWeight="bold">
                    Instructor:
                  </MDTypography>{" "}
                  {instructorName}
                </MDTypography>
                <MDTypography variant="body2" color="text" mb={2}>
                  <MDTypography component="span" fontWeight="bold">
                    Course Code:
                  </MDTypography>{" "}
                  {course.course_code || "-"}
                </MDTypography>
                <MDTypography variant="body2" color="text" mb={2}>
                  <MDTypography component="span" fontWeight="bold">
                    Status:
                  </MDTypography>{" "}
                  {course.course_status}
                </MDTypography>
                <MDTypography variant="body2" color="text" mb={2}>
                  <MDTypography component="span" fontWeight="bold">
                    Description:
                  </MDTypography>{" "}
                  {course.course_description}
                </MDTypography>
                <MDTypography variant="body2" color="text" mb={2}>
                  <MDTypography component="span" fontWeight="bold">
                    Pre-requisites:
                  </MDTypography>{" "}
                  {course.course_pre_requisites || "-"}
                </MDTypography>
                <MDTypography variant="body2" color="text" mb={2}>
                  <MDTypography component="span" fontWeight="bold">
                    Progress:
                  </MDTypography>{" "}
                  {course.course_current_completed || "-"}
                </MDTypography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <MDBox mt={4} display="flex" justifyContent="flex-end" gap={2}>
          <MDButton
            variant="gradient"
            color="success"
            onClick={() => console.log(`Approve course ${course.idCourses}`)}
          >
            Approve
          </MDButton>
          <MDButton
            variant="gradient"
            color="error"
            onClick={() => console.log(`Reject course ${course.idCourses}`)}
          >
            Reject
          </MDButton>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default CourseDetails;
