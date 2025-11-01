// src/redux/studentDashboard/studentDashboardThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Fetch student dashboard data (simulated API)
export const fetchStudentDashboard = createAsyncThunk(
  "studentDashboard/fetchStudentDashboard",
  async (_, thunkAPI) => {
    try {
      // Simulate API call
      const token = localStorage.getItem("token");

      // Make authenticated request
      const response = await axios.get(
        "https://coursifyserver.onrender.com/api/student/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);
      return response.data; // Matches reducer's 'action.payload'
    } catch (err) {
      // Extract readable error message
      const message = err.response?.data?.message || err.message || "Failed to fetch admin stats";
      return rejectWithValue(message);
    }
  }
);
