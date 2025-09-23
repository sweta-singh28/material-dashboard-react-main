import { createSlice } from "@reduxjs/toolkit";
import { fetchCourses } from "../totalCourses/totalCoursesThunks";

const initialState = {
  courses: [],
  loading: false,
  error: null,
};

const allCoursesSlice = createSlice({
  name: "allCourses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default allCoursesSlice.reducer;
