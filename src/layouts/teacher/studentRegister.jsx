// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// React Router
import { useNavigate } from "react-router-dom";

// Context for search
import { useMaterialUIController } from "context";

function Students() {
  const navigate = useNavigate();
  const [controller] = useMaterialUIController();
  const { search } = controller;

  // Hardcoded JSON data (later replace with API call)
  const studentsData = [
    {
      user_id: "S101",
      full_name: "Sophia Clark",
      email: "sophia@example.com",
      roll_no: "R101",
    },
    {
      user_id: "S102",
      full_name: "Ethan Miller",
      email: "ethan@example.com",
      roll_no: "R102",
    },
    {
      user_id: "S103",
      full_name: "Olivia Davis",
      email: "olivia@example.com",
      roll_no: "R103",
    },
    {
      user_id: "S104",
      full_name: "Liam Wilson",
      email: "liam@example.com",
      roll_no: "R104",
    },
    {
      user_id: "S105",
      full_name: "Ava Martinez",
      email: "ava@example.com",
      roll_no: "R105",
    },
  ];

  // Apply search filter
  const filteredStudents = studentsData.filter((student) =>
    Object.values(student).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container>
          <Grid item xs={12}>
            <Card sx={{ p: 3, borderRadius: "16px" }}>
              <MDTypography variant="h5" fontWeight="bold" gutterBottom>
                👩‍🎓 Students
              </MDTypography>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <MDTypography variant="button" fontWeight="bold">
                          Roll No.
                        </MDTypography>
                      </TableCell>
                      <TableCell>
                        <MDTypography variant="button" fontWeight="bold">
                          Name
                        </MDTypography>
                      </TableCell>
                      <TableCell>
                        <MDTypography variant="button" fontWeight="bold">
                          Email
                        </MDTypography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow
                        key={student.user_id}
                        hover
                        sx={{ cursor: "pointer" }}
                        onClick={() => navigate(`/students/${student.user_id}`)}
                      >
                        <TableCell>{student.roll_no}</TableCell>
                        <TableCell>{student.full_name}</TableCell>
                        <TableCell>{student.email}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Students;
