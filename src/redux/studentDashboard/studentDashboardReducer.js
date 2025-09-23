import { createSlice } from "@reduxjs/toolkit";
import { fetchStudentDashboard } from "./studentDashboardThunks";

const studentSlice = createSlice({
  name: "student",
  initialState: {
    dashboardData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudentDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardData = action.payload;
      })
      .addCase(fetchStudentDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default studentSlice.reducer;
