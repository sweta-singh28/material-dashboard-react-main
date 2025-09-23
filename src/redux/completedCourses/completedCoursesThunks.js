// src/redux/completedCourses/completedCoursesThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch completed courses (JSON stays in component)
export const fetchCompletedCourses = createAsyncThunk(
  "completedCourses/fetchCompletedCourses",
  async (_, thunkAPI) => {
    try {
      // Simulate API call; returning empty array since JSON remains in component
      const response = [];
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
