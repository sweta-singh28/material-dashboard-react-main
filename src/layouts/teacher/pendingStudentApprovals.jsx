import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {
  fetchPendingStudents,
  approveStudent,
  rejectStudent,
} from "../../redux/pendingStudentApprovals/pendingStudentApprovalsThunks";

const PendingStudentApprovals = () => {
  const [controller] = useMaterialUIController();
  const { search } = controller;

  const dispatch = useDispatch();
  const { pendingList } = useSelector((state) => state.approvals);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Load requests from Redux
  useEffect(() => {
    dispatch(fetchPendingStudents());
  }, [dispatch]);

  // Filter requests based on search
  const filteredRequests = pendingList.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  // Approve / Reject Action
  const handleAction = (request_id, action) => {
    if (action === "approve") {
      dispatch(approveStudent(request_id));
    } else {
      dispatch(rejectStudent(request_id));
    }
    setRejectionReason("");
    setOpenDetails(false);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
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
            <Card sx={{ p: 3, boxShadow: 0, borderRadius: 0 }}>
              <MDTypography variant="h4" fontWeight="bold" mb={2}>
                Pending Student Course Join Requests
              </MDTypography>
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
                          key={req.id}
                          hover
                          sx={{
                            cursor: "pointer",
                            backgroundColor: "#f9f9f9",
                            "&:hover": { backgroundColor: "#f0f0f0" },
                          }}
                          onClick={() => {
                            setSelectedRequest(req);
                            setOpenDetails(true);
                          }}
                        >
                          <TableCell sx={{ borderBottom: "none" }}>{req.name}</TableCell>
                          <TableCell sx={{ borderBottom: "none" }}>{req.course_name}</TableCell>
                          <TableCell sx={{ borderBottom: "none" }}>{req.qualifications}</TableCell>
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
                  <MDInput value={selectedRequest.name} disabled fullWidth />
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
                  <MDInput value={selectedRequest.qualifications} disabled fullWidth />
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
            onClick={() => handleAction(selectedRequest.id, "reject")}
            disabled={!rejectionReason}
          >
            Reject
          </MDButton>
          <MDButton
            variant="gradient"
            color="success"
            onClick={() => handleAction(selectedRequest.id, "approve")}
          >
            Approve
          </MDButton>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default PendingStudentApprovals;
