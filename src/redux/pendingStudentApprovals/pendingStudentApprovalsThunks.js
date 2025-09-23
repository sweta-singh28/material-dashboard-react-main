import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all pending approvals
export const fetchPendingStudents = createAsyncThunk(
  "approvals/fetchPendingStudents",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/students/pending");
      return res.data; // [{id, name, qualifications, course_name}]
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Approve a student
export const approveStudent = createAsyncThunk(
  "approvals/approveStudent",
  async (studentId, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/api/students/${studentId}/approve`);
      return res.data; // Must include {id} at least
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Reject a student
export const rejectStudent = createAsyncThunk(
  "approvals/rejectStudent",
  async (studentId, { rejectWithValue }) => {
    try {
      await axios.post(`/api/students/${studentId}/reject`);
      return studentId; // Only the ID
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
