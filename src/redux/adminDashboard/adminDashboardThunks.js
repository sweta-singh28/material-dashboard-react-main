// adminDashboardThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAdminStats = createAsyncThunk(
  "admin/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      // Make authenticated request
      const response = await axios.get("https://coursifyserver.onrender.com/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data; // Matches reducer's 'action.payload'
    } catch (err) {
      // Extract readable error message
      const message = err.response?.data?.message || err.message || "Failed to fetch admin stats";
      return rejectWithValue(message);
    }
  }
);
