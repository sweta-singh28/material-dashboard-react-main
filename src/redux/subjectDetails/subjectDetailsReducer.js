// src/redux/subjectDetails/subjectDetailsReducer.js

export const initialState = {
  course: null, // { course_id, course_name, course_code, course_syllabus, course_current_completed, ... }
  students: [], // array of students
  loading: false,
  error: null,
};

export default function subjectDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case "SD_FETCH_START":
      return { ...state, loading: true, error: null };
    case "SD_FETCH_SUCCESS":
      // Expect payload: { course: {...}, students: [...] }
      return {
        ...state,
        loading: false,
        course: action.payload.course ?? null,
        students: Array.isArray(action.payload.students) ? action.payload.students : [],
      };
    case "SD_FETCH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
