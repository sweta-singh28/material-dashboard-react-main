// src/redux/addNewCourse/thunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// POST /api/course/add
export const addNewCourse = createAsyncThunk(
  "addNewCourse/add",
  async (courseData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/course/add", courseData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
