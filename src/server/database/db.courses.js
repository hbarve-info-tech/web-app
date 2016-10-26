'use strict';
import db, { ELEMENTS, ARTICLES, COURSES, MODULES } from "./setup";

export const getCourseByCourseId    = (courseId, callback) => {

  let key = db.key([COURSES, courseId]);

  db.get(key, (error, success) => {
    if(error) {
      console.log(error);

      return callback({
        statusCode: 500,
        error     : 'Database server error.',
        message   : 'Database server error.'
      });
    }

    if(success) {
      return callback({
        statusCode: 200,
        message   : 'Success',
        payload   : success
      });
    }

    return callback({
      statusCode: 404,
      message   : 'Course does not exists.'
    });
  });
};

export const getCoursesById         = (id, callback) => {
  let query = db.createQuery(COURSES)
    .filter('authorId', '=', db.key([ELEMENTS, id]));

  db.runQuery(query, (error, success) => {
    if(error) {
      console.log(error);

      return callback({
        statusCode: 500,
        error     : 'Database server error.',
        message   : 'Database server error.'
      });
    }

    if(success.length !== 0) {
      return callback({
        statusCode: 200,
        message   : 'Success',
        payload   : success
      });
    }

    return callback({
      statusCode: 404,
      message   : 'Courses does not exists.'
    });
  });
};

export const createCourseById       = (id, payload, callback) => {
  payload.authorId = db.key([ELEMENTS, id]);
  db.save({
    key : db.key(COURSES),
    data: payload
  }, (error, success) => {
    if(error) {
      console.log(error);

      return callback({
        statusCode: 500,
        error     : 'Database server error.',
        message   : 'Database server error.'
      });
    }

    return callback({
      statusCode: 200,
      message   : 'Success',
      payload   : payload
    });
  });
};

export const updateCourseByCourseId = (courseId, payload, callback) => {
  let transaction = db.transaction();

  transaction.run((err) => {
    if(err) {
      return callback({
        statusCode : 500,
        error      : 'Server error'
      });
    }
    let key = db.key([COURSES, courseId]);

    transaction.get(key, (err, data) => {
      if(err) {
        return callback({
          statusCode : 500,
          error      : 'Server error'
        });
      }

      if(!data) {
        return callback({
          statusCode: 404,
          error     : "Course doesn\'t exists."
        });
      }

      data = Object.assign({}, data, payload);

      transaction.save({
        key  : key,
        data : data
      });

      transaction.commit((err) => {
        if(err) {
          return callback({
            statusCode : 500,
            error      : 'Server error'
          });
        }

        return callback({
          statusCode : 200,
          message    : 'Update successfully.'
        });
      })
    });
  });
};

export const deleteCourseByCourseId = (courseId, callback) => {
  let transaction = db.transaction();

  transaction.run((err) => {
    if(err) {
      return callback({
        statusCode : 500,
        error      : 'Server error'
      });
    }
    let key = db.key([COURSES, courseId]);

    transaction.delete(key, (err, result) => {
      if(err) {
        return callback({
          statusCode : 500,
          error      : 'Server error'
        });
      }

      if(result.indexUpdates === 0) {
        return callback({
          statusCode: 404,
          error     : 'Course Not found.'
        });
      }

      transaction.commit((err) => {
        if(err) {
          return callback({
            statusCode : 500,
            error      : 'Server error'
          });
        }

        return callback({
          statusCode : 200,
          message    : 'Update successfully.'
        });
      });
    });
  });
};



export const getModulesByCourseId   = (courseId, callback) => {
  let query = db.createQuery(MODULES)
    .filter('courseId', '=', db.key([COURSES, courseId]));

  db.runQuery(query, (error, success) => {
    if(error) {
      console.log(error);

      return callback({
        statusCode: 500,
        error     : 'Database server error.',
        message   : 'Database server error.'
      });
    }

    if(success.length !== 0) {
      return callback({
        statusCode: 200,
        message   : 'Success',
        payload   : success
      });
    }

    return callback({
      statusCode: 404,
      message   : 'Modules does not exists.'
    });
  });
};

export const getModuleByModuleId    = (moduleId, callback) => {
  db.get(db.key([MODULES, moduleId]), (error, success) => {
    if(error) {
      console.log(error);

      return callback({
        statusCode: 500,
        error     : 'Database server error.',
        message   : 'Database server error.'
      });
    }

    if(success) {
      return callback({
        statusCode: 200,
        message   : 'Success',
        payload   : success
      });
    }

    return callback({
      statusCode: 404,
      message   : 'Module does not exists.'
    });
  });
};

export const createModuleByCourseId = (courseId, payload, callback) => {
  let transaction = db.transaction();

  transaction.run((err) => {
    if(err) {
      return callback({
        statusCode : 500,
        error      : 'Server error'
      });
    }
    let key = db.key([COURSES, courseId]);

    transaction.get(key, (err, data) => {
      if(err) {
        return callback({
          statusCode : 500,
          error      : 'Server error'
        });
      }

      if(!data) {
        return callback({
          statusCode: 404,
          error     : 'Course does not exist.'
        });
      }

      payload.courseId = db.key([COURSES, courseId]);
      transaction.save({
        key : db.key(MODULES),
        data: payload
      });

      transaction.commit((err) => {
        if(err) {
          return callback({
            statusCode : 500,
            error      : 'Server error'
          });
        }

        return callback({
          statusCode : 200,
          message    : 'Module Created Successfully.'
        });
      });
    });

  });
};

export const updateModuleByModuleId = (moduleId, payload, callback) => {
  let transaction = db.transaction();

  transaction.run((err) => {
    if(err) {
      return callback({
        statusCode : 500,
        error      : 'Server error'
      });
    }
    let key = db.key([MODULES, moduleId]);

    transaction.get(key, (err, data) => {
      if(err) {
        return callback({
          statusCode : 500,
          error      : 'Server error'
        });
      }

      data = Object.assign(
        {},
        data,
        payload
      );

      transaction.save({
        key : key,
        data : data
      });

      transaction.commit((err) => {
        if(err) {
          return callback({
            statusCode : 500,
            error      : 'Server error'
          });
        }

        return callback({
          statusCode : 200,
          message    : 'Update successfully.'
        });
      });
    });
  });
};

export const deleteModuleByModuleId = (moduleId, callback) => {
  let key = db.key([MODULES, moduleId]);

  db.delete(key, (err, result) => {
    if(err) {
      console.log(err);

      return callback({
        statusCode: 500,
        error     : 'server error'
      });
    }

    if(result.indexUpdates === 0) {
      return callback({
        statusCode: 404,
        error     : 'Module Not found.'
      });
    }

    return callback({
      statusCode: 200,
      message   : 'Successfully deleted.'
    });
  });
};
