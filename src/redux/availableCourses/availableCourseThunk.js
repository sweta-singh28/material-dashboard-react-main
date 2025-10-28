// src/redux/thunks/courseThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (_, { rejectWithValue, getState }) => {
    try {
      // ✅ Get token (assuming it's stored in Redux or localStorage)
      const token = getState()?.auth?.token || localStorage.getItem("token");

      // ✅ Axios automatically throws for non-2xx responses — no need for `response.ok`
      const response = await axios.get("http://localhost:5000/api/student/courses/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched courses response:", response);

      // ✅ `response.data` already contains the JSON
      return response;
    } catch (error) {
      console.error("Error fetching courses:", error);

      // ✅ Handle Axios error properly
      const message = error.response?.data?.message || error.message || "Something went wrong";

      return rejectWithValue(message);
    }
  }
);
