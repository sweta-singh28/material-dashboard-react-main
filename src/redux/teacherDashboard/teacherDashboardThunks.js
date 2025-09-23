// redux/teacherDashboard/teacherDashboardThunks.js

export const fetchTeacherCourses = (allCourses, teacherId) => async (dispatch) => {
  dispatch({ type: "TD_FETCH_START" });

  try {
    // Simulate async operation (replace with real API later)
    await new Promise((resolve) => setTimeout(resolve, 0));

    const courses = (Array.isArray(allCourses) ? allCourses : [])
      .filter((c) => c.teachers_user_id === teacherId)
      .map((c) => {
        const activeCount = Array.isArray(c.course_active_students)
          ? c.course_active_students.length
          : 0;
        const pendingCount = Array.isArray(c.course_pending_students)
          ? c.course_pending_students.length
          : 0;

        return {
          id: c.idCourses,
          name: c.course_name,
          students: activeCount,
          pending: pendingCount,
        };
      });

    dispatch({ type: "TD_FETCH_SUCCESS", payload: courses });
  } catch (err) {
    dispatch({
      type: "TD_FETCH_FAILURE",
      payload: err?.message ?? String(err),
    });
  }
};
