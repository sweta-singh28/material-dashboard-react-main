// React
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Redux
import { uploadAssignment, uploadNotes } from "../../redux/uploadMaterials/uploadMaterialsThunks";
import { resetUploadState } from "../../redux/uploadMaterials/uploadMaterialsReducer";

// @mui material components
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

// Layout
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function UploadMaterials() {
  const location = useLocation();
  const { course, type } = location.state || {};
  const dispatch = useDispatch();
  const { uploading, success, error } = useSelector((state) => state.uploadMaterials);

  const [activeTab, setActiveTab] = useState(null);
  const [selectedAssignmentSubject, setSelectedAssignmentSubject] = useState("");
  const [selectedNotesSubject, setSelectedNotesSubject] = useState("");
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [notesFile, setNotesFile] = useState(null);

  const courses = [
    { course_name: "Mathematics" },
    { course_name: "Physics" },
    { course_name: "Chemistry" },
    { course_name: "Computer Science" },
    { course_name: "Biology" },
  ];

  useEffect(() => {
    if (course && type) {
      setActiveTab(type);
      if (type === "assignment") setSelectedAssignmentSubject(course.name);
      if (type === "notes") setSelectedNotesSubject(course.name);
    }
  }, [course, type]);

  const handleAssignmentSubmit = (e) => {
    e.preventDefault();
    if (!assignmentFile) return alert("Select a file!");
    const formData = new FormData();
    formData.append("subject", selectedAssignmentSubject);
    formData.append("title", assignmentTitle);
    formData.append("file", assignmentFile);
    formData.append("deadline", deadline);
    dispatch(uploadAssignment(formData));
  };

  const handleNotesSubmit = (e) => {
    e.preventDefault();
    if (!notesFile) return alert("Select a file!");
    const formData = new FormData();
    formData.append("subject", selectedNotesSubject);
    formData.append("file", notesFile);
    dispatch(uploadNotes(formData));
  };

  useEffect(() => {
    if (success || error) {
      setTimeout(() => dispatch(resetUploadState()), 3000);
    }
  }, [success, error, dispatch]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={8}>
            <MDBox p={3} borderRadius="lg" shadow="md" bgColor="white">
              <MDTypography variant="h4" gutterBottom>
                📤 Upload Materials
              </MDTypography>

              <MDBox display="flex" gap={2} mb={3}>
                <MDButton
                  variant={activeTab === "assignment" ? "gradient" : "outlined"}
                  color="info"
                  onClick={() => setActiveTab("assignment")}
                >
                  Assignment
                </MDButton>
                <MDButton
                  variant={activeTab === "notes" ? "gradient" : "outlined"}
                  color="info"
                  onClick={() => setActiveTab("notes")}
                >
                  Notes
                </MDButton>
              </MDBox>

              {!activeTab && (
                <MDTypography variant="button" color="text">
                  Select <strong>Assignment</strong> or <strong>Notes</strong> to continue.
                </MDTypography>
              )}

              {activeTab === "assignment" && (
                <MDBox mt={1} component="form" role="form" onSubmit={handleAssignmentSubmit}>
                  <MDBox mb={2}>
                    <MDTypography variant="button" fontWeight="medium">
                      Subject
                    </MDTypography>
                    <MDInput
                      select
                      fullWidth
                      value={selectedAssignmentSubject}
                      onChange={(e) => setSelectedAssignmentSubject(e.target.value)}
                      required
                    >
                      {courses.map((c) => (
                        <MenuItem key={c.course_name} value={c.course_name}>
                          {c.course_name}
                        </MenuItem>
                      ))}
                    </MDInput>
                  </MDBox>

                  <MDBox mb={2}>
                    <MDTypography variant="button" fontWeight="medium">
                      Assignment Title
                    </MDTypography>
                    <MDInput
                      fullWidth
                      placeholder="Enter assignment title"
                      value={assignmentTitle}
                      onChange={(e) => setAssignmentTitle(e.target.value)}
                      required
                    />
                  </MDBox>

                  <MDBox mb={2}>
                    <MDTypography variant="button" fontWeight="medium">
                      Upload Assignment
                    </MDTypography>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.zip"
                      style={{ display: "block", marginTop: 8 }}
                      onChange={(e) => setAssignmentFile(e.target.files[0])}
                      required
                    />
                  </MDBox>

                  <MDBox mb={2}>
                    <MDTypography variant="button" fontWeight="medium">
                      Deadline
                    </MDTypography>
                    <MDInput
                      fullWidth
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      required
                    />
                  </MDBox>

                  {uploading && <MDTypography color="info">Uploading...</MDTypography>}
                  {success && <MDTypography color="success">Uploaded successfully!</MDTypography>}
                  {error && <MDTypography color="error">{error}</MDTypography>}

                  <MDBox mt={3} display="flex" justifyContent="flex-end" gap={2}>
                    <MDButton
                      variant="outlined"
                      color="secondary"
                      onClick={() => setActiveTab(null)}
                      type="button"
                    >
                      Cancel
                    </MDButton>
                    <MDButton variant="gradient" color="info" type="submit">
                      Upload Assignment
                    </MDButton>
                  </MDBox>
                </MDBox>
              )}

              {activeTab === "notes" && (
                <MDBox mt={1} component="form" role="form" onSubmit={handleNotesSubmit}>
                  <MDBox mb={2}>
                    <MDTypography variant="button" fontWeight="medium">
                      Subject
                    </MDTypography>
                    <MDInput
                      select
                      fullWidth
                      value={selectedNotesSubject}
                      onChange={(e) => setSelectedNotesSubject(e.target.value)}
                      required
                    >
                      {courses.map((c) => (
                        <MenuItem key={c.course_name} value={c.course_name}>
                          {c.course_name}
                        </MenuItem>
                      ))}
                    </MDInput>
                  </MDBox>

                  <MDBox mb={2}>
                    <MDTypography variant="button" fontWeight="medium">
                      Upload Notes
                    </MDTypography>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx"
                      style={{ display: "block", marginTop: 8 }}
                      onChange={(e) => setNotesFile(e.target.files[0])}
                      required
                    />
                  </MDBox>

                  {uploading && <MDTypography color="info">Uploading...</MDTypography>}
                  {success && <MDTypography color="success">Uploaded successfully!</MDTypography>}
                  {error && <MDTypography color="error">{error}</MDTypography>}

                  <MDBox mt={3} display="flex" justifyContent="flex-end" gap={2}>
                    <MDButton
                      variant="outlined"
                      color="secondary"
                      onClick={() => setActiveTab(null)}
                      type="button"
                    >
                      Cancel
                    </MDButton>
                    <MDButton variant="gradient" color="info" type="submit">
                      Upload Notes
                    </MDButton>
                  </MDBox>
                </MDBox>
              )}
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default UploadMaterials;
// ✅ Hardcoded JSON (replace later with API response)
// const courses = [
//   { course_name: "Mathematics" },
//   { course_name: "Physics" },
//   { course_name: "Chemistry" },
//   { course_name: "Computer Science" },
//   { course_name: "Biology" },
// ];
