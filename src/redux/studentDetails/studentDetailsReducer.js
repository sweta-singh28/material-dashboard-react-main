import { createSlice } from "@reduxjs/toolkit";
import { fetchStudentDetails } from "./studentDetailsThunks";

const studentDetailsSlice = createSlice({
  name: "studentDetails",
  initialState: {
    student: null,
    enrolledCourses: [],
    pendingCourses: [],
    subjects: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.student = {
          name: action.payload.name,
          picture: action.payload.picture,
          rollNo: action.payload.rollNo,
          email: action.payload.email,
        };
        state.enrolledCourses = action.payload.enrolledCourses || [];
        state.pendingCourses = action.payload.pendingCourses || [];
        state.subjects = action.payload.subjects || [];
      })
      .addCase(fetchStudentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default studentDetailsSlice.reducer;
