// @mui material components
import React, { useState, useRef, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Layout components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Global search hook from context (already added to your context)
import { useSearch } from "context";

function createDummyPdfUrl(text) {
  const blob = new Blob([text], { type: "application/pdf" });
  return URL.createObjectURL(blob);
}

export default function AssignmentsPage() {
  const { search } = useSearch();
  const createdUrlsRef = useRef([]);

  // -----------------------------
  // Mock DB (structure mirrors your schema)
  // Replace this `db` object with API responses later.
  // -----------------------------
  const db = {
    Users: [
      {
        user_id: "u1",
        email: "student@example.com",
        first_name: "Student",
        last_name: "One",
      },
      {
        user_id: "t1",
        email: "teacher@example.com",
        first_name: "Teacher",
        last_name: "One",
      },
    ],
    Courses: [
      { idCourses: "c1", course_name: "Mathematics I" },
      { idCourses: "c2", course_name: "Physics I" },
      { idCourses: "c3", course_name: "Computer Science" },
    ],
    Assignment_Notes: [
      {
        AN_id: "a1",
        AN_link: "Algebra_Homework.pdf",
        AN_title: "Algebra Homework",
        AssignmentOrNotes: 1,
        AssignmentDeadline: "2025-09-10T00:00:00",
        Users_user_id: "t1",
        Courses_idCourses: "c1",
      },
      {
        AN_id: "a2",
        AN_link: "Mechanics_Worksheet.pdf",
        AN_title: "Mechanics Worksheet",
        AssignmentOrNotes: 1,
        AssignmentDeadline: "2025-09-12T00:00:00",
        Users_user_id: "t1",
        Courses_idCourses: "c2",
      },
      {
        AN_id: "a3",
        AN_link: "JS_Project.pdf",
        AN_title: "JS Project",
        AssignmentOrNotes: 1,
        AssignmentDeadline: "2025-09-15T00:00:00",
        Users_user_id: "t1",
        Courses_idCourses: "c3",
      },
      // an already-submitted + approved assignment
      {
        AN_id: "a4",
        AN_link: "Calculus_HW.pdf",
        AN_title: "Calculus Homework",
        AssignmentOrNotes: 1,
        AssignmentDeadline: "2025-08-30T00:00:00",
        Users_user_id: "t1",
        Courses_idCourses: "c1",
      },
      // a "note" (should be filtered out because AssignmentOrNotes !== 1)
      {
        AN_id: "n1",
        AN_link: "extra_reading.pdf",
        AN_title: "Extra Reading",
        AssignmentOrNotes: 0,
        AssignmentDeadline: "2025-09-20T00:00:00",
        Users_user_id: "t1",
        Courses_idCourses: "c1",
      },
    ],
    SubmittedAssignments: [
      {
        submission_id: "s1",
        submission_link: "Calculus_Submission.pdf",
        submission_time: "2025-08-30T10:00:00",
        approval: "approved",
        Assignment_Notes_AN_id: "a4", // maps to AN_id
        Users_user_id: "u1",
      },
    ],
    UserCourses: [
      {
        UC_id: "uc1",
        Users_user_id: "u1",
        // store arrays here (JSON in DB)
        active_courses: ["c1", "c2"],
        pending_courses: [],
        expired_courses: [],
      },
    ],
  };

  // Add extra dummy items for demo without changing original db literals
  db.Assignment_Notes.push(
    ...[
      {
        AN_id: "a5",
        AN_link: "Chemistry_Report.pdf",
        AN_title: "Chemistry Report",
        AssignmentOrNotes: 1,
        AssignmentDeadline: "2025-09-18T00:00:00",
        Users_user_id: "t1",
        Courses_idCourses: "c2",
      },
      {
        AN_id: "a6",
        AN_link: "Env_Presentation.pdf",
        AN_title: "Environmental Presentation",
        AssignmentOrNotes: 1,
        AssignmentDeadline: "2025-09-20T00:00:00",
        Users_user_id: "t1",
        Courses_idCourses: "c3",
      },
    ]
  );
  db.SubmittedAssignments.push({
    submission_id: "s2",
    submission_link: "Mechanics_Submission.pdf",
    submission_time: "2025-09-01T11:00:00",
    approval: "pending",
    Assignment_Notes_AN_id: "a2",
    Users_user_id: "u1",
  });

  // Current user (in real app you will get this from auth)
  const currentUser = db.Users.find((u) => u.user_id === "u1");
  const currentUserId = currentUser?.user_id;

  // Build the client-friendly `courses` array (used by UI & search)
  const courses = db.Courses.map((c) => ({ id: c.idCourses, title: c.course_name }));

  const userCoursesRow = db.UserCourses.find((uc) => uc.Users_user_id === currentUserId);
  const userActiveCourseIds =
    userCoursesRow && Array.isArray(userCoursesRow.active_courses)
      ? userCoursesRow.active_courses
      : courses.map((c) => c.id);

  const [pendingAssignments, setPendingAssignments] = useState(() => {
    const items = [];
    db.Assignment_Notes.forEach((note) => {
      if (!note.AssignmentOrNotes || !userActiveCourseIds.includes(note.Courses_idCourses)) return;

      const existingSubmission = db.SubmittedAssignments.find(
        (s) => s.Assignment_Notes_AN_id === note.AN_id && s.Users_user_id === currentUserId
      );
      if (existingSubmission) return;

      const due = note.AssignmentDeadline
        ? new Date(note.AssignmentDeadline).toISOString().split("T")[0]
        : "";

      const teacherFileUrl = createDummyPdfUrl(note.AN_link || `${note.AN_title} PDF content`);
      createdUrlsRef.current.push(teacherFileUrl);

      items.push({
        id: note.AN_id,
        courseId: note.Courses_idCourses,
        title: note.AN_title,
        due,
        teacherFileName: note.AN_link ? note.AN_link.split("/").pop() : `${note.AN_title}.pdf`,
        teacherFileUrl,
      });
    });
    return items;
  });

  const [submittedAssignments, setSubmittedAssignments] = useState(() => {
    const items = [];
    db.SubmittedAssignments.forEach((sub) => {
      if (sub.Users_user_id !== currentUserId) return;

      const note = db.Assignment_Notes.find((n) => n.AN_id === sub.Assignment_Notes_AN_id);
      if (!note) return;
      if (!userActiveCourseIds.includes(note.Courses_idCourses)) return;
      if (sub.approval && sub.approval.toLowerCase() === "approved") return;

      const studentFileUrl = createDummyPdfUrl(
        sub.submission_link || `${note.AN_title} submission`
      );
      createdUrlsRef.current.push(studentFileUrl);

      items.push({
        id: note.AN_id,
        courseId: note.Courses_idCourses,
        title: note.AN_title,
        submitted: sub.submission_time
          ? new Date(sub.submission_time).toISOString().split("T")[0]
          : "",
        studentFileName: sub.submission_link
          ? sub.submission_link.split("/").pop()
          : "submission.pdf",
        studentFileUrl,
      });
    });
    return items;
  });

  const [approvedAssignments, setApprovedAssignments] = useState(() => {
    const items = [];
    db.SubmittedAssignments.forEach((sub) => {
      if (sub.Users_user_id !== currentUserId) return;
      if (!sub.approval || sub.approval.toLowerCase() !== "approved") return;

      const note = db.Assignment_Notes.find((n) => n.AN_id === sub.Assignment_Notes_AN_id);
      if (!note) return;
      if (!userActiveCourseIds.includes(note.Courses_idCourses)) return;

      const studentFileUrl = createDummyPdfUrl(
        sub.submission_link || `${note.AN_title} submission`
      );
      createdUrlsRef.current.push(studentFileUrl);

      items.push({
        id: note.AN_id,
        courseId: note.Courses_idCourses,
        title: note.AN_title,
        submitted: sub.submission_time
          ? new Date(sub.submission_time).toISOString().split("T")[0]
          : "",
        studentFileName: sub.submission_link
          ? sub.submission_link.split("/").pop()
          : "submission.pdf",
        studentFileUrl,
        approved: sub.submission_time
          ? new Date(sub.submission_time).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
      });
    });
    return items;
  });

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

  // ------------ Search + filtering logic (unchanged)
  const q = (search || "").toString().trim().toLowerCase();

  const filterBySearch = (list) => {
    if (!q) return list;
    return list.filter((a) => {
      const courseTitle = courses.find((c) => c.id === a.courseId)?.title || "";
      return (
        (a.title && a.title.toLowerCase().includes(q)) ||
        (courseTitle && courseTitle.toLowerCase().includes(q)) ||
        (a.teacherFileName && a.teacherFileName.toLowerCase().includes(q)) ||
        (a.studentFileName && a.studentFileName.toLowerCase().includes(q))
      );
    });
  };

  const today = new Date().toISOString().split("T")[0];
  const expiredAssignments = pendingAssignments.filter((a) => a.due < today);
  const activePendingAssignments = pendingAssignments.filter((a) => a.due >= today);

  const filteredPending = filterBySearch(activePendingAssignments);
  const filteredExpired = filterBySearch(expiredAssignments);
  const filteredSubmitted = filterBySearch(submittedAssignments);
  const filteredApproved = filterBySearch(approvedAssignments);

  // unify card size
  const cardMinHeight = 140;

  // ---------- UI (redesigned visuals only; logic untouched)
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          {/* Pending Assignments */}
          <Grid item xs={12}>
            <MDTypography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
              Assignments
            </MDTypography>

            <MDTypography variant="subtitle2" gutterBottom sx={{ mb: 2 }}>
              Pending Assignments
            </MDTypography>

            <Grid container spacing={3}>
              {filteredPending.length === 0 ? (
                <Grid item xs={12}>
                  <MDTypography>No pending assignments 🎉</MDTypography>
                </Grid>
              ) : (
                filteredPending.map((a) => {
                  const course = courses.find((c) => c.id === a.courseId);
                  return (
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
                            <MDTypography
                              variant="caption"
                              sx={{ color: "primary.main", fontWeight: 700, display: "block" }}
                            >
                              {course?.title}
                            </MDTypography>

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

                              {/* Download button removed as requested */}
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
                  );
                })
              )}
            </Grid>
          </Grid>

          {/* Expired Assignments */}
          <Grid item xs={12} mt={4}>
            <MDTypography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              Expired Assignments
            </MDTypography>

            <Grid container spacing={3}>
              {filteredExpired.length === 0 ? (
                <Grid item xs={12}>
                  <MDTypography>No expired assignments ✅</MDTypography>
                </Grid>
              ) : (
                filteredExpired.map((a) => {
                  const course = courses.find((c) => c.id === a.courseId);
                  return (
                    <Grid item xs={12} sm={6} md={4} key={a.id}>
                      <Box sx={{ position: "relative" }}>
                        <Card
                          elevation={2}
                          style={{
                            padding: 16,
                            borderRadius: 10,
                            background: "#6e6e6e",
                            minHeight: cardMinHeight,
                          }}
                        >
                          <MDTypography
                            variant="caption"
                            sx={{ color: "#ff6b6b", fontWeight: 700 }}
                          >
                            {course?.title}
                          </MDTypography>

                          <MDTypography
                            variant="body2"
                            sx={{ mt: 1, fontWeight: 700, color: "#fff" }}
                          >
                            {a.title}
                          </MDTypography>

                          <MDTypography
                            variant="caption"
                            sx={{ color: "#ddd", display: "block", mt: 1 }}
                          >
                            Due: {a.due}
                          </MDTypography>
                        </Card>

                        {/* EXPIRED Overlay */}
                        <Box
                          sx={{
                            position: "absolute",
                            left: 10,
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "rgba(0,0,0,0.55)",
                            color: "#fff",
                            padding: "6px 12px",
                            borderRadius: 6,
                            fontWeight: 700,
                            letterSpacing: 0.8,
                            fontSize: "0.78rem",
                          }}
                        >
                          EXPIRED
                        </Box>
                      </Box>
                    </Grid>
                  );
                })
              )}
            </Grid>
          </Grid>

          {/* Submitted Assignments (Pending Approval) */}
          <Grid item xs={12} mt={4}>
            <MDTypography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              Submitted (Pending Approval)
            </MDTypography>

            <Grid container spacing={3}>
              {filteredSubmitted.length === 0 ? (
                <Grid item xs={12}>
                  <MDTypography>No submitted assignments yet.</MDTypography>
                </Grid>
              ) : (
                filteredSubmitted.map((a) => {
                  const course = courses.find((c) => c.id === a.courseId);
                  return (
                    <Grid item xs={12} sm={6} md={4} key={a.id}>
                      <Card
                        elevation={1}
                        style={{ padding: 12, borderRadius: 12, minHeight: cardMinHeight }}
                      >
                        <MDTypography
                          variant="caption"
                          sx={{ color: "primary.main", fontWeight: 700 }}
                        >
                          {course?.title}
                        </MDTypography>

                        <MDTypography variant="h6" sx={{ mt: 0.5, fontWeight: 800 }}>
                          {a.title}
                        </MDTypography>

                        <MDTypography variant="caption" sx={{ display: "block", mt: 1 }}>
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
                              sx={{
                                borderColor: "#fff",
                                backgroundColor: "#fff",
                                color: "primary.main",
                              }}
                            >
                              View Submission
                            </Button>

                            {/* Download button removed as requested */}
                          </MDBox>
                        )}

                        {/* Approve button removed from UI as requested */}
                      </Card>
                    </Grid>
                  );
                })
              )}
            </Grid>
          </Grid>

          {/* Approved Assignments */}
          <Grid item xs={12} mt={4}>
            <MDTypography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              Approved Assignments
            </MDTypography>

            <Grid container spacing={3}>
              {filteredApproved.length === 0 ? (
                <Grid item xs={12}>
                  <MDTypography>No approved assignments yet.</MDTypography>
                </Grid>
              ) : (
                filteredApproved.map((a) => {
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
                          padding: 16,
                          borderRadius: 12,
                          background: "#f6fffa",
                          cursor: canOpen ? "pointer" : "default",
                          position: "relative",
                          minHeight: cardMinHeight,
                        }}
                      >
                        <MDTypography
                          variant="caption"
                          sx={{ color: "primary.main", fontWeight: 700 }}
                        >
                          {course?.title}
                        </MDTypography>

                        <MDTypography variant="h6" sx={{ mt: 0.5, fontWeight: 800 }}>
                          {a.title}
                        </MDTypography>

                        <MDTypography
                          variant="caption"
                          sx={{ display: "block", mt: 1, color: "success.main" }}
                        >
                          Approved: {a.approved || a.submitted}
                        </MDTypography>

                        <Box sx={{ position: "absolute", right: 12, bottom: 12 }}>
                          <Chip
                            icon={<CheckCircleIcon />}
                            label="Approved"
                            size="small"
                            sx={{ background: "#e6f8ee", color: "#007a3a", fontWeight: 700 }}
                          />
                        </Box>

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
