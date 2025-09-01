// React
import { useState } from "react";

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

function ViewSubmissions() {
  // Dummy submissions
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      studentName: "John Doe",
      title: "Assignment 1 - DBMS",
      file: "assignment1_john.pdf",
      status: "Pending",
    },
    {
      id: 2,
      studentName: "Jane Smith",
      title: "Assignment 1 - DBMS",
      file: "assignment1_jane.pdf",
      status: "Pending",
    },
    {
      id: 3,
      studentName: "Ravi Kumar",
      title: "Assignment 1 - DBMS",
      file: "assignment1_ravi.pdf",
      status: "Approved",
    },
  ]);

  // Approve function
  const handleApprove = (id) => {
    setSubmissions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, status: "Approved" } : sub))
    );
  };

  // Mark function (just toggles between Marked/Unmarked)
  const handleMark = (id) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === id ? { ...sub, status: sub.status === "Marked" ? "Pending" : "Marked" } : sub
      )
    );
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={10}>
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
                  Student Name
                </MDTypography>
                <MDTypography variant="button" fontWeight="bold" flex={1}>
                  Title
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
              {submissions.map((sub) => (
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
                    {sub.studentName}
                  </MDTypography>
                  <MDTypography variant="body2" flex={1}>
                    {sub.title}
                  </MDTypography>
                  <MDTypography variant="body2" flex={1} color="info">
                    {sub.file}
                  </MDTypography>
                  <MDTypography
                    variant="body2"
                    flex={1}
                    color={sub.status === "Approved" ? "success" : "warning"}
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
              ))}
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ViewSubmissions;
