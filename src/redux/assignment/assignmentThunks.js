import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch assignments for the logged-in student
export const fetchAssignments = createAsyncThunk(
  "assignments/fetchAssignments",
  async (_, { rejectWithValue }) => {
    try {
      // Get token from localStorage (or sessionStorage)
      const token = localStorage.getItem("token");

      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      // Make API request with Authorization header
      const response = await axios.get("http://localhost:5000/api/student/assignments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Backend returns an array of assignments
      return response.data;
    } catch (err) {
      // Gracefully handle error cases
      return rejectWithValue(err.response?.data?.error || "Failed to fetch assignments");
    }
  }
);
