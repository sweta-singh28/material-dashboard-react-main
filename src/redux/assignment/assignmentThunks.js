// src/redux/assignments/assignmentsThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * fetchAssignments
 * - Simulates an API call.
 * - IMPORTANT: per your request, there is NO JSON/data inside this thunk.
 * - Returns placeholder/empty arrays. Your real API should replace this.
 */
export const fetchAssignments = createAsyncThunk(
  "assignments/fetchAssignments",
  async (_, thunkAPI) => {
    try {
      // simulate small network delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Return empty placeholders (component still has the sample JSON commented for reference)
      return {
        users: [],
        courses: [],
        assignmentNotes: [],
        submittedAssignments: [],
        userCourses: [],
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to fetch assignments");
    }
  }
);
