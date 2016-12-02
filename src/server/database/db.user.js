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
  let query = db.createQuery(ELEMENTS)
    .filter('username', '=', payload.username)
    .limit(1);

  db.runQuery(query, (err, result) => {
    if(err) {
      console.log(err);

      return callback({
        statusCode: 500,
        error: 'server error.'
      });
    }

    if(result.length !== 0){
      return callback({
        statusCode: 200,
        message   : 'username taken.'
      });
    }

    let key = db.key(ELEMENTS);

    db.allocateIds(key, 1, (err, result1) => {
      if(err) {
        console.log(err);

        return callback({
          statusCode: 500,
          error     : 'Server error.'
        });
      }

      payload.id       = db.key([ELEMENTS, result1[0].id]);
      payload.password = crypto.createHash('sha256').update(payload.password).digest('hex');
      payload.valid    = true;
      payload.elementType = 'user';
      let newUser = {
        key  : payload.id,
        data : payload
      };

      db.save(newUser, (err, result2) => {
        if(err) {
          console.log(err);

          return callback({
            statusCode: 500,
            error     : 'Server error.'
          });
        }

        return callback({
          statusCode: 200,
          message   : 'Success',
          payload   : payload
        });
      });
    });
  });
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
