// src/redux/courseDetails/courseDetailsThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch course details (no JSON here; JSON remains in component)
export const fetchCourseDetails = createAsyncThunk(
  "courseDetails/fetchCourseDetails",
  async (courseId, thunkAPI) => {
    try {
      // Simulate API call; returning empty object since JSON is in component
      const response = {};
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
