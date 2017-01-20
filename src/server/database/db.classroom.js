
import db, { ELEMENTS, CIRCLE_COURSES } from './setup';

export const getClassroomCourses = ({ id, degree, semester, next }, callback) => {
  const query = db.createQuery(CIRCLE_COURSES)
    .filter('circleId', '=', db.key([ELEMENTS, id]))
    .limit(10);

  if (semester) {
    query.filter('semester', '=', semester.toString());
  }
  if (degree) {
    query.filter('degree', '=', degree);
  }
  if (next) {
    query.start(next);
  }

  db.runQuery(query, (error1, classroomCourses, info) => {
    if (error1) {
      console.error(error1);

      return callback({
        statusCode: 500,
        error: 'Server Error.',
      });
    }

    const keys = classroomCourses.map(course => course.courseId);
    db.get(keys, (error2, courses) => {
      if (error2) {
        console.error(error2);

        return callback({
          statusCode: 500,
          error: 'Server Error.',
          message: 'Server Error.',
        });
      }

      const payload = courses.map((course) => {
        const course2 = classroomCourses.find(c => c.courseId.id === course.courseId.id);

        return {
          ...course,
          ...course2,
          circleId: course2.circleId.id,
          courseId: course.courseId.id,
          authorId: course.authorId.id,
        };
      });

      const result = {
        statusCode: 200,
        message: 'Success',
        payload,
      };

      if (info.moreResults !== db.NO_MORE_RESULTS) {
        result.next = info.endCursor;
      }

      return callback(result);
    });
  });
};

export default {
  getClassroomCourses,
};
