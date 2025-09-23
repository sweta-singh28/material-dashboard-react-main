// src/redux/pendingApprovals/pendingApprovalsThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch pending courses (no JSON here, will be fetched from backend later)
export const fetchPendingCourses = createAsyncThunk(
  "pendingApprovals/fetchPendingCourses",
  async (_, thunkAPI) => {
    try {
      // Simulate API call with empty array; JSON is in component
      const response = [];
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
