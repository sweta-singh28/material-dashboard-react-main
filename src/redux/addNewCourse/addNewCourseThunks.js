// src/redux/addNewCourse/thunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// POST /api/course/add
export const addNewCourse = createAsyncThunk(
  "addNewCourse/add",
  async (courseData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://coursifyserver.onrender.com/api/teacher/addnewcourse",
        courseData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
