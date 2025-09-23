// src/redux/studentDashboard/studentDashboardReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchStudentDashboard } from "./studentDashboardThunks";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const studentDashboardSlice = createSlice({
  name: "studentDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStudentDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default studentDashboardSlice.reducer;
