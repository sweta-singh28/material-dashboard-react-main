// thunk.js
// Async thunk to fetch students list. Uses axios - adapt the URL to your backend.

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStudents = createAsyncThunk(
  "studentsRegister/fetchStudents",
  async (_, { rejectWithValue }) => {
    try {
      // replace this endpoint with your real API endpoint
      const res = await axios.get("/api/students");
      // expect an array of student objects like your earlier hardcoded data
      return res.data;
    } catch (err) {
      // normalize error payload
      const message = err.response?.data?.message || err.message || "Failed to fetch students";
      return rejectWithValue(message);
    }
  }
);
