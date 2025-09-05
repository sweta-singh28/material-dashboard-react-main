// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// React Router
import { useNavigate } from "react-router-dom";

function Students() {
  const navigate = useNavigate();

  // Dummy student data with roll numbers
  const students = [
    { roll: "101", name: "Sophia Clark", email: "sophia@example.com" },
    { roll: "102", name: "Ethan Miller", email: "ethan@example.com" },
    { roll: "103", name: "Olivia Davis", email: "olivia@example.com" },
    { roll: "104", name: "Liam Wilson", email: "liam@example.com" },
    { roll: "105", name: "Ava Martinez", email: "ava@example.com" },
  ];

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
                      {/* Action column removed as requested */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map((student, index) => (
                      <TableRow
                        key={index}
                        hover
                        sx={{ cursor: "pointer" }}
                        onClick={() => navigate(`/students/${index}`)}
                      >
                        <TableCell>{student.roll}</TableCell>
                        <TableCell>{student.name}</TableCell>
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
