// src/redux/viewCourseDetails/viewCourseDetailsReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchCourseDetails } from "./viewCourseDetailsThunks";

const initialState = {
  course: null,
  teacher: null,
  notes: [],
  loading: false,
  error: null,
};

const viewCourseDetailsSlice = createSlice({
  name: "viewCourseDetails",
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
        state.course = action.payload.course;
        state.teacher = action.payload.teacher;
        state.notes = action.payload.notes;
      })
      .addCase(fetchCourseDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default viewCourseDetailsSlice.reducer;
