// src/redux/activeCourses/activeCoursesReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchActiveCourses } from "./activeCoursesThunks";

const initialState = {
  courses: [],
  loading: false,
  error: null,
};

const activeCoursesSlice = createSlice({
  name: "activeCourses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchActiveCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default activeCoursesSlice.reducer;
