// src/redux/addNewCourse/reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { addNewCourse } from "./addNewCourseThunks";

const initialState = {
  success: false,
  loading: false,
  error: null,
};

const addNewCourseSlice = createSlice({
  name: "addNewCourse",
  initialState,
  reducers: {
    resetCourseState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addNewCourse.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addNewCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
      });
  },
});

export const { resetCourseState } = addNewCourseSlice.actions;
export default addNewCourseSlice.reducer;
