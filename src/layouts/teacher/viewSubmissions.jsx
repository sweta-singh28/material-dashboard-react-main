// ViewSubmissions.jsx (redesigned to match screenshot)

import { useState } from "react";
import { useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

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
      submission_id: "subm-101",
      submission_link: "https://files.example.com/submissions/subm-101.pdf",
      submission_time: "2025-09-10T15:30:00Z",
      approval: "pending",
      student_id: "user-789",
      assignment: {
        AN_id: "assign-001",
        AN_title: "ER Diagram Assignment",
        AN_link: "https://files.example.com/assignments/er_assignment.pdf",
      },
      course: {
        idCourses: "course-123",
        course_name: "Database Systems",
      },
    },
    {
      submission_id: "subm-102",
      submission_link: "https://files.example.com/submissions/subm-102.pdf",
      submission_time: "2025-09-11T18:45:00Z",
      approval: "approved",
      student_id: "user-456",
      assignment: {
        AN_id: "assign-001",
        AN_title: "ER Diagram Assignment",
        AN_link: "https://files.example.com/assignments/er_assignment.pdf",
      },
      course: {
        idCourses: "course-123",
        course_name: "Database Systems",
      },
    },
    {
      submission_id: "subm-201",
      submission_link: "https://files.example.com/submissions/subm-201.pdf",
      submission_time: "2025-09-12T09:20:00Z",
      approval: "pending",
      student_id: "user-222",
      assignment: {
        AN_id: "assign-002",
        AN_title: "SQL Queries Assignment",
        AN_link: "https://files.example.com/assignments/sql_assignment.pdf",
      },
      course: {
        idCourses: "course-456",
        course_name: "Advanced SQL",
      },
    },
  ]);

  // Approve function
  const handleApprove = (id) => {
    setSubmissions((prev) =>
      prev.map((sub) => (sub.submission_id === id ? { ...sub, approval: "approved" } : sub))
    );
  };

  // Mark function (kept intact) — UI will interpret non-approved as Pending
  const handleMark = (id) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.submission_id === id
          ? { ...sub, approval: sub.approval === "marked" ? "pending" : "marked" }
          : sub
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
      sub.student_id.toLowerCase().includes(search.toLowerCase()) ||
      sub.assignment.AN_title.toLowerCase().includes(search.toLowerCase()) ||
      sub.course.course_name.toLowerCase().includes(search.toLowerCase())
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

              {/* Table-like header using CSS grid to match screenshot proportions */}
              <MDBox
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 4fr 3fr 2fr 1fr 1fr",
                  gap: 2,
                  alignItems: "center",
                }}
                p={2}
                mb={1}
                borderRadius="md"
                bgcolor="#f1f5f9"
              >
                <MDTypography variant="button" fontWeight="bold" sx={{ color: "#6b7280" }}>
                  Student ID
                </MDTypography>
                <MDTypography variant="button" fontWeight="bold" sx={{ color: "#6b7280" }}>
                  Assignment
                </MDTypography>
                <MDTypography variant="button" fontWeight="bold" sx={{ color: "#6b7280" }}>
                  Course
                </MDTypography>
                <MDTypography variant="button" fontWeight="bold" sx={{ color: "#6b7280" }}>
                  File
                </MDTypography>
                <MDTypography variant="button" fontWeight="bold" sx={{ color: "#6b7280" }}>
                  Status
                </MDTypography>
                <MDTypography variant="button" fontWeight="bold" sx={{ color: "#6b7280" }}>
                  Action
                </MDTypography>
              </MDBox>

              {/* Submissions List */}
              {filteredSubmissions.length === 0 ? (
                <MDTypography variant="body2" color="textSecondary" align="center" py={3}>
                  No submissions found.
                </MDTypography>
              ) : (
                filteredSubmissions.map((sub) => {
                  // UI-only mapping: show either Approved or Pending (any non-'approved' is Pending)
                  const isApproved = sub.approval === "approved";
                  const displayStatus = isApproved ? "Approved" : "Pending";

                  return (
                    <MDBox
                      key={sub.submission_id}
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 4fr 3fr 2fr 1fr 1fr",
                        gap: 2,
                        alignItems: "center",
                        py: 2,
                        px: 1,
                        borderBottom: "1px solid rgba(0,0,0,0.06)",
                        background: "#ffffff",
                      }}
                    >
                      <MDTypography
                        variant="body2"
                        sx={{
                          cursor: "pointer",
                          textDecoration: "underline",
                          color: "#0b66ff",
                        }}
                        onClick={() => handleStudentClick(sub.student_id)}
                      >
                        {sub.student_id}
                      </MDTypography>

                      <MDTypography variant="body2">{sub.assignment.AN_title}</MDTypography>

                      <MDTypography variant="body2">{sub.course.course_name}</MDTypography>

                      <MDTypography variant="body2">
                        <a
                          href={sub.submission_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "none", display: "inline-flex", gap: 6 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Icon fontSize="small" sx={{ verticalAlign: "middle" }}>
                            description
                          </Icon>
                          <span style={{ textDecoration: "underline", color: "#1a73e8" }}>
                            View File
                          </span>
                        </a>
                      </MDTypography>

                      {/* Status pill */}
                      <MDBox>
                        <MDTypography
                          variant="caption"
                          sx={{
                            display: "inline-block",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: "20px",
                            fontWeight: 600,
                            fontSize: "0.75rem",
                            textTransform: "none",
                            backgroundColor: isApproved ? "#e6f4ea" : "#fff7e6",
                            color: isApproved ? "#14632a" : "#7a4a00",
                          }}
                        >
                          {displayStatus}
                        </MDTypography>
                      </MDBox>

                      {/* Action: either Approve (if pending) or Mark (if approved) */}
                      <MDBox display="flex" justifyContent="flex-start" gap={1}>
                        {!isApproved ? (
                          <MDButton
                            variant="gradient"
                            color="success"
                            size="small"
                            onClick={() => handleApprove(sub.submission_id)}
                          >
                            Approve
                          </MDButton>
                        ) : (
                          <MDButton
                            variant="outlined"
                            color="info"
                            size="small"
                            onClick={() => handleMark(sub.submission_id)}
                          >
                            Mark
                          </MDButton>
                        )}
                      </MDBox>
                    </MDBox>
                  );
                })
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
