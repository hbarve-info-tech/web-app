
import * as api from '../api';
import { fetchCoursesStart, fetchCoursesError, fetchCoursesSuccess } from './courses';

export const CLASSROOM_COURSES_FETCH = 'CLASSROOM_COURSES_FETCH';
export const CLASSROOM_COURSES_FETCH_START = 'CLASSROOM_COURSES_FETCH_START';
export const CLASSROOM_COURSES_FETCH_SUCCESS = 'CLASSROOM_COURSES_FETCH_SUCCESS';
export const CLASSROOM_COURSES_FETCH_ERROR = 'CLASSROOM_COURSES_FETCH_ERROR';


const fetchClassroomCoursesStart = payload => ({ type: CLASSROOM_COURSES_FETCH_START, payload });
const fetchClassroomCoursesSuccess = p => ({ type: CLASSROOM_COURSES_FETCH_SUCCESS, payload: p });
const fetchClassroomCoursesError = payload => ({ type: CLASSROOM_COURSES_FETCH_ERROR, payload });
export const fetchClassroomCourses = ({ id, token }) => (dispatch) => {
  dispatch(fetchClassroomCoursesStart({ id }));
  dispatch(fetchCoursesStart({ id }));

  api.getClassroomCourses({ id, token }, (json) => {
    if (json.statusCode === 200) {
      dispatch(fetchClassroomCoursesSuccess(json.payload));
      dispatch(fetchCoursesSuccess(json.payload));
    }
    else if (json.statusCode >= 400) {
      dispatch(fetchClassroomCoursesError(json));
      dispatch(fetchCoursesError(json));
    }
  });
};
