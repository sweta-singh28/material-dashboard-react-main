// CompletedCourses.jsx
import React, { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Material Dashboard 2 React components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Global search context
import { useSearch } from "context";

const CompletedCourses = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = useSearch();

  // ✅ 1. Get dbJson (fallback if not passed)
  const dbJson = location.state?.dbJson || {
    Courses: [
      {
        idCourses: "c_1",
        course_name: "Math 101",
        course_pre_requisites: "[]",
        course_status: "completed",
        course_description: "Basic mathematics",
        teachers_user_id: "u_3",
      },
      {
        idCourses: "c_2",
        course_name: "Science Basics",
        course_code: "SCI101",
        course_status: "completed",
        course_description: "Intro to science",
        teachers_user_id: "u_4",
      },
      {
        idCourses: "c_3",
        course_name: "English Literature",
        course_code: "ENG101",
        course_status: "completed",
        course_description: "English studies",
        teachers_user_id: "u_4",
      },
    ],
    Users: [
      { user_id: "u_3", first_name: "Charlie", last_name: "Khan", user_role: "Teacher" },
      { user_id: "u_4", first_name: "Diana", last_name: "Verma", user_role: "Teacher" },
    ],
  };

  // ✅ 2. Derive only completed courses
  const completedCourses = useMemo(() => {
    return dbJson.Courses.filter((c) => c.course_status === "completed").map((course) => {
      const instructor = dbJson.Users.find((u) => u.user_id === course.teachers_user_id);
      const instructorName = instructor
        ? `${instructor.first_name} ${instructor.last_name}`
        : "Unknown Instructor";

      return {
        id: course.idCourses,
        title: course.course_name,
        instructor: instructorName,
        started: course.create_time || "N/A",
        description: course.course_description,
        status: course.course_status,
      };
    });
  }, [dbJson]);

  // ✅ 3. Filtered results by global search
  const filteredCourses = useMemo(() => {
    return completedCourses.filter(
      (course) =>
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.instructor.toLowerCase().includes(search.toLowerCase())
    );
  }, [completedCourses, search]);

  // ✅ 4. Navigate with state
  const handleRowClick = (course) => {
    navigate("/courseDetails", { state: { course, dbJson } });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox mb={3}>
          <MDTypography variant="h4" fontWeight="medium">
            Completed Courses
          </MDTypography>
          <MDTypography variant="body2" color="text">
            Manage all completed courses. There are{" "}
            <MDTypography component="span" fontWeight="bold">
              {filteredCourses.length}
            </MDTypography>{" "}
            completed courses.
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
                        sx={{
                          color: course.status === "completed" ? "blue" : "grey",
                          textTransform: "uppercase",
                        }}
                      >
                        {course.status}
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

export default CompletedCourses;
