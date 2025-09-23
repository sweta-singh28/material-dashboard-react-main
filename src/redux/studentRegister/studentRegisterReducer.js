// reducer.js
// Slice for the student register. Exports selector helpers used in the component.

import { createSlice } from "@reduxjs/toolkit";
import { fetchStudents } from "./studentRegisterThunks";

const initialState = {
  students: [], // array of student objects
  loading: false,
  error: null,
};

const studentsRegisterSlice = createSlice({
  name: "studentsRegister",
  initialState,
  reducers: {
    // add reducers here if you need local updates (approve/reject etc.)
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        // Ensure we store an array; backend might return { students: [...] } or [...]
        state.students = Array.isArray(action.payload)
          ? action.payload
          : action.payload?.students || [];
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message || "Failed to fetch students";
      });
  },
});

export default studentsRegisterSlice.reducer;

// Selectors used in the component
export const selectStudents = (state) => state.studentsRegister?.students || [];
export const selectStudentsLoading = (state) => state.studentsRegister?.loading || false;
export const selectStudentsError = (state) => state.studentsRegister?.error || null;
