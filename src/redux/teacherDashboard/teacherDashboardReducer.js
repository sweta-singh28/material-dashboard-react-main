import { createSlice } from "@reduxjs/toolkit";
import { fetchTeacherCourses } from "./teacherDashboardThunks";

const initialState = {
  teacherData: null, // store the whole object from backend
  loading: false,
  error: null,
};

const teacherDashboardSlice = createSlice({
  name: "teacherDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeacherCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeacherCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.teacherData = action.payload; // store whole object
      })
      .addCase(fetchTeacherCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message || "Failed to fetch teacher data";
      });
  },
});

export default teacherDashboardSlice.reducer;

// Selectors
export const selectTeacherData = (state) => state.teacherDashboard?.teacherData || null;
export const selectTeacherLoading = (state) => state.teacherDashboard?.loading || false;
export const selectTeacherError = (state) => state.teacherDashboard?.error || null;
