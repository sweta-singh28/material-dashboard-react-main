import { createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch courses (replace the URL with your real API endpoint)
export const fetchCourses = createAsyncThunk("totalCourses/fetchCourses", async () => {
  // Example: fetch from API
  // const response = await fetch("/api/courses");
  // const data = await response.json();
  // return data;

  // Temporary: simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]); // Return empty array by default; Redux will handle it
    }, 500);
  });
});
