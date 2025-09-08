// ActiveCourses.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Material Dashboard 2 React components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Global search context
import { useSearch } from "context";

// Sample Active Courses Data
const activeCourseData = [
  {
    id: 1,
    title: "Introduction to Data Science",
    instructor: "Dr. Eleanor Vance",
    started: "2024-01-20",
    description: "A comprehensive overview of data science...",
    status: "Active",
  },
  {
    id: 2,
    title: "Advanced Machine Learning",
    instructor: "Prof. Samuel Harper",
    started: "2024-02-25",
    description: "In-depth study of advanced machine le...",
    status: "Active",
  },
  {
    id: 3,
    title: "Digital Marketing Strategies",
    instructor: "Ms. Olivia Bennett",
    started: "2024-03-15",
    description: "Effective strategies for digital marketing...",
    status: "Active",
  },
];

const ActiveCourses = () => {
  const [activeCourses] = useState(activeCourseData);
  const navigate = useNavigate();
  const { search } = useSearch(); // Global search filter

  const handleRowClick = (course) => {
    navigate("/courseDetails", { state: { course } });
  };

  // Filtered courses based on search
  const filteredCourses = activeCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.instructor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox mb={3}>
          <MDTypography variant="h4" fontWeight="medium">
            Active Courses
          </MDTypography>
          <MDTypography variant="body2" color="text">
            Manage all courses currently active. There are{" "}
            <MDTypography component="span" fontWeight="bold">
              {filteredCourses.length}
            </MDTypography>{" "}
            active courses.
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
              sx={{
                borderBottom: "1px solid #e0e0e0",
                backgroundColor: "#f9f9f9",
              }}
            >
              <MDBox component="tr">
                <MDTypography
                  component="th"
                  variant="button"
                  fontWeight="bold"
                  p={2}
                  sx={{ textAlign: "left" }}
                >
                  COURSE TITLE
                </MDTypography>
                <MDTypography
                  component="th"
                  variant="button"
                  fontWeight="bold"
                  p={2}
                  sx={{ textAlign: "left" }}
                >
                  INSTRUCTOR
                </MDTypography>
                <MDTypography
                  component="th"
                  variant="button"
                  fontWeight="bold"
                  p={2}
                  sx={{ textAlign: "left" }}
                >
                  DESCRIPTION
                </MDTypography>
                <MDTypography
                  component="th"
                  variant="button"
                  fontWeight="bold"
                  p={2}
                  sx={{ textAlign: "right" }}
                >
                  STATUS
                </MDTypography>
              </MDBox>
            </MDBox>
            <MDBox component="tbody">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <MDBox
                    component="tr"
                    key={course.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleRowClick(course)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") handleRowClick(course);
                    }}
                    sx={{
                      "&:not(:last-child)": { borderBottom: "1px solid #e0e0e0" },
                      cursor: "pointer",
                      transition: "background-color 120ms ease",
                      "&:hover": { backgroundColor: "#f5f5f5" },
                    }}
                  >
                    <MDTypography component="td" variant="body2" p={2}>
                      {course.title}
                    </MDTypography>
                    <MDTypography component="td" variant="body2" p={2}>
                      {course.instructor}
                    </MDTypography>
                    <MDTypography component="td" variant="body2" p={2}>
                      {course.description}
                    </MDTypography>
                    <MDTypography component="td" variant="body2" p={2} sx={{ textAlign: "right" }}>
                      <MDTypography
                        variant="button"
                        fontWeight="bold"
                        sx={{ color: "green", textTransform: "uppercase" }}
                      >
                        ACTIVE
                      </MDTypography>
                    </MDTypography>
                  </MDBox>
                ))
              ) : (
                <MDBox component="tr">
                  <MDTypography
                    component="td"
                    colSpan={4}
                    p={2}
                    sx={{ textAlign: "center", fontStyle: "italic", color: "text.secondary" }}
                  >
                    No courses found
                  </MDTypography>
                </MDBox>
              )}
            </MDBox>
          </MDBox>

          <MDBox display="flex" justifyContent="flex-end" alignItems="center" mt={2} gap={1}>
            <MDTypography variant="caption" color="text">
              Showing 1 to {filteredCourses.length} of {filteredCourses.length} results
            </MDTypography>
            <MDButton size="small" variant="text" color="dark">
              Previous
            </MDButton>
            <MDButton size="small" variant="text" color="dark">
              Next
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default ActiveCourses;
