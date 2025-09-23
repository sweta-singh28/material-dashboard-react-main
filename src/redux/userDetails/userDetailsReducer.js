// redux/userDetails/userDetailsReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchUserDetails } from "./userDetailsThunks";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    clearUserDetails: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearUserDetails } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
