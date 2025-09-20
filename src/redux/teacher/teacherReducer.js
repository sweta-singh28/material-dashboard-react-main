import { createSlice } from "@reduxjs/toolkit";
import { fetchTeacherDashboard } from "./teacherThunks";

const teacherSlice = createSlice({
  name: "teacher",
  initialState: {
    dashboardData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeacherDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeacherDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardData = action.payload;
      })
      .addCase(fetchTeacherDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default teacherSlice.reducer;
