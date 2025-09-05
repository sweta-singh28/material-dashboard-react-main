// @mui material components
import React, { useState, useRef, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Layout components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function createDummyPdfUrl(text) {
  const blob = new Blob([text], { type: "application/pdf" });
  return URL.createObjectURL(blob);
}

export default function AssignmentsPage() {
  const createdUrlsRef = useRef([]);

  const courses = [
    { id: "c1", title: "Mathematics I" },
    { id: "c2", title: "Physics I" },
    { id: "c3", title: "Computer Science" },
  ];

  const [pendingAssignments, setPendingAssignments] = useState(() => {
    const a1Url = createDummyPdfUrl("Algebra Homework PDF content");
    const a2Url = createDummyPdfUrl("Mechanics Worksheet PDF content");
    const a3Url = createDummyPdfUrl("JS Project PDF content");
    createdUrlsRef.current.push(a1Url, a2Url, a3Url);

    return [
      {
        id: "a1",
        courseId: "c1",
        title: "Algebra Homework",
        due: "2025-09-10",
        teacherFileName: "Algebra_Homework.pdf",
        teacherFileUrl: a1Url,
      },
      {
        id: "a2",
        courseId: "c2",
        title: "Mechanics Worksheet",
        due: "2025-09-12",
        teacherFileName: "Mechanics_Worksheet.pdf",
        teacherFileUrl: a2Url,
      },
      {
        id: "a3",
        courseId: "c3",
        title: "JS Project",
        due: "2025-09-15",
        teacherFileName: "JS_Project.pdf",
        teacherFileUrl: a3Url,
      },
    ];
  });

  const [submittedAssignments, setSubmittedAssignments] = useState([]);

  const [approvedAssignments, setApprovedAssignments] = useState([
    {
      id: "a4",
      courseId: "c1",
      title: "Calculus Homework",
      submitted: "2025-08-30",
      studentFileName: "Calculus_Submission.pdf",
    },
  ]);

  useEffect(() => {
    return () => {
      createdUrlsRef.current.forEach((u) => {
        try {
          URL.revokeObjectURL(u);
        } catch (e) {}
      });
    };
  }, []);

  const handleSubmitAssignmentWithFile = (assignment, file) => {
    if (!file) return;
    const fileUrl = URL.createObjectURL(file);
    createdUrlsRef.current.push(fileUrl);

    setPendingAssignments((prev) => prev.filter((a) => a.id !== assignment.id));

    setSubmittedAssignments((prev) => [
      ...prev,
      {
        ...assignment,
        submitted: new Date().toISOString().split("T")[0],
        studentFileName: file.name,
        studentFileUrl: fileUrl,
      },
    ]);
  };

  const handleApproveAssignment = (assignment) => {
    setSubmittedAssignments((prev) => prev.filter((a) => a.id !== assignment.id));
    setApprovedAssignments((prev) => [
      ...prev,
      { ...assignment, approved: new Date().toISOString().split("T")[0] },
    ]);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          {/* Section 1: Pending Assignments (teacher uploaded PDFs) */}
          <Grid item xs={12}>
            <MDTypography variant="h5" gutterBottom color="warning.main">
              Pending Assignments (Teacher uploads)
            </MDTypography>

            <Grid container spacing={3}>
              {pendingAssignments.length === 0 ? (
                <Grid item xs={12}>
                  <MDTypography>No pending assignments 🎉</MDTypography>
                </Grid>
              ) : (
                pendingAssignments.map((a) => {
                  const course = courses.find((c) => c.id === a.courseId);
                  return (
                    <Grid item xs={12} sm={6} md={4} key={a.id}>
                      <Card style={{ padding: "12px", borderRadius: "12px" }}>
                        <Grid container spacing={1} alignItems="center">
                          <Grid item xs={7}>
                            <MDTypography variant="h6">{a.title}</MDTypography>
                            <MDTypography variant="body2" color="textSecondary">
                              Course: {course?.title}
                            </MDTypography>
                            <MDTypography variant="caption" color="error">
                              Due: {a.due}
                            </MDTypography>

                            <MDBox mt={1}>
                              <Button
                                variant="outlined"
                                component="a"
                                href={a.teacherFileUrl}
                                target="_blank"
                                rel="noreferrer"
                                startIcon={<VisibilityIcon />}
                                size="small"
                              >
                                View PDF
                              </Button>

                              <Button
                                variant="text"
                                size="small"
                                style={{ marginLeft: 8 }}
                                onClick={() => {
                                  const link = document.createElement("a");
                                  link.href = a.teacherFileUrl;
                                  link.download = a.teacherFileName || `${a.title}.pdf`;
                                  document.body.appendChild(link);
                                  link.click();
                                  link.remove();
                                }}
                              >
                                Download
                              </Button>
                            </MDBox>
                          </Grid>

                          <Grid item xs={5}>
                            <MDBox display="flex" flexDirection="column" alignItems="center">
                              <Typography variant="body2">Submit your work</Typography>

                              <MDBox mt={1} display="flex" gap={1}>
                                <Button
                                  component="label"
                                  variant="contained"
                                  startIcon={<UploadFileIcon />}
                                  size="small"
                                >
                                  Choose & Submit
                                  <input
                                    type="file"
                                    accept="application/pdf"
                                    hidden
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) handleSubmitAssignmentWithFile(a, file);
                                      e.target.value = "";
                                    }}
                                  />
                                </Button>
                              </MDBox>

                              <MDBox mt={1} display="flex" alignItems="center" gap={1}>
                                <Typography variant="caption">Only PDF allowed</Typography>
                              </MDBox>
                            </MDBox>
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  );
                })
              )}
            </Grid>
          </Grid>

          {/* Section 2: Submitted Assignments (waiting for approval) */}
          <Grid item xs={12} mt={4}>
            <MDTypography variant="h5" gutterBottom color="info.main">
              Submitted Assignments (Pending Approval)
            </MDTypography>
            <Grid container spacing={3}>
              {submittedAssignments.length === 0 ? (
                <Grid item xs={12}>
                  <MDTypography>No submitted assignments yet.</MDTypography>
                </Grid>
              ) : (
                submittedAssignments.map((a) => {
                  const course = courses.find((c) => c.id === a.courseId);
                  return (
                    <Grid item xs={12} sm={6} md={4} key={a.id}>
                      <Card
                        style={{ padding: "16px", borderRadius: "12px", background: "#f0f8ff" }}
                      >
                        <MDTypography variant="h6">{a.title}</MDTypography>
                        <MDTypography variant="body2" color="textSecondary">
                          Course: {course?.title}
                        </MDTypography>
                        <MDTypography variant="caption" color="primary">
                          Submitted: {a.submitted}
                        </MDTypography>

                        {a.studentFileName && (
                          <MDBox mt={1}>
                            <Button
                              variant="outlined"
                              component="a"
                              href={a.studentFileUrl}
                              target="_blank"
                              rel="noreferrer"
                              startIcon={<VisibilityIcon />}
                              size="small"
                            >
                              View Submission
                            </Button>

                            <Button
                              variant="text"
                              size="small"
                              style={{ marginLeft: 8 }}
                              onClick={() => {
                                const link = document.createElement("a");
                                link.href = a.studentFileUrl;
                                link.download = a.studentFileName;
                                document.body.appendChild(link);
                                link.click();
                                link.remove();
                              }}
                            >
                              Download
                            </Button>
                          </MDBox>
                        )}

                        <MDBox mt={2} display="flex" justifyContent="center" gap={1}>
                          <IconButton color="success" onClick={() => handleApproveAssignment(a)}>
                            <CheckCircleIcon />
                          </IconButton>
                        </MDBox>
                      </Card>
                    </Grid>
                  );
                })
              )}
            </Grid>
          </Grid>

          {/* Section 3: Approved Assignments */}
          <Grid item xs={12} mt={4}>
            <MDTypography variant="h5" gutterBottom color="success.main">
              Approved Assignments
            </MDTypography>
            <Grid container spacing={3}>
              {approvedAssignments.length === 0 ? (
                <Grid item xs={12}>
                  <MDTypography>No approved assignments yet.</MDTypography>
                </Grid>
              ) : (
                approvedAssignments.map((a) => {
                  const course = courses.find((c) => c.id === a.courseId);
                  const canOpen = !!a.studentFileUrl;
                  return (
                    <Grid item xs={12} sm={6} md={4} key={a.id}>
                      <Card
                        onClick={() => {
                          if (canOpen) {
                            window.open(a.studentFileUrl, "_blank", "noopener,noreferrer");
                          }
                        }}
                        role={canOpen ? "button" : undefined}
                        tabIndex={canOpen ? 0 : -1}
                        onKeyDown={(e) => {
                          if ((e.key === "Enter" || e.key === " ") && canOpen) {
                            window.open(a.studentFileUrl, "_blank", "noopener,noreferrer");
                          }
                        }}
                        style={{
                          padding: "16px",
                          borderRadius: "12px",
                          background: "#f0fff4",
                          cursor: canOpen ? "pointer" : "default",
                        }}
                        title={canOpen ? "Click to view submitted PDF" : undefined}
                      >
                        <MDTypography variant="h6">{a.title}</MDTypography>
                        <MDTypography variant="body2" color="textSecondary">
                          Course: {course?.title}
                        </MDTypography>
                        <MDTypography variant="caption" color="success">
                          Approved: {a.approved || a.submitted}
                        </MDTypography>

                        <MDBox mt={2} display="flex" justifyContent="center">
                          <Typography variant="caption" color="textSecondary">
                            {canOpen
                              ? "Click anywhere on the card to view the submitted PDF"
                              : "No submitted file URL available"}
                          </Typography>
                        </MDBox>
                      </Card>
                    </Grid>
                  );
                })
              )}
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
