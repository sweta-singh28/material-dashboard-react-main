import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all submissions (replace the URL with your actual API endpoint)
export const fetchSubmissions = createAsyncThunk(
  "submissions/fetchSubmissions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/submissions");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching submissions");
    }
  }
);
