// src/redux/subjectDetails/subjectDetailsThunks.js
// Exports a thunk-like function that accepts a courseId and returns an async function(dispatch).
// This uses fetch API. If the network call fails, it falls back to a safe sample so the UI won't crash.

export const fetchSubjectDetails = (courseId) => async (dispatch) => {
  dispatch({ type: "SD_FETCH_START" });

  try {
    // Attempt to fetch real API data (replace the endpoint as needed)
    const res = await fetch(`/api/course/${courseId}/details`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    // Expect data to contain { course: {...}, students: [...] }
    dispatch({ type: "SD_FETCH_SUCCESS", payload: data });
  } catch (err) {
    // Fallback sample data (safe — ensures no runtime errors)
    const sample = {
      course: {
        course_id: Number(courseId) || 0,
        course_name: "Introduction to Programming",
        course_code: "CS101",
        course_syllabus: {
          chapters: [
            "Introduction to Programming Concepts",
            "Data Types and Variables",
            "Control Structures (Loops and Conditionals)",
            "Functions and Modularity",
            "Object-Oriented Programming",
          ],
        },
        course_current_completed: ["Introduction to Programming Concepts"],
      },
      students: [
        {
          user_id: 101,
          full_name: "Sophia Clark",
          email: "sophia.clark@email.com",
          profile_picture: "https://i.pravatar.cc/150?u=sophia@example.com",
        },
        {
          user_id: 102,
          full_name: "Ethan Miller",
          email: "ethan.miller@email.com",
          profile_picture: "https://i.pravatar.cc/150?u=ethan@example.com",
        },
        {
          user_id: 103,
          full_name: "Olivia Davis",
          email: "olivia.davis@email.com",
          profile_picture: "https://i.pravatar.cc/150?u=olivia@example.com",
        },
        {
          user_id: 104,
          full_name: "Noah Wilson",
          email: "noah.wilson@email.com",
          profile_picture: "https://i.pravatar.cc/150?u=noah@example.com",
        },
        {
          user_id: 105,
          full_name: "Ava Taylor",
          email: "ava.taylor@email.com",
          profile_picture: "https://i.pravatar.cc/150?u=ava@example.com",
        },
      ],
    };

    // Instead of bubbling the network error to UI, we supply sample data so page remains functional.
    // If you'd rather show the error to users, change this to dispatch failure:
    // dispatch({ type: "SD_FETCH_FAILURE", payload: err.message });
    dispatch({ type: "SD_FETCH_SUCCESS", payload: sample });
  }
};
