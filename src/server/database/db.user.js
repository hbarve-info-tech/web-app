'use strict';
import crypto from "crypto";

import db, { ELEMENTS } from "./setup";

export const validateUsername  = (username, callback) => {
  let query = db.createQuery(ELEMENTS).filter('username', '=', username);

  db.runQuery(query, (error, success) => {
    if(error) {
        console.log(error);

        return callback({
          statusCode: 500,
          error     : 'Database server error.',
          message   : 'Database server error.'
        });
      }

      if(success.length === 1) {
        return callback({
          statusCode: 200,
          error     : 'Username Taken',
          message   : 'Username is already taken.',
          payload   : {
            usernameValid: false
          }
        });
      }

      if(success.length > 1) {
        return callback({
          statusCode: 500,
          error     : 'Server error',
          message   : 'The server encountered an unexpected condition which ' +
          'prevented it from fulfilling the request.'
        });
      }

      return callback({
        statusCode: 200,
        message   : 'Username is valid.',
        payload   : {
          usernameValid : true
        }
      });
  });
};

export const getUserById       = (id,       callback) => {
  let key = db.key([ELEMENTS, parseInt(id, 10)]);
  db.get(key, function (error, result) {
    if(error) {
      console.log(error);

      return callback({
        statusCode: 500,
        error     : 'Database server error.',
        message   : 'Database server error.'
      });
    }

    if(!result) {
      return callback({
        statusCode: 404,
        message   : 'User does not exists.'
      });
    }

    delete result['password'];
    result.id = id;
    return callback({
      statusCode: 200,
      message   : 'Success',
      payload   : result
    });
  });
};
export const getUserByUsername = (username, callback) => {
  let query = db.createQuery(ELEMENTS).filter('username', '=', username);

  db.runQuery(query, (error, success) => {
    if(error) {
      console.log(error);

      return callback({
        statusCode: 500,
        error     : 'Database server error.',
        message   : 'Database server error.'
      });
    }

    if(success.length === 0) {
      return callback({
        statusCode: 404,
        error     : 'User does not exists.',
        message   : 'User does not exists.'
      });
    }

    if(success[0].password) {
      delete success[0].password;
    }

    return callback({
      statusCode: 200,
      message   : 'Successful.',
      payload   : success[0]
    });
  });
};

export const signInById        = (id,       callback) => {
  let key = db.key([ELEMENTS, parseInt(id, 10)]);

  db.get(key, (err, result) => {
    if(err) {
      console.log(err);

      return callback({
        statusCode: 500,
        error     : 'Database server error.',
        message   : 'Database server error.'
      });
    }

    if(!result) {
      return callback({
        statusCode: 404,
        message   : 'User does not exists.'
      });
    }

    return callback({
      statusCode: 200,
      message   : 'Success',
      payload   : result
    });
  });
};
export const signInByUsername  = (username, callback) => {
  let query = db.createQuery(ELEMENTS).filter('username', '=', username);

  db.runQuery(query, (err, result) => {
    if(err) {
      console.log(err);

      return callback({
        statusCode: 500,
        error     : 'Database server error.',
        message   : 'Database server error.'
      });
    }

    if(result.length === 0) {
      return callback({
        statusCode: 404,
        error     : 'User does not exists.',
        message   : 'User does not exists.'
      });
    }

    return callback({
      statusCode: 200,
      message   : 'Successful.',
      payload   : result[0]
    });
  });
};

export const createUser        = (payload, callback) => {
  if(typeof payload.username === 'string' && typeof payload.password === 'string') {
    validateUsername(payload.username, (result) => {
      if(typeof result.error === "string") {
        return callback(result);
      }

      payload.password = crypto.createHash('sha256').update(payload.password).digest('hex');
      payload.valid    = true;
      payload.elementType = 'user';
      let temp = {
        key  : db.key(ELEMENTS),
        data : payload
      };

      db.save(temp, (error, result) => {
        if(error) {
          console.error(error);

          return callback({
            statusCode: 500,
            error     : 'Database server error',
            message   : 'Database server error'
          });
        }

        return callback({
          statusCode: 201,
          message   : 'Successfully created user.'
        });
      });
    });
  }
  else {
    return callback({
      statusCode: 400,
      error     : 'Username and password are required'
    });
  }
};

export const updateUserById    = (id, payload, callback) => {
  return callback({
    statusCode: 503,
    error     : 'Service is not available.',
    message   : 'This is not working right now.'
  });
};

export const deleteUserById    = (id, callback) => {
  let key = db.key([ELEMENTS, parseInt(id, 10)]);
  db.delete(key, (err, result) => {
    if(err) {
      console.log(err);

      return callback({
        statusCode: 500,
        error     : 'Database server error.',
        message   : 'Database server error.'
      });
    }

    return callback({
      statusCode: 200,
      message   : 'Successfully deleted.'
    })
  });
};
