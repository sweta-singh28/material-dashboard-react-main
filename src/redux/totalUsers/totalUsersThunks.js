import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
  "totalUsers/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/users"); // Replace with your API endpoint
      return response.data.Users || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
