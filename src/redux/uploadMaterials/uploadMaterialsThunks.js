import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Upload Assignment
export const uploadAssignment = createAsyncThunk(
  "uploadMaterials/uploadAssignment",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/upload/assignment", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Upload failed");
    }
  }
);

// Upload Notes
export const uploadNotes = createAsyncThunk(
  "uploadMaterials/uploadNotes",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/upload/notes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Upload failed");
    }
  }
);
