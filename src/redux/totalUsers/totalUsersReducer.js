import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./totalUsersThunks";

const initialState = { users: [], loading: false, error: null };

const totalUsersSlice = createSlice({
  name: "totalUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default totalUsersSlice.reducer;
