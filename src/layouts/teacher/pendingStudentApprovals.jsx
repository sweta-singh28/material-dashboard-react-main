import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TablePagination from "@mui/material/TablePagination";

import { useMaterialUIController } from "context";

// ✅ JSON STRUCTURE for Student Join Requests with Qualification
const joinRequestsJSON = [
  {
    student_id: "s1",
    student_name: "Sophia Clark",
    qualification: "Bachelor's in Computer Science",
    course_id: "c1",
    course_name: "Introduction to Programming",
    request_status: "Pending",
  },
  {
    student_id: "s2",
    student_name: "Ethan Miller",
    qualification: "Master's in Mathematics",
    course_id: "c2",
    course_name: "Advanced Calculus",
    request_status: "Pending",
  },
  {
    student_id: "s3",
    student_name: "Olivia Davis",
    qualification: "Bachelor's in English Literature",
    course_id: "c3",
    course_name: "Creative Writing Workshop",
    request_status: "Pending",
  },
  {
    student_id: "s4",
    student_name: "Noah Wilson",
    qualification: "Bachelor's in Business Administration",
    course_id: "c4",
    course_name: "Digital Marketing Fundamentals",
    request_status: "Pending",
  },
  {
    student_id: "s5",
    student_name: "Ava Thompson",
    qualification: "Master's in Statistics",
    course_id: "c5",
    course_name: "Data Science Essentials",
    request_status: "Pending",
  },
  {
    student_id: "s6",
    student_name: "Sophia Rodriguez",
    qualification: "Ph.D. in Physics",
    course_id: "c6",
    course_name: "Quantum Mechanics",
    request_status: "Pending",
  },
  {
    student_id: "s7",
    student_name: "Liam White",
    qualification: "B.A. in History",
    course_id: "c7",
    course_name: "World History II",
    request_status: "Pending",
  },
  {
    student_id: "s8",
    student_name: "Emily Chen",
    qualification: "B.Sc. in Biology",
    course_id: "c8",
    course_name: "Cellular Biology",
    request_status: "Pending",
  },
  {
    student_id: "s9",
    student_name: "Jacob Lee",
    qualification: "M.S. in Civil Engineering",
    course_id: "c9",
    course_name: "Structural Analysis",
    request_status: "Pending",
  },
  {
    student_id: "s10",
    student_name: "Chloe Foster",
    qualification: "B.Sc. in Psychology",
    course_id: "c10",
    course_name: "Developmental Psychology",
    request_status: "Pending",
  },
];

const PendingStudentApprovals = () => {
  const [controller] = useMaterialUIController();
  const { search } = controller;

  const [pendingRequests, setPendingRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Load requests initially
  useEffect(() => {
    setPendingRequests(joinRequestsJSON);
  }, []);

  // Filter requests based on search
  const filteredRequests = pendingRequests.filter(
    (r) =>
      r.request_status === "Pending" &&
      Object.values(r).some((v) => String(v).toLowerCase().includes(search.toLowerCase()))
  );

  // Approve / Reject Action
  const handleAction = (request_id, action) => {
    setPendingRequests((prev) =>
      prev.map((r) =>
        r.student_id === request_id
          ? {
              ...r,
              request_status: action === "approve" ? "Approved" : "Rejected",
              rejection_reason: action === "reject" ? rejectionReason : null,
            }
          : r
      )
    );
    console.log(`Request ${request_id} ${action === "approve" ? "approved" : "rejected"}`);
    setRejectionReason("");
    setOpenDetails(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container>
          <Grid item xs={12}>
            {/* Card styling aligned with Students page */}
            <Card sx={{ p: 3, boxShadow: 0, borderRadius: 0 }}>
              <MDTypography variant="h4" fontWeight="bold" mb={2}>
                Pending Student Course Join Requests
              </MDTypography>

              {/* Table UI updated to match Students page */}
              <TableContainer>
                <Table sx={{ borderCollapse: "separate", borderSpacing: "0 8px" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ borderBottom: "none" }}>
                        <MDTypography variant="button" fontWeight="bold" color="text">
                          Student Name
                        </MDTypography>
                      </TableCell>
                      <TableCell sx={{ borderBottom: "none" }}>
                        <MDTypography variant="button" fontWeight="bold" color="text">
                          Course
                        </MDTypography>
                      </TableCell>
                      <TableCell sx={{ borderBottom: "none" }}>
                        <MDTypography variant="button" fontWeight="bold" color="text">
                          Qualification
                        </MDTypography>
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filteredRequests
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((req) => (
                        <TableRow
                          key={req.student_id}
                          hover
                          sx={{
                            cursor: "pointer",
                            backgroundColor: "#f9f9f9",
                            "&:hover": {
                              backgroundColor: "#f0f0f0",
                            },
                          }}
                          onClick={() => {
                            setSelectedRequest(req);
                            setOpenDetails(true);
                          }}
                        >
                          <TableCell sx={{ borderBottom: "none" }}>{req.student_name}</TableCell>
                          <TableCell sx={{ borderBottom: "none" }}>{req.course_name}</TableCell>
                          <TableCell sx={{ borderBottom: "none" }}>{req.qualification}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredRequests.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />

      {/* Modal */}
      <Dialog open={openDetails} onClose={() => setOpenDetails(false)} fullWidth maxWidth="sm">
        <DialogTitle>Request Details</DialogTitle>
        <DialogContent dividers>
          {selectedRequest && (
            <MDBox>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <MDTypography variant="caption" color="text">
                    Student Name
                  </MDTypography>
                  <MDInput value={selectedRequest.student_name} disabled fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <MDTypography variant="caption" color="text">
                    Course
                  </MDTypography>
                  <MDInput value={selectedRequest.course_name} disabled fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <MDTypography variant="caption" color="text">
                    Qualification
                  </MDTypography>
                  <MDInput value={selectedRequest.qualification} disabled fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <MDTypography variant="caption" color="text">
                    Rejection Reason
                  </MDTypography>
                  <MDInput
                    multiline
                    rows={3}
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </MDBox>
          )}
        </DialogContent>
        <DialogActions>
          <MDButton onClick={() => setOpenDetails(false)} color="dark" variant="text">
            Close
          </MDButton>
          <MDButton
            variant="gradient"
            color="error"
            onClick={() => handleAction(selectedRequest.student_id, "reject")}
            disabled={!rejectionReason}
          >
            Reject
          </MDButton>
          <MDButton
            variant="gradient"
            color="success"
            onClick={() => handleAction(selectedRequest.student_id, "approve")}
          >
            Approve
          </MDButton>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default PendingStudentApprovals;
