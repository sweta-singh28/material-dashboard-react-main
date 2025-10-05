import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "signin/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", credentials);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Network Error");
    }
  }
);
