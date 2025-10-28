// src/redux/viewCourseDetails/viewCourseDetailsThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Thunk to fetch details of a specific course by ID
export const fetchCourseDetails = createAsyncThunk(
  "viewCourseDetails/fetchCourseDetails",
  async (courseId, thunkAPI) => {
    try {
      // ✅ Get token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      // ✅ Configure headers
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      // ✅ API call to backend
      const response = await axios.get(
        `http://localhost:5000/api/student/coursedetails/${courseId}`,
        config
      );

      // ✅ Return data (expected format: { course, teacher, notes })
      console.log("✅ Fetched course details:", response.data);
      return response.data.data;
    } catch (error) {
      console.error("❌ Error fetching course details:", error);

      // ✅ Handle both network and server errors
      const message = error.response?.data?.message || error.message || "Something went wrong";
      return thunkAPI.rejectWithValue(message);
    }
  }
);
