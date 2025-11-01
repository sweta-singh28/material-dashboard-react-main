// thunk.js
// Async thunk to fetch students list. Uses axios - adapt the URL to your backend.

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStudents = createAsyncThunk(
  "studentsRegister/fetchStudents",
  // 1. 'getState' is no longer needed here
  async (_, { rejectWithValue }) => {
    try {
      // 2. Get the token directly from localStorage
      // !!! IMPORTANT: Change "token" if you use a different key !!!
      const token = localStorage.getItem("token");

      if (!token) {
        return rejectWithValue("Authentication token not found in localStorage.");
      }

      // 3. Create the axios config object with the Authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // 4. Make the request with the new URL and the config
      const res = await axios.get(
        "https://coursifyserver.onrender.com/teacher/getStudents",
        config
      );

      // expect an array of student objects
      return res.data;
    } catch (err) {
      // normalize error payload
      const message = err.response?.data?.message || err.message || "Failed to fetch students";
      return rejectWithValue(message);
    }
  }
);
