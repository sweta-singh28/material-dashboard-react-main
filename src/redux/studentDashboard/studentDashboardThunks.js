// src/redux/studentDashboard/studentDashboardThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch student dashboard data (simulated API)
export const fetchStudentDashboard = createAsyncThunk(
  "studentDashboard/fetchStudentDashboard",
  async (_, thunkAPI) => {
    try {
      // Simulate API call
      const response = []; // JSON remains in component; real API can replace this
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
