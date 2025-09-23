import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStudentDetails = createAsyncThunk(
  "studentDetails/fetch",
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/student/${studentId}/details`);
      return response.data;
      /*
        Expected response format:
        {
          name: "Sophia Clark",
          picture: "profile.jpg",
          rollNo: 101,
          email: "sophia.clark@email.com",
          enrolledCourses: ["Math 101", "History 202"],
          pendingCourses: ["Science 101"],
          subjects: [
            {
              subjectName: "Math 101",
              pendingAssignments: 2,
              completedAssignments: 5,
              expiredAssignments: 1
            },
            {
              subjectName: "History 202",
              pendingAssignments: 1,
              completedAssignments: 3,
              expiredAssignments: 0
            }
          ]
        }
      */
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
