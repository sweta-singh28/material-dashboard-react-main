// ViewSubmissions.jsx

// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Layout
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Global search context
import { useSearch } from "context";

function ViewSubmissions() {
  const navigate = useNavigate();
  const { search } = useSearch(); // Global search

  // Dummy submissions (replace with API later)
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      roll_no: "101",
      student_name: "John Doe",
      course_name: "DBMS",
      assignment_title: "Assignment 1",
      file_url: "assignment1_john.pdf",
      status: "Pending",
    },
    {
      id: 2,
      roll_no: "102",
      student_name: "Jane Smith",
      course_name: "DBMS",
      assignment_title: "Assignment 1",
      file_url: "assignment1_jane.pdf",
      status: "Pending",
    },
    {
      id: 3,
      roll_no: "103",
      student_name: "Ravi Kumar",
      course_name: "DBMS",
      assignment_title: "Assignment 1",
      file_url: "assignment1_ravi.pdf",
      status: "Approved",
    },
  ]);

  // Approve function
  const handleApprove = (id) => {
    setSubmissions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, status: "Approved" } : sub))
    );
  };

  // Mark function (toggle between Marked/Pending)
  const handleMark = (id) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === id ? { ...sub, status: sub.status === "Marked" ? "Pending" : "Marked" } : sub
      )
    );
  };

  // Navigate to student details
  const handleStudentClick = (id) => {
    navigate(`/students/${id}`);
  };

  // Apply global search
  const filteredSubmissions = submissions.filter(
    (sub) =>
      sub.student_name.toLowerCase().includes(search.toLowerCase()) ||
      sub.roll_no.toLowerCase().includes(search.toLowerCase()) ||
      sub.assignment_title.toLowerCase().includes(search.toLowerCase()) ||
      sub.course_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={11}>
            <MDBox p={3} borderRadius="lg" shadow="md" bgColor="white">
              <MDTypography variant="h4" gutterBottom>
                📑 Student Submissions
              </MDTypography>

              {/* Table Header */}
              <MDBox
                display="flex"
                justifyContent="space-between"
                p={2}
                bgColor="grey-100"
                borderRadius="md"
                mb={2}
              >
                <MDTypography variant="button" fontWeight="bold" flex={1}>
                  Roll No
                </MDTypography>
                <MDTypography variant="button" fontWeight="bold" flex={1}>
                  Student Name
                </MDTypography>
                <MDTypography variant="button" fontWeight="bold" flex={1}>
                  Assignment
                </MDTypography>
                <MDTypography variant="button" fontWeight="bold" flex={1}>
                  Course
                </MDTypography>
                <MDTypography variant="button" fontWeight="bold" flex={1}>
                  File
                </MDTypography>
                <MDTypography variant="button" fontWeight="bold" flex={1}>
                  Status
                </MDTypography>
                <MDTypography variant="button" fontWeight="bold" flex={1}>
                  Actions
                </MDTypography>
              </MDBox>

              {/* Submissions List */}
              {filteredSubmissions.length === 0 ? (
                <MDTypography variant="body2" color="textSecondary" align="center" py={3}>
                  No submissions found.
                </MDTypography>
              ) : (
                filteredSubmissions.map((sub) => (
                  <MDBox
                    key={sub.id}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    p={2}
                    mb={1}
                    borderRadius="md"
                    bgColor="#f9f9f9"
                  >
                    <MDTypography variant="body2" flex={1}>
                      {sub.roll_no}
                    </MDTypography>
                    <MDTypography
                      variant="body2"
                      flex={1}
                      color="info"
                      sx={{
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                      onClick={() => handleStudentClick(sub.id)}
                    >
                      {sub.student_name}
                    </MDTypography>
                    <MDTypography variant="body2" flex={1}>
                      {sub.assignment_title}
                    </MDTypography>
                    <MDTypography variant="body2" flex={1}>
                      {sub.course_name}
                    </MDTypography>
                    <MDTypography variant="body2" flex={1} color="info">
                      <a
                        href={sub.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          textDecoration: "underline",
                          color: "#1a73e8",
                          cursor: "pointer",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {sub.file_url}
                      </a>
                    </MDTypography>
                    <MDTypography
                      variant="body2"
                      flex={1}
                      color={
                        sub.status === "Approved"
                          ? "success"
                          : sub.status === "Marked"
                          ? "info"
                          : "warning"
                      }
                    >
                      {sub.status}
                    </MDTypography>
                    <MDBox display="flex" gap={1} flex={1}>
                      <MDButton
                        variant="outlined"
                        color="info"
                        size="small"
                        onClick={() => handleMark(sub.id)}
                      >
                        Mark
                      </MDButton>
                      <MDButton
                        variant="gradient"
                        color="success"
                        size="small"
                        onClick={() => handleApprove(sub.id)}
                        disabled={sub.status === "Approved"}
                      >
                        Approve
                      </MDButton>
                    </MDBox>
                  </MDBox>
                ))
              )}
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ViewSubmissions;
