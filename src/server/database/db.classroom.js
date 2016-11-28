'use strict';
import _ from "lodash";
import db, { ELEMENTS, CIRCLE_COURSES } from "./setup";

export const getClassroomCourses = ({id, degree, semester, next}, callback) => {
  let query = db.createQuery(CIRCLE_COURSES)
    .filter('circleId', '=', db.key([ELEMENTS, id]))
    .limit(50);

  if(semester) {
    query.filter('semester', '=', semester.toString());
  }
  if(degree) {
    query.filter('degree', '=', degree);
  }
  if(next) {
    query.start(next);
  }

  db.runQuery(query, (err, courses, info) => {
    if(err) {
      console.error(err);

      return callback({
        statusCode: 500,
        error     : 'Server Error.'
      });
    }

    courses = courses.map(course => ({
      ...course,
      circleId: course.circleId.id,
      courseId: course.courseId.id
    }));

    let result  = {
      statusCode: 200,
      message   : 'Success',
      payload   : courses
    };

    if (info.moreResults !== db.NO_MORE_RESULTS) {
      result.next = info.endCursor;
    }

    return callback(result);
  });
};
