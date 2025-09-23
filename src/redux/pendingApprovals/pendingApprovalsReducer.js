// src/redux/pendingApprovals/pendingApprovalsReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchPendingCourses } from "./pendingApprovalsThunks";

const initialState = {
  pendingCourses: [],
  loading: false,
  error: null,
};

const pendingApprovalsSlice = createSlice({
  name: "pendingApprovals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPendingCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingCourses = action.payload;
      })
      .addCase(fetchPendingCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default pendingApprovalsSlice.reducer;
