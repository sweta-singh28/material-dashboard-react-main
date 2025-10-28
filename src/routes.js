// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
// Teacher Pages
import TeacherDashboard from "layouts/teacher/dashboard";
import AddNewCourse from "layouts/teacher/addNewCourse";
import UploadMaterials from "layouts/teacher/uploadMaterials";
import ViewSubmissions from "layouts/teacher/viewSubmissions";
import StudentDetails from "layouts/teacher/studentDetails";
import StudentRegister from "layouts/teacher/studentRegister";
import SubjectDetails from "layouts/teacher/subjectDetails";
import PendingStudentApprovals from "layouts/teacher/pendingStudentApprovals";
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
import CompletedCourses from "layouts/admin/completedCourses";

//Common pages
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/signin";
import SignUp from "layouts/authentication/signup";

// @mui icons
import Icon from "@mui/material/Icon";
import Teacher from "layouts/teacher/dashboard";
import Student from "layouts/student/dashboard";
import Admin from "layouts/admin/dashboard";
import ViewCourseDetails from "layouts/student/viewCourseDetails";
import { FaBookOpen } from "react-icons/fa";
import { Subject } from "@mui/icons-material";

const commonLoggedInRoutes = [
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
    inNav: true,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
    inNav: true,
  },
];

const dynamicRoutes = [
  {
    type: "collapse",
    name: "Student Details",
    key: "studentDetails",
    icon: <Icon fontSize="small">Details</Icon>,
    route: "/students/:id",
    component: <StudentDetails />,
  },
  {
    type: "collapse",
    name: "Course Details",
    key: "SubjectDetails",
    icon: <Icon fontSize="small">subject</Icon>,
    route: "/teacher/subjectDetails/:id",
    component: <SubjectDetails />,
  },
  {
    type: "collapse",
    name: "User Details",
    key: "userDetails",
    icon: <Icon fontSize="small">ID</Icon>,
    route: "/userDetails/:id",
    component: <UserDetails />,
  },
];

// Convert to a function that gets called each time
const getRoutes = () => {
  let routes = [];
  let user = localStorage.getItem("user");

  if (!user) {
    // --- Routes for logged-out users ---
    routes = [
      {
        type: "collapse",
        name: "Sign In",
        key: "signin",
        icon: <Icon fontSize="small">login</Icon>,
        route: "/authentication/signin",
        component: <SignIn />,
        inNav: true,
      },
      {
        type: "collapse",
        name: "Sign Up",
        key: "signup",
        icon: <Icon fontSize="small">signup</Icon>,
        route: "/authentication/signup",
        component: <SignUp />,
        inNav: true,
      },
    ];
  } else {
    user = JSON.parse(user);
    let roleSpecificRoutes = [];

    if (user.role === "teacher") {
      roleSpecificRoutes = [
        {
          type: "collapse",
          name: "Dashboard",
          key: "teacher",
          icon: <Icon fontSize="small">school</Icon>,
          route: "/teacher/dashboard",
          component: <Teacher />,
          inNav: true,
        },
        {
          type: "collapse",
          name: "New Course",
          key: "addNewCourse",
          icon: <Icon fontSize="small">add</Icon>,
          route: "/teacher/addNewCourse",
          component: <AddNewCourse />,
          inNav: true,
        },
        {
          type: "collapse",
          name: "Student Register",
          key: "teacher/studentRegister",
          icon: <Icon fontSize="small">menu_book</Icon>,
          route: "/teacher/studentRegister",
          component: <StudentRegister />,
          inNav: true,
        },
        {
          type: "collapse",
          name: "Upload Materials",
          key: "uploadMaterials",
          icon: <Icon fontSize="small">upload</Icon>,
          route: "/uploadMaterials",
          component: <UploadMaterials />,
          inNav: true,
        },
        {
          type: "collapse",
          name: "Approve Students",
          key: "pendingStudentApprovals",
          icon: <Icon fontSize="small">check</Icon>,
          route: "/pendingStudentApprovals",
          component: <PendingStudentApprovals />,
          inNav: true,
        },
        {
          type: "collapse",
          name: "Submissions",
          key: "viewSubmissions",
          icon: <Icon fontSize="small">assignment</Icon>,
          route: "/viewSubmissions",
          component: <ViewSubmissions />,
          inNav: true,
        },
      ];
    } else if (user.role === "student") {
      roleSpecificRoutes = [
        {
          type: "collapse",
          name: "Dashboard",
          key: "student",
          icon: <Icon fontSize="small">menu_book</Icon>,
          route: "/student/dashboard",
          component: <Student />,
          inNav: true,
        },
        {
          type: "collapse",
          name: "Course Details",
          key: "viewCourseDetails",
          icon: <Icon fontSize="small">subject</Icon>,
          route: "/student/viewCourseDetails/:id",
          component: <ViewCourseDetails />,
          inNav: true,
        },
        {
          type: "collapse",
          name: "Assignment",
          key: "assignment",
          icon: <Icon fontSize="small">task</Icon>,
          route: "/assignment",
          component: <Assignment />,
          inNav: true,
        },
      ];
    } else if (user.role === "admin") {
      roleSpecificRoutes = [
        {
          type: "collapse",
          name: "Dashboard",
          key: "admin",
          icon: <Icon fontSize="small">manage_accounts</Icon>,
          route: "/admin/dashboard",
          component: <Admin />,
          inNav: true,
        },
        {
          type: "collapse",
          name: "Total Users",
          key: "totalUsers",
          icon: <Icon fontSize="small">people</Icon>,
          route: "/admin/totalUsers",
          component: <TotalUsers />,
          inNav: true,
        },
        {
          type: "collapse",
          name: " All Courses",
          key: "totalCourses",
          icon: <Icon fontSize="small">school</Icon>,
          route: "/admin/totalCourses",
          component: <TotalCourses />,
          inNav: true,
        },
        {
          type: "collapse",
          name: "Approvals",
          key: "pendingApprovals",
          icon: <Icon fontSize="small">check</Icon>,
          route: "/admin/pendingApprovals",
          component: <PendingApprovals />,
          inNav: true,
        },
        {
          type: "collapse",
          name: "Course Details",
          key: "courseDetails",
          icon: <Icon fontSize="small">Description</Icon>,
          route: "/courseDetails",
          component: <CourseDetails />,
          inNav: true,
        },
        {
          type: "collapse",
          name: "Active Courses",
          key: "activeCourses",
          icon: <FaBookOpen size={18} />,
          route: "/admin/activeCourses",
          component: <ActiveCourses />,
          inNav: true,
        },
        {
          type: "collapse",
          name: "Completed Courses",
          key: "completedCourses",
          icon: <Icon fontSize="small">check</Icon>,
          route: "/admin/completedCourses",
          component: <CompletedCourses />,
          inNav: true,
        },
      ];
    }
    routes = [...roleSpecificRoutes, ...commonLoggedInRoutes, ...dynamicRoutes];
  }

  return routes;
};

export default getRoutes;
