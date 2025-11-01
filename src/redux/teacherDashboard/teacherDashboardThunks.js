import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch teacher data (including courses) with Bearer token
export const fetchTeacherCourses = createAsyncThunk(
  "teacherDashboard/fetchTeacherCourses",
  async (_, { rejectWithValue }) => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token"); // replace "token" with your key if different

      const response = await axios.get(
        `https://coursifyserver.onrender.com/api/teacher/Dashboard/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Fetched teacher data:", response.data);

      // Store the whole object from backend
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Failed to fetch teacher data";
      return rejectWithValue(message);
    }
  }
);
