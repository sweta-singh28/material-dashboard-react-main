import { combineReducers } from "@reduxjs/toolkit";
import studentReducer from "./student/studentReducer";
import teacherReducer from "./teacher/teacherReducer";
import adminReducer from "./admin/adminReducer";

const rootReducer = combineReducers({
  student: studentReducer,
  teacher: teacherReducer,
  admin: adminReducer,
});

export default rootReducer;
