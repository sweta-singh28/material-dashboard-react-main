import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

const ApproveOrRejectCourse = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const routedCourse = location.state?.course || null;

  // If no course was passed, show message
  if (!routedCourse) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mt={6} mb={3} textAlign="center">
          <MDTypography variant="h5" fontWeight="medium" mb={2}>
            No course selected
          </MDTypography>
          <MDTypography variant="body2" mb={3}>
            Please go back to Monitor Courses and select a course to approve or reject.
          </MDTypography>
          <MDButton variant="gradient" color="info" onClick={() => navigate("/monitorCourses")}>
            Back to Monitor Courses
          </MDButton>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  // Handle approve / reject
  const handleAction = (action) => {
    const newStatus = action === "approve" ? "Approved" : "Rejected";
    navigate("/monitorCourses", {
      state: {
        updatedCourse: { id: routedCourse.id, status: newStatus },
        message: `${routedCourse.title} ${newStatus.toLowerCase()}!`,
        color: action === "approve" ? "success" : "error",
      },
    });
  };

  return (
    <DashboardLayout key={routedCourse.id}>
      {" "}
      {/* 👈 ensures re-render when course changes */}
      <DashboardNavbar />
      <MDBox
        mt={6}
        mb={3}
        p={3}
        borderRadius="lg"
        shadow="sm"
        sx={{ backgroundColor: "background.card" }}
      >
        {/* Thumbnail + Title */}
        <MDBox display="flex" alignItems="center" gap={3} mb={3}>
          <img
            src={routedCourse.thumbnail}
            alt={routedCourse.title}
            style={{ width: "150px", height: "100px", borderRadius: "8px" }}
          />
          <MDTypography variant="h5" fontWeight="medium">
            {routedCourse.title}
          </MDTypography>
        </MDBox>

        {/* Course Details */}
        <MDTypography variant="body2" mb={2}>
          <strong>Instructor:</strong> {routedCourse.instructor}
        </MDTypography>

        <MDTypography variant="body2" mb={2}>
          <strong>Qualification / Experience:</strong>{" "}
          {routedCourse.qualification || "Not provided"}
        </MDTypography>

        <MDTypography variant="body2" mb={2}>
          <strong>Description:</strong> {routedCourse.description || "No description"}
        </MDTypography>

        <MDTypography variant="body2" mb={3}>
          <strong>Current Status:</strong> {routedCourse.status}
        </MDTypography>

        {/* Actions */}
        <MDBox display="flex" gap={2} flexWrap="wrap">
          <MDButton color="success" variant="contained" onClick={() => handleAction("approve")}>
            Approve
          </MDButton>
          <MDButton color="error" variant="contained" onClick={() => handleAction("reject")}>
            Reject
          </MDButton>
          <MDButton variant="outlined" color="dark" onClick={() => navigate("/monitorCourses")}>
            Back
          </MDButton>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default ApproveOrRejectCourse;
