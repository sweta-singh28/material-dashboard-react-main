import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPendingStudents,
  approveStudent,
  rejectStudent,
} from "./pendingStudentApprovalsThunks";

const pendingStudentApprovalsSlice = createSlice({
  name: "approvals",
  initialState: {
    pendingList: [], // [{id, name, qualifications, course_name}]
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all
    builder
      .addCase(fetchPendingStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingList = action.payload;
      })
      .addCase(fetchPendingStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Approve
    builder
      .addCase(approveStudent.fulfilled, (state, action) => {
        const id = action.payload?.id;
        if (id) {
          state.pendingList = state.pendingList.filter((student) => student.id !== id);
        }
      })
      .addCase(approveStudent.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Reject
    builder
      .addCase(rejectStudent.fulfilled, (state, action) => {
        state.pendingList = state.pendingList.filter((student) => student.id !== action.payload);
      })
      .addCase(rejectStudent.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default pendingStudentApprovalsSlice.reducer;
