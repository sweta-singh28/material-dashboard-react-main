// src/redux/completedCourses/completedCoursesReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchCompletedCourses } from "./completedCoursesThunks";

const initialState = {
  courses: [],
  loading: false,
  error: null,
};

const completedCoursesSlice = createSlice({
  name: "completedCourses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompletedCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompletedCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCompletedCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default completedCoursesSlice.reducer;
