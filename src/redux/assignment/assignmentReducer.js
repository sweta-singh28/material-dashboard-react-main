// src/redux/assignments/assignmentsReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchAssignments } from "./assignmentThunks";

const initialState = {
  users: [],
  courses: [],
  assignmentNotes: [],
  submittedAssignments: [],
  userCourses: [],
  loading: false,
  error: null,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    // you can add reducers here later if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssignments.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload || {};
        state.users = payload.users || [];
        state.courses = payload.courses || [];
        state.assignmentNotes = payload.assignmentNotes || [];
        state.submittedAssignments = payload.submittedAssignments || [];
        state.userCourses = payload.userCourses || [];
      })
      .addCase(fetchAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Failed to load assignments";
      });
  },
});

export default assignmentsSlice.reducer;
