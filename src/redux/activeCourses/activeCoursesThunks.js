// src/redux/activeCourses/activeCoursesThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch active courses (JSON stays in component)
export const fetchActiveCourses = createAsyncThunk(
  "activeCourses/fetchActiveCourses",
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
