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
      const response = await axios.post(
        "https://coursifyserver.onrender.com/api/auth/signup",
        userData
      );
      // dispatch(loginUser({ email: userData.email, password: userData.password }));
      console.log(response.data);
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
      console.log(err);
      return rejectWithValue(err.response?.data || "Network Error");
    }
  }
);
