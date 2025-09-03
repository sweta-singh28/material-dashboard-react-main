// PendingApprovals.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Material Dashboard 2 React components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

// Data
const courseData = [
  {
    id: 1,
    title: "Introduction to Data Science",
    instructor: "Dr. Eleanor Vance",
    description: "A comprehensive overview of data science...",
    status: "Pending",
  },
  {
    id: 2,
    title: "Advanced Machine Learning",
    instructor: "Prof. Samuel Harper",
    description: "In-depth study of advanced machine le...",
    status: "Pending",
  },
  {
    id: 3,
    title: "Digital Marketing Strategies",
    instructor: "Ms. Olivia Bennett",
    description: "Effective strategies for digital marketing...",
    status: "Pending",
  },
  {
    id: 4,
    title: "Financial Modeling",
    instructor: "Mr. Ethan Carter",
    description: "Building and analyzing financial models.",
    status: "Pending",
  },
  {
    id: 5,
    title: "Creative Writing Workshop",
    instructor: "Ms. Sophia Reed",
    description: "Enhance your creative writing skills.",
    status: "Pending",
  },
];

const PendingApprovals = () => {
  const navigate = useNavigate();
  const [rejectionReason, setRejectionReason] = useState("");
  const [pendingCourses, setPendingCourses] = useState(courseData);

  const handleAction = (courseId, action) => {
    const updatedStatus = action === "approve" ? "Approved" : "Rejected";
    setPendingCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId ? { ...course, status: updatedStatus } : course
      )
    );
    console.log(`Course ${courseId} was ${updatedStatus}.`);
  };

  const handleRejectWithReason = (courseId) => {
    console.log(`Course ${courseId} rejected with reason: ${rejectionReason}`);
    handleAction(courseId, "reject");
    setRejectionReason("");
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
              {pendingCourses.length}
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
                  ACTIONS
                </MDTypography>
              </MDBox>
            </MDBox>
            <MDBox component="tbody">
              {pendingCourses.map((course) => (
                <MDBox
                  component="tr"
                  key={course.id}
                  sx={{ "&:not(:last-child)": { borderBottom: "1px solid #e0e0e0" } }}
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
                    <MDButton
                      size="small"
                      variant="text"
                      color="dark"
                      onClick={() => navigate("/courseDetails", { state: { course } })}
                      sx={{ mr: 1 }}
                    >
                      Details
                    </MDButton>
                    <MDButton
                      size="small"
                      variant="text"
                      color="error"
                      onClick={() => handleAction(course.id, "reject")}
                      sx={{ mr: 1 }}
                    >
                      Reject
                    </MDButton>
                    <MDButton
                      size="small"
                      variant="text"
                      color="success"
                      onClick={() => handleAction(course.id, "approve")}
                    >
                      Approve
                    </MDButton>
                  </MDTypography>
                </MDBox>
              ))}
            </MDBox>
          </MDBox>
          <MDBox display="flex" justifyContent="flex-end" alignItems="center" mt={2} gap={1}>
            <MDTypography variant="caption" color="text">
              Showing 1 to {pendingCourses.length} of {pendingCourses.length} results
            </MDTypography>
            <MDButton size="small" variant="text" color="dark">
              Previous
            </MDButton>
            <MDButton size="small" variant="text" color="dark">
              Next
            </MDButton>
          </MDBox>
        </MDBox>

        {/* Rejection Reason Section */}
        <MDBox p={3} border="1px solid #e0e0e0" borderRadius="8px" shadow="sm">
          <MDTypography variant="h6" mb={1}>
            Rejection Reason
          </MDTypography>
          <MDTypography variant="body2" color="text" mb={2}>
            Provide a reason for rejecting a course. This will be sent to the instructor.
          </MDTypography>
          <MDInput
            multiline
            rows={5}
            placeholder="e.g., Course content overlaps with an existing course..."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <MDButton
            variant="gradient"
            color="info"
            onClick={() => handleRejectWithReason(1)} // Example: Rejecting course with ID 1
            disabled={!rejectionReason}
          >
            Submit Reason
          </MDButton>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default PendingApprovals;
