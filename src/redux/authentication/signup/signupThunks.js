import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { loginUser } from "../signin/signinThunks";
// import { useDispatch } from "react-redux";
export const signupUser = createAsyncThunk(
  "signup/signupUser",
  async (userData, { rejectWithValue }) => {
    // const dispatch = useDispatch();
    try {
      console.log("Signing up user with data:", userData);
      const response = await axios.post("http://localhost:5000/api/auth/signup", userData);
      // dispatch(loginUser({ email: userData.email, password: userData.password }));
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response?.data || "Network Error");
    }
  }
);
