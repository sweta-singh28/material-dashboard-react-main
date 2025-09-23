// redux/teacherDashboard/teacherDashboardReducer.js

export const initialState = {
  courses: [],
  loading: false,
  error: null,
};

export default function teacherDashboardReducer(state = initialState, action) {
  switch (action.type) {
    case "TD_FETCH_START":
      return { ...state, loading: true, error: null };
    case "TD_FETCH_SUCCESS":
      return { ...state, loading: false, courses: action.payload };
    case "TD_FETCH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
