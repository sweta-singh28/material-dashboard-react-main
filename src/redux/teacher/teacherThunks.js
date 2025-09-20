import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTeacherDashboard = createAsyncThunk("teacher/fetchDashboard", async () => {
  const response = await axios.get("/api/teacher/dashboard");
  return response.data;
});
