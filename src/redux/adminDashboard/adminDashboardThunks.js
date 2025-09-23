// adminDashboardThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch stats for Admin Dashboard
export const fetchAdminStats = createAsyncThunk("admin/fetchStats", async () => {
  const response = await axios.get("/api/admin/stats");
  return response.data;
});
