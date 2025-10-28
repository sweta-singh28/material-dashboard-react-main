// src/redux/assignments/assignmentsReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchAssignments } from "./assignmentThunks";

const initialState = {
  assignments: [], // <-- single array for fetched assignments
  loading: false,
  error: null,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    // You can add local reducers here if needed (e.g., for filtering, sorting, etc.)
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssignments.fulfilled, (state, action) => {
        state.loading = false;
        // Since backend returns a plain array of assignment objects
        state.assignments = action.payload || [];
      })
      .addCase(fetchAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Failed to load assignments";
      });
  },
});

export default assignmentsSlice.reducer;
