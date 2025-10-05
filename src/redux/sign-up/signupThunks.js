import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signupUser = createAsyncThunk(
  "signup/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Network Error");
    }
  }
);
