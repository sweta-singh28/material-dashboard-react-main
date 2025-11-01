import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "signin/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://coursifyserver.onrender.com//api/auth/signin",
        credentials
      );
      console.log("Login response:", response.data, response);
      localStorage.setItem("token", response.data.token);
      const user = {
        email: response.data.email,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        role: response.data.role,
      };
      localStorage.setItem("user", JSON.stringify(user));
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Network Error");
    }
  }
);
