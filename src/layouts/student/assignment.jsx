// @mui material components
import React, { useState, useRef, useEffect, useMemo } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

// react-redux
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignments } from "../../redux/assignment/assignmentThunks"; // ✅ fixed path

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Layout components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Global search hook
import { useSearch } from "context";

function createDummyPdfUrl(text) {
  const blob = new Blob([text], { type: "application/pdf" });
  return URL.createObjectURL(blob);
}

export default function AssignmentsPage() {
  const { search } = useSearch();
  const dispatch = useDispatch();
  const createdUrlsRef = useRef([]);

  // --- Redux state ---
  const { assignments = [], loading, error } = useSelector((state) => state.assignment);

  // Fetch on mount
  useEffect(() => {
    dispatch(fetchAssignments());
  }, [dispatch]);

  // --- Local derived data ---
  // Filter only real assignments
  const assignmentItems = useMemo(
    () => (assignments || []).filter((a) => a.assignmentOrNotes === 1),
    [assignments]
  );

  // For demo, assume submittedAssignments and approval status come from backend fields
  const [submittedAssignments, setSubmittedAssignments] = useState([]);
  const [approvedAssignments, setApprovedAssignments] = useState([]);

  const [pendingAssignments, setPendingAssignments] = useState(() => {
    const items = [];
    assignmentItems.forEach((a) => {
      const due = a.AssignmentDeadline
        ? new Date(a.AssignmentDeadline).toISOString().split("T")[0]
        : "";

      const teacherFileUrl = createDummyPdfUrl(a.AN_link || `${a.AN_title} PDF content`);
      createdUrlsRef.current.push(teacherFileUrl);

      items.push({
        id: a._id || a.AN_id,
        courseId: a.Courses_idCourses,
        title: a.AN_title || a.title,
        due,
        teacherFileName: a.AN_link ? a.AN_link.split("/").pop() : `${a.AN_title}.pdf`,
        teacherFileUrl,
      });
    });
    return items;
  });

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

  const q = (search || "").toString().trim().toLowerCase();
  const filterBySearch = (list) => {
    if (!q) return list;
    return list.filter(
      (a) =>
        a.title?.toLowerCase().includes(q) ||
        a.teacherFileName?.toLowerCase().includes(q) ||
        a.studentFileName?.toLowerCase().includes(q)
    );
  };

  const today = new Date().toISOString().split("T")[0];
  const expiredAssignments = pendingAssignments.filter((a) => a.due < today);
  const activePendingAssignments = pendingAssignments.filter((a) => a.due >= today);

  const filteredPending = filterBySearch(activePendingAssignments);
  const filteredExpired = filterBySearch(expiredAssignments);
  const filteredSubmitted = filterBySearch(submittedAssignments);
  const filteredApproved = filterBySearch(approvedAssignments);
  const cardMinHeight = 140;

  useEffect(() => {
    return () => {
      createdUrlsRef.current.forEach((u) => {
        try {
          URL.revokeObjectURL(u);
        } catch (e) {}
      });
    };
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          {/* --- Loading / Error States --- */}
          {loading && (
            <Grid item xs={12}>
              <MDTypography>Loading assignments...</MDTypography>
            </Grid>
          )}
          {error && (
            <Grid item xs={12}>
              <MDTypography color="error">{error}</MDTypography>
            </Grid>
          )}

          {/* Pending Assignments */}
          <Grid item xs={12}>
            <MDTypography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
              Assignments
            </MDTypography>
            <MDTypography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              Pending Assignments
            </MDTypography>

            <Grid container spacing={3}>
              {filteredPending.length === 0 ? (
                <Grid item xs={12}>
                  <MDTypography>No pending assignments 🎉</MDTypography>
                </Grid>
              ) : (
                filteredPending.map((a) => (
                  <Grid item xs={12} sm={6} md={4} key={a.id}>
                    <Card
                      elevation={1}
                      style={{
                        padding: 16,
                        borderRadius: 12,
                        minHeight: cardMinHeight,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Grid container alignItems="center">
                        <Grid item xs={8}>
                          <MDTypography variant="h6" sx={{ mt: 0.5, fontWeight: 800 }}>
                            {a.title}
                          </MDTypography>
                          <MDTypography variant="caption" sx={{ display: "block", mt: 1 }}>
                            Due: {a.due}
                          </MDTypography>
                          <MDBox mt={1} display="flex" gap={1} alignItems="center">
                            <Button
                              variant="outlined"
                              color="primary"
                              component="a"
                              href={a.teacherFileUrl}
                              target="_blank"
                              rel="noreferrer"
                              startIcon={<VisibilityIcon />}
                              size="small"
                              sx={{
                                borderColor: "#fff",
                                backgroundColor: "#fff",
                                color: "primary.main",
                              }}
                            >
                              View PDF
                            </Button>
                          </MDBox>
                        </Grid>
                        <Grid item xs={4}>
                          <Box
                            sx={{
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Box sx={{ textAlign: "center" }}>
                              <Button
                                component="label"
                                variant="contained"
                                startIcon={<UploadFileIcon />}
                                size="small"
                                sx={{
                                  borderRadius: 2,
                                  textTransform: "none",
                                  px: 2,
                                  py: 1,
                                  color: "white",
                                }}
                              >
                                Submit
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
                              <MDTypography variant="caption" sx={{ display: "block", mt: 1 }}>
                                Only PDF allowed
                              </MDTypography>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Grid>

          {/* Expired, Submitted, Approved sections kept identical */}
          {/* You can keep the same UI from your original version */}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
