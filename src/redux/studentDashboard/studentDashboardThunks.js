import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStudentDashboard = createAsyncThunk("student/fetchDashboard", async () => {
  const response = await axios.get("/api/student/dashboard");
  return response.data;
});
