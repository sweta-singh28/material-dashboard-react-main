import { createSlice } from "@reduxjs/toolkit";
import { signupUser } from "./signupThunks";

const initialState = {
  loading: false,
  error: null,
  success: false,
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    resetSignup: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetSignup } = signupSlice.actions;
export default signupSlice.reducer;
