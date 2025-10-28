// src/redux/slices/courseSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchCourses } from "./availableCourseThunk"; // ✅ ensure correct path

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    courses: {},
    loading: false,
    error: null,
  },
  reducers: {
    // Optional reducers (for local updates)
    clearCourses(state) {
      state.courses = {};
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🟡 When request starts
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // 🟢 When request succeeds
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;

        // Some backends wrap data as { success, data: [...] }
        // If yours does, use action.payload.data instead:
        state.courses = action.payload.data || action.payload;
      })
      // 🔴 When request fails
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch courses";
      });
  },
});

export const { clearCourses } = courseSlice.actions;
export default courseSlice.reducer;
