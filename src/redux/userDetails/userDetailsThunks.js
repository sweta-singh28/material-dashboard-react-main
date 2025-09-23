import { createAsyncThunk } from "@reduxjs/toolkit";

// ----- JSON Data inside thunk -----
const usersJSON = {
  users: [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "student",
      profilePicture: "",
      avatar: "",
      qualifications: "B.Sc Computer Science",
      contact: "1234567890",
      joined: "2022-05-15T10:00:00Z",
      currentlyEnrolled: [
        {
          id: 101,
          title: "Mathematics 101",
          code: "MATH101",
          instructor: "Dr. Smith",
          status: "ongoing",
        },
      ],
      completedEnrolled: [
        { id: 102, title: "Physics 101", code: "PHY101", grade: "A", status: "completed" },
      ],
      rejectedCourses: [
        {
          id: 103,
          title: "Chemistry 101",
          code: "CHEM101",
          reason: "Failed prerequisite",
          status: "rejected",
        },
      ],
      courses: [],
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "teacher",
      profilePicture: "",
      avatar: "",
      qualifications: "M.Sc Physics",
      contact: "9876543210",
      joined: "2021-08-20T09:00:00Z",
      currentlyTeaching: [
        { id: 201, title: "Physics 101", code: "PHY101", studentsEnrolled: 30, status: "ongoing" },
      ],
      completedTeaching: [
        { id: 202, title: "Mathematics 101", code: "MATH101", year: 2022, status: "completed" },
      ],
      rejectedTeaching: [
        {
          id: 203,
          title: "Biology 101",
          code: "BIO101",
          reason: "Cancelled course",
          status: "rejected",
        },
      ],
      teachingCourses: [],
    },
  ],
};

// ----- Thunk -----
export const fetchUserDetails = createAsyncThunk(
  "userDetails/fetchUserDetails",
  async (id, thunkAPI) => {
    try {
      const user = usersJSON.users.find((u) => String(u.id) === String(id));
      if (!user) throw new Error("User not found");
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
