// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
// Teacher Pages
import TeacherDashboard from "layouts/teacher/dashboard";
import AddNewCourse from "layouts/teacher/addNewCourse";
import UploadMaterials from "layouts/teacher/uploadMaterials";
import ViewSubmissions from "layouts/teacher/viewSubmissions";
import courseProgressDetails from "layouts/teacher/courseProgressDetails";
//Student pages
import StudentDashboard from "layouts/student/dashboard";
import Assignment from "layouts/student/assignment";
import CourseDetails from "layouts/student/viewCourseDetails";
//Admin Pages
import AdminDashboard from "layouts/admin/dashboard";
import TotalUsers from "layouts/admin/totalUsers";
import TotalCourses from "layouts/admin/totalCourses";
import PendingApprovals from "layouts/admin/PendingApprovals";
import CourseDetail from "layouts/admin/courseDetails";
import UserDetails from "layouts/admin/userDetails";
import ActiveCourses from "layouts/admin/activeCourses";

//Common pages
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";
import Teacher from "layouts/teacher/dashboard";
import Student from "layouts/student/dashboard";
import Admin from "layouts/admin/dashboard";
import ViewCourseDetails from "layouts/student/viewCourseDetails";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Teacher",
    key: "teacher",
    icon: <Icon fontSize="small">school</Icon>,
    route: "/teacher",
    component: <Teacher />,
  },
  {
    type: "collapse",
    name: "New Course",
    key: "AddNewCourse",
    icon: <Icon fontSize="small">add</Icon>,
    route: "/addNewCourse",
    component: <AddNewCourse />,
  },
  {
    type: "collapse",
    name: "Progress",
    key: "courseProgressDetails",
    icon: <Icon fontSize="small">Progress</Icon>,
    route: "/courseProgressDetails",
    component: <courseProgressDetails />,
  },
  {
    type: "collapse",
    name: "   Upload Materials",
    key: "uploadMaterials",
    icon: <Icon fontSize="small">upload</Icon>,
    route: "/uploadMaterials",
    component: <UploadMaterials />,
  },
  {
    type: "collapse",
    name: "Submissions",
    key: "viewSubmissions",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/viewSubmissions",
    component: <ViewSubmissions />,
  },
  {
    type: "collapse",
    name: "Student",
    key: "student",
    icon: <Icon fontSize="small">menu_book</Icon>,
    route: "/student",
    component: <Student />,
  },
  {
    type: "collapse",
    name: "Course Details",
    key: "student",
    icon: <Icon fontSize="small">subject</Icon>,
    route: "/viewCourseDetails",
    component: <ViewCourseDetails />,
  },
  {
    type: "collapse",
    name: "Assignment",
    key: "student",
    icon: <Icon fontSize="small">task</Icon>,
    route: "/assignment",
    component: <Assignment />,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "RTL",
    key: "rtl",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/rtl",
    component: <RTL />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "collapse",
    name: "Admin",
    key: "admin",
    icon: <Icon fontSize="small">manage_accounts</Icon>,
    route: "/admin",
    component: <Admin />,
  },
  {
    type: "collapse",
    name: "Total Users",
    key: "totalUsers",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/admin/totalUsers",
    component: <TotalUsers />,
  },
  {
    type: "collapse",
    name: "User Details",
    key: "userDetails",
    icon: <Icon fontSize="small">ID</Icon>,
    route: "/userDetails/:id",
    component: <UserDetails />,
  },
  {
    type: "collapse",
    name: " All Courses",
    key: "totalCourses",
    icon: <Icon fontSize="small">school</Icon>,
    route: "/totalCourses",
    component: <TotalCourses />,
  },
  {
    type: "collapse",
    name: "Approvals",
    key: "pendingApprovals",
    icon: <Icon fontSize="small">check</Icon>,
    route: "/admin/pendingApprovals",
    component: <PendingApprovals />,
  },
  {
    type: "collapse",
    name: "Course Details",
    key: "courseDetails",
    icon: <Icon fontSize="small">Description</Icon>,
    route: "courseDetails",
    component: <CourseDetails />,
  },

  {
    type: "collapse",
    name: "Active Courses",
    key: "activeCourses",
    icon: <Icon fontSize="small">active</Icon>,
    route: "/admin/activeCourses",
    component: <ActiveCourses />,
  },
];

export default routes;
