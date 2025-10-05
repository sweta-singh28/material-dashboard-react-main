import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./signinThunks";

const initialState = {
  loading: false,
  error: null,
  success: false,
  user: null,
};

const signinSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    resetSignin: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetSignin } = signinSlice.actions;
export default signinSlice.reducer;
