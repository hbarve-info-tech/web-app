'use strict';
import _ from "lodash";
import db, { ELEMENTS, CIRCLE_COURSES } from "./setup";

export const getClassroomCourses = ({id, degree, semester, next}, callback) => {
  let query = db.createQuery(CIRCLE_COURSES)
    .filter('circleId', '=', db.key([ELEMENTS, id]))
    .limit(10);

  if(semester) {
    query.filter('semester', '=', semester.toString());
  }
  if(degree) {
    query.filter('degree', '=', degree);
  }
  if(next) {
    query.start(next);
  }

  db.runQuery(query, (err, classroomCourses, info) => {
    if(err) {
      console.error(err);

      return callback({
        statusCode: 500,
        error     : 'Server Error.'
      });
    }

    let keys = classroomCourses.map(course => course.courseId);
    db.get(keys, (err, courses) => {
      if(err) {
        console.error(err);

        return callback({
          statusCode: 500,
          error     : 'Server Error.'
        });
      }

      courses = courses.map(course => {
          let course2 = classroomCourses.find(c => c.courseId.id === course.courseId.id);

          return {
            ...course,
            ...course2,
            circleId: course2.circleId.id,
            courseId: course.courseId.id,
            authorId: course.authorId.id,
          };
        });

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
  });
};
