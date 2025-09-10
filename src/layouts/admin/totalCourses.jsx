import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDSnackbar from "components/MDSnackbar";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";

import { useMaterialUIController } from "context";

// --- SAMPLE DATA (can later come from API) ---
const usersJSON = [
  { idUsers: "t1", first_name: "Bob", last_name: "Martin", role: "teacher" },
  { idUsers: "t2", first_name: "Alice", last_name: "Johnson", role: "teacher" },
  { idUsers: "t3", first_name: "Charlie", last_name: "Gupta", role: "teacher" },
];

const coursesJSON = [
  {
    idCourses: 1,
    course_name: "React Basics",
    teachers_user_id: "t1",
    course_status: "Active",
    course_code: "RB101",
    course_description: "Introductory React course covering components, props, state and hooks.",
    student_count: 45,
  },
  {
    idCourses: 2,
    course_name: "NodeJS Advanced",
    teachers_user_id: "t2",
    course_status: "Completed",
    course_code: "NJS201",
    course_description:
      "Deep dive into NodeJS internals, streams, clustering and performance tuning.",
    student_count: 30,
  },
  {
    idCourses: 3,
    course_name: "CSS for Beginners",
    teachers_user_id: "t3",
    course_status: "Active",
    course_code: "CSS101",
    course_description: "Learn modern CSS: Flexbox, Grid, responsive layouts and animations.",
    student_count: 60,
  },
];

const AllCourses = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [controller] = useMaterialUIController();
  const { search } = controller;

  const [courses, setCourses] = useState(coursesJSON);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", color: "success" });

  // Update course status when returning from CourseDetails
  useEffect(() => {
    const updatedCourse = location.state?.updatedCourse;
    if (updatedCourse) {
      setCourses((prev) =>
        prev.map((c) =>
          c.idCourses === updatedCourse.idCourses
            ? { ...c, course_status: updatedCourse.course_status }
            : c
        )
      );

      setSnackbar({
        open: true,
        message: location.state?.message || "Course updated",
        color: location.state?.color || "success",
      });

      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, navigate]);

  // Navigation to details page
  const handleView = (course) => {
    navigate("/courseDetails", { state: { course } });
  };

  // Apply search
  const filteredCourses = courses.filter((course) =>
    Object.values(course).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Card>
          <MDBox p={3}>
            <MDTypography variant="h5" fontWeight="medium">
              All Courses
            </MDTypography>
          </MDBox>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <MDTypography variant="button" fontWeight="bold">
                      Course
                    </MDTypography>
                  </TableCell>
                  <TableCell>
                    <MDTypography variant="button" fontWeight="bold">
                      Instructor
                    </MDTypography>
                  </TableCell>
                  <TableCell>
                    <MDTypography variant="button" fontWeight="bold">
                      Students
                    </MDTypography>
                  </TableCell>
                  <TableCell>
                    <MDTypography variant="button" fontWeight="bold">
                      Course Code
                    </MDTypography>
                  </TableCell>
                  <TableCell>
                    <MDTypography variant="button" fontWeight="bold">
                      Status
                    </MDTypography>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredCourses.map((course) => {
                  const instructor = usersJSON.find((u) => u.idUsers === course.teachers_user_id);
                  const instructorName = instructor
                    ? `${instructor.first_name} ${instructor.last_name}`
                    : course.teachers_user_id;

                  return (
                    <TableRow
                      key={course.idCourses}
                      hover
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleView(course)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleView(course)}
                    >
                      <TableCell sx={{ verticalAlign: "middle", py: 1 }}>
                        <MDTypography variant="button" fontWeight="medium">
                          {course.course_name}
                        </MDTypography>
                      </TableCell>

                      <TableCell sx={{ verticalAlign: "middle", py: 1 }}>
                        <MDTypography variant="caption" color="text">
                          {instructorName}
                        </MDTypography>
                      </TableCell>

                      <TableCell sx={{ verticalAlign: "middle", py: 1 }}>
                        <MDTypography variant="caption" color="text">
                          {course.student_count}
                        </MDTypography>
                      </TableCell>

                      <TableCell sx={{ verticalAlign: "middle", py: 1 }}>
                        <MDTypography variant="caption" color="text">
                          {course.course_code || "-"}
                        </MDTypography>
                      </TableCell>

                      <TableCell sx={{ verticalAlign: "middle", py: 1 }}>
                        <Chip
                          label={course.course_status}
                          size="small"
                          color={course.course_status === "Active" ? "success" : "default"}
                          sx={{ fontSize: "0.75rem", fontWeight: "bold" }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </MDBox>

      <MDSnackbar
        color={snackbar.color}
        icon="notifications"
        title="Admin"
        content={snackbar.message}
        open={snackbar.open}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        close={() => setSnackbar((s) => ({ ...s, open: false }))}
      />
      <Footer />
    </DashboardLayout>
  );
};

export default AllCourses;
