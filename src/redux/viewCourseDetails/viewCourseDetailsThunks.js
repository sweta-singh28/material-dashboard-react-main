// src/redux/viewCourseDetails/viewCourseDetailsThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";

// This thunk just simulates an API call; no JSON here
export const fetchCourseDetails = createAsyncThunk(
  "viewCourseDetails/fetchCourseDetails",
  async (_, thunkAPI) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Return empty object placeholders (component will use commented JSON)
      return {
        course: {},
        teacher: {},
        notes: [],
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
