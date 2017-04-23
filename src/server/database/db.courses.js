
import db, { ELEMENTS, COURSES, MODULES } from './setup';

export const getCourseByCourseId = (courseId, callback) => {
  db.get(db.key([COURSES, courseId]), (error, course) => {
    if (error) {
      console.log(error);

      return callback({
        statusCode: 500,
        error: 'Database server error.',
        message: 'Database server error.',
      });
    }

    if (course) {
      return callback({
        statusCode: 200,
        message: 'Success',
        payload: { ...course, authorId: course.authorId.id, courseId: course.courseId.id },
      });
    }

    return callback({
      statusCode: 404,
      message: 'Course does not exists.',
    });
  });
};

export const getCoursesById = (id, callback) => {
  const query = db.createQuery(COURSES)
    .filter('authorId', '=', db.key([ELEMENTS, id]));

  db.runQuery(query, (error, courses) => {
    if (error) {
      console.log(error);

      return callback({
        statusCode: 500,
        error: 'Database server error.',
        message: 'Database server error.',
      });
    }

    return callback({
      statusCode: 200,
      message: 'Success',
      payload: courses.map(c => ({ ...c, courseId: c.courseId.id, authorId: c.authorId.id })),
    });
  });
};

export const createCourseById = (id, payload, callback) => {
  db.allocateIds(db.key(COURSES), 1, (error1, keys) => {
    if (error1) {
      console.log(error1);

      return callback({
        statusCode: 500,
        error: 'Server Error.',
      });
    }

    const key = db.key([COURSES, keys[0].id]);
    const authorId = id;
    const courseId = key.id;

    const data = { ...payload, authorId: db.key([ELEMENTS, id]), courseId: key };

    const timestamp = (new Date());
    data.timestamp = timestamp.toString();

    db.save({ key, data }, (error2) => {
      if (error2) {
        console.log(error2);

        return callback({
          statusCode: 500,
          error: 'Database server error.',
          message: 'Database server error.',
        });
      }

      return callback({
        statusCode: 201,
        message: 'Success',
        payload: { authorId, courseId },
      });
    });
  });
};

export const updateCourseByCourseId = (courseId, payload, callback) => {
  const key = db.key([COURSES, courseId]);

  db.get(key, (error1, course) => {
    if (error1) {
      console.log(error1);

      return callback({
        statusCode: 500,
        error: 'Server error',
      });
    }

    if (!course) {
      return callback({
        statusCode: 404,
        error: "Course doesn't exists.",
        message: "Course doesn't exists.",
      });
    }

    const data = { ...course, ...payload };

    db.save({ key, data }, (error2) => {
      if (error2) {
        console.log(error2);

        return callback({
          statusCode: 500,
          error: 'Server error',
        });
      }

      return callback({
        statusCode: 200,
        message: 'Update successfully.',
      });
    });
  });
};


export const getModulesByCourseId = (courseId, callback) => {
  const query = db.createQuery(MODULES)
    .filter('courseId', '=', db.key([COURSES, courseId]));

  db.runQuery(query, (error, modules) => {
    if (error) {
      console.log(error);

      return callback({
        statusCode: 500,
        error: 'Database server error.',
        message: 'Database server error.',
      });
    }

    return callback({
      statusCode: 200,
      message: 'Success',
      payload: modules.map(m => ({ ...m, courseId: m.courseId.id, moduleId: m.moduleId.id })),
    });
  });
};

export const getModuleByModuleId = (courseId, moduleId, callback) => {
  db.get(db.key([MODULES, moduleId]), (error, module) => {
    if (error) {
      console.log(error);

      return callback({
        statusCode: 500,
        error: 'Database server error.',
        message: 'Database server error.',
      });
    }

    if (!module) {
      return callback({
        statusCode: 404,
        message: 'Module does not exists.',
      });
    }

    return callback({
      statusCode: 200,
      message: 'Success',
      payload: { ...module, courseId: module.courseId.id, moduleId: module.moduleId.id },
    });
  });
};

export const createModuleByCourseId = (courseId, payload, callback) => {
  db.allocateIds(db.key(MODULES), 1, (err, keys) => {
    if (err) {
      console.log(err);

      return callback({
        statusCode: 500,
        error: 'Server Error.',
      });
    }

    const key = db.key([MODULES, keys[0].id]);
    const timestamp = (new Date());
    const data = {
      ...payload,
      courseId: db.key([COURSES, courseId]),
      moduleId: key,
      timestamp: timestamp.toString(),
    };

    db.save({ key, data }, (error) => {
      if (error) {
        console.log(error);

        return callback({
          statusCode: 500,
          error: 'Database server error.',
          message: 'Database server error.',
        });
      }

      return callback({
        statusCode: 200,
        message: 'Success',
        payload: { ...data, courseId, moduleId: key.id },
      });
    });
  });
};

export const updateModuleByModuleId = (moduleId, payload, callback) => {
  const key = db.key([MODULES, moduleId]);

  db.get(key, (error1, module) => {
    if (error1) {
      console.log(error1);

      return callback({
        statusCode: 500,
        error: 'Server error',
      });
    }

    if (!module) {
      return callback({
        statusCode: 404,
        error: "Course doesn't exists.",
        message: "Course doesn't exists.",
      });
    }

    const data = { ...module, ...payload };

    db.save({ key, data }, (error2) => {
      if (error2) {
        console.log(error2);

        return callback({
          statusCode: 500,
          error: 'Server error',
        });
      }

      return callback({
        statusCode: 200,
        message: 'Update successfully.',
      });
    });
  });
};

export const deleteModuleByModuleId = (moduleId, callback) => {
  db.delete(db.key([MODULES, moduleId]), (err, result) => {
    if (err) {
      console.log(err);

      return callback({
        statusCode: 500,
        error: 'server error',
      });
    }

    if (result.indexUpdates === 0) {
      return callback({
        statusCode: 404,
        error: 'Module Not found.',
      });
    }

    return callback({
      statusCode: 200,
      message: 'Successfully deleted.',
    });
  });
};


export const deleteCourseByCourseId = (courseId, callback) => {
  const key = db.key([COURSES, courseId]);

  db.delete(key, (error, result) => {
    if (error) {
      console.log(error);

      return callback({
        statusCode: 500,
        error: 'Server error',
      });
    }

    if (result.indexUpdates === 0) {
      return callback({
        statusCode: 404,
        error: 'Course Not found.',
      });
    }

    return callback({
      statusCode: 200,
      message: 'Update successfully.',
    });
  });

  // Delete all the modules of this course.
  const query = db.createQuery(MODULES)
    .filter('courseId', '=', key)
    .select('moduleId');

  db.runQuery(query, (error, modules) => {
    if (error) {
      console.log(error);
    }

    modules.map(module => deleteModuleByModuleId(module.moduleId.id));
  });
};
