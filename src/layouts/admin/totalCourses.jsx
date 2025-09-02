import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

const AllCourses = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "React Basics",
      instructor: "Bob Martin",
      status: "Pending",
      description: "Introductory React course covering components, props, state and hooks.",
      qualification: "MSc Computer Science, 5 years teaching experience",
      thumbnail: "https://via.placeholder.com/120x80.png?text=React", // demo thumbnail
    },
    {
      id: 2,
      title: "NodeJS Advanced",
      instructor: "Alice Johnson",
      status: "Approved",
      description: "Deep dive into NodeJS internals, streams, clustering and performance tuning.",
      qualification: "PhD in CS, 8 years backend experience",
      thumbnail: "https://via.placeholder.com/120x80.png?text=NodeJS",
    },
    {
      id: 3,
      title: "CSS for Beginners",
      instructor: "Charlie Gupta",
      status: "Pending",
      description: "Learn modern CSS: Flexbox, Grid, responsive layouts and animations.",
      qualification: "B.Tech (IT), Frontend developer",
      thumbnail: "https://via.placeholder.com/120x80.png?text=CSS",
    },
  ]);

  const [snackbar, setSnackbar] = useState({ open: false, message: "", color: "success" });

  // Update course status when returning from ApproveOrRejectCourse
  useEffect(() => {
    const updatedCourse = location.state?.updatedCourse;
    if (updatedCourse) {
      setCourses((prev) =>
        prev.map((c) => (c.id === updatedCourse.id ? { ...c, status: updatedCourse.status } : c))
      );

      setSnackbar({
        open: true,
        message: location.state?.message || "Course updated",
        color: location.state?.color || "success",
      });

      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, navigate]);

  const handleView = (course) => {
    navigate("/approveOrRejectCourse", { state: { course } });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <MDBox p={2} display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h5" fontWeight="medium">
            All Courses
          </MDTypography>
        </MDBox>

        {/* Course List */}
        {courses.map((course) => (
          <MDBox
            key={course.id}
            onClick={() => handleView(course)}
            p={2}
            mb={2}
            borderRadius="lg"
            shadow="sm"
            sx={{ cursor: "pointer", backgroundColor: "background.card" }}
          >
            <MDBox display="flex" justifyContent="space-between" alignItems="center">
              <MDBox display="flex" alignItems="center" gap={2}>
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  style={{ width: "80px", height: "60px", borderRadius: "8px" }}
                />
                <MDBox>
                  <MDTypography variant="h6">{course.title}</MDTypography>
                  <MDTypography variant="button" color="text">
                    {course.instructor} | Status: {course.status}
                  </MDTypography>
                </MDBox>
              </MDBox>

              <MDButton
                color="info"
                size="small"
                variant="contained"
                onClick={(e) => {
                  e.stopPropagation();
                  handleView(course);
                }}
              >
                View Details
              </MDButton>
            </MDBox>
          </MDBox>
        ))}
      </MDBox>

      <MDSnackbar
        color={snackbar.color}
        icon="notifications"
        title="Admin"
        content={snackbar.message}
        dateTime=""
        open={snackbar.open}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        close={() => setSnackbar((s) => ({ ...s, open: false }))}
      />
      <Footer />
    </DashboardLayout>
  );
};

export default AllCourses;
