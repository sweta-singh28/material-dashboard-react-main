import { createSlice } from "@reduxjs/toolkit";
import { fetchSubmissions } from "./viewSubmissionsThunks";

const initialState = {
  submissions: [],
  loading: false,
  error: null,
};

const viewSubmissionsSlice = createSlice({
  name: "viewSubmissions",
  initialState,
  reducers: {
    approveSubmission: (state, action) => {
      const id = action.payload;
      state.submissions = state.submissions.map((sub) =>
        sub.submission_id === id ? { ...sub, approval: "approved" } : sub
      );
    },
    markSubmission: (state, action) => {
      const id = action.payload;
      state.submissions = state.submissions.map((sub) =>
        sub.submission_id === id
          ? { ...sub, approval: sub.approval === "marked" ? "pending" : "marked" }
          : sub
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubmissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.submissions = action.payload;
      })
      .addCase(fetchSubmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { approveSubmission, markSubmission } = viewSubmissionsSlice.actions;

export default viewSubmissionsSlice.reducer;
