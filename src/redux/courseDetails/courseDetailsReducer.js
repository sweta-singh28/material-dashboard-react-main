// src/redux/courseDetails/courseDetailsReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchCourseDetails } from "./courseDetailsThunks";

const initialState = {
  course: null,
  loading: false,
  error: null,
};

const courseDetailsSlice = createSlice({
  name: "courseDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.course = action.payload;
      })
      .addCase(fetchCourseDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default courseDetailsSlice.reducer;
