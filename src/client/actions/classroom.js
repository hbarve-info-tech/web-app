
import api from '../api/classrooms';
import { getCoursesStart, getCoursesError, getCoursesSuccess } from './courses';

import {
  CLASSROOM_COURSES_GET_START, CLASSROOM_COURSES_GET_ERROR, CLASSROOM_COURSES_GET_SUCCESS,
} from '../constants/classroom';


const getClassroomCoursesStart = payload => ({ type: CLASSROOM_COURSES_GET_START, payload });
const getClassroomCoursesSuccess = p => ({ type: CLASSROOM_COURSES_GET_SUCCESS, payload: p });
const getClassroomCoursesError = payload => ({ type: CLASSROOM_COURSES_GET_ERROR, payload });
export const getClassroomCourses = ({ id, token }) => (dispatch) => {
  dispatch(getClassroomCoursesStart({ id }));
  dispatch(getCoursesStart({ id }));

  api.getClassroomCourses({ id, token }, (json) => {
    if (json.statusCode === 200) {
      dispatch(getClassroomCoursesSuccess(json.payload));
      dispatch(getCoursesSuccess(json.payload));
    }
    else if (json.statusCode >= 400) {
      dispatch(getClassroomCoursesError(json));
      dispatch(getCoursesError(json));
    }
  });
};

export default {
  getClassroomCourses,
};
