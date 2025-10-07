import { combineReducers } from "@reduxjs/toolkit";

// student
import studentDashboardReducer from "./studentDashboard/studentDashboardReducer";
import assignmentReducer from "./assignment/assignmentReducer";
import viewCourseDetailsReducer from "./viewCourseDetails/viewCourseDetailsReducer";

// teacher
import teacherDashboardReducer from "./teacherDashboard/teacherDashboardReducer";
import addNewCourseReducer from "./addNewCourse/addNewCourseReducer";
import pendingStudentApprovalsReducer from "./pendingStudentApprovals/pendingStudentApprovalsReducer";
import studentDetailsReducer from "./studentDetails/studentDetailsReducer";
import studentRegisterReducer from "./studentRegister/studentRegisterReducer";
import subjectDetailsReducer from "./subjectDetails/subjectDetailsReducer";
import uploadMaterialsReducer from "./uploadMaterials/uploadMaterialsReducer";
import viewSubmissionsReducer from "./viewSubmissions/viewSubmissionsReducer";

// admin
import adminDashboardReducer from "./adminDashboard/adminDashboardReducer";
import activeCoursesReducer from "./activeCourses/activeCoursesReducer";
import completedCoursesReducer from "./completedCourses/completedCoursesReducer";
import courseDetailsReducer from "./courseDetails/courseDetailsReducer";
import pendingApprovalsReducer from "./pendingApprovals/pendingApprovalsReducer";
import totalCoursesReducer from "./totalCourses/totalCoursesReducer";
import totalUsersReducer from "./totalUsers/totalUsersReducer";
import userDetailsReducer from "./userDetails/userDetailsReducer";

//Auth
import signupReducer from "./authentication/signup/signupReducer";
import signinReducer from "./authentication/signin/signinReducer";

const rootReducer = combineReducers({
  // student
  studentDashboard: studentDashboardReducer,
  assignment: assignmentReducer,
  viewCourseDetails: viewCourseDetailsReducer,

  // teacher
  teacherDashboard: teacherDashboardReducer,
  addNewCourse: addNewCourseReducer,
  approvals: pendingStudentApprovalsReducer,
  studentDetails: studentDetailsReducer,
  studentRegister: studentRegisterReducer,
  subjectDetails: subjectDetailsReducer,
  uploadMaterials: uploadMaterialsReducer,
  viewSubmissions: viewSubmissionsReducer,

  // admin
  adminDashboard: adminDashboardReducer,
  activeCourses: activeCoursesReducer,
  completedCourses: completedCoursesReducer,
  courseDetails: courseDetailsReducer,
  pendingApprovals: pendingApprovalsReducer,
  totalCourses: totalCoursesReducer,
  totalUsers: totalUsersReducer,
  userDetails: userDetailsReducer,

  //auth
  signup: signupReducer,
  signin: signinReducer,
});

export default rootReducer;
