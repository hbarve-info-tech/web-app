
import crypto from 'crypto';

import db, { ELEMENTS } from './setup';

export const validateUsername = (username, callback) => {
  const query = db.createQuery(ELEMENTS)
    .filter('username', '=', username);

  db.runQuery(query, (error, success) => {
    if (error) {
      console.log(error);

      return callback({
        statusCode: 500,
        error: 'Database server error.',
        message: 'Database server error.',
      });
    }

    if (success.length === 1) {
      return callback({
        statusCode: 200,
        error: 'Username Taken',
        message: 'Username is already taken.',
        payload: {
          usernameValid: false,
        },
      });
    }

    if (success.length > 1) {
      return callback({
        statusCode: 500,
        error: 'Server error',
        message: 'The server encountered an unexpected condition which ' +
          'prevented it from fulfilling the request.',
      });
    }

    return callback({
      statusCode: 200,
      message: 'Username is valid.',
      payload: {
        usernameValid: true,
      },
    });
  });
};

export const getUserById = (id, callback) => {
  db.get(db.key([ELEMENTS, parseInt(id, 10)]), (error, user) => {
    if (error) {
      console.log(error);

      return callback({
        statusCode: 500,
        error: 'Database server error.',
        message: 'Database server error.',
      });
    }

    if (!user) {
      return callback({
        statusCode: 404,
        message: 'User does not exists.',
      });
    }

    const payload = { ...user, id: user.id.id };
    delete payload.password;

    return callback({
      statusCode: 200,
      message: 'Success',
      payload,
    });
  });
};

export const getUserByUsername = (username, callback) => {
  const query = db.createQuery(ELEMENTS)
    .filter('username', '=', username);

  db.runQuery(query, (error, users) => {
    if (error) {
      console.log(error);

      return callback({
        statusCode: 500,
        error: 'Database server error.',
        message: 'Database server error.',
      });
    }

    if (users.length === 0) {
      return callback({
        statusCode: 404,
        error: 'User does not exists.',
        message: 'User does not exists.',
      });
    }

    const payload = { ...users[0], id: users[0].id };
    if (payload.password) {
      delete payload.password;
    }

    return callback({
      statusCode: 200,
      message: 'Successful.',
      payload,
    });
  });
};

export const signInById = (id, callback) => {
  db.get(db.key([ELEMENTS, parseInt(id, 10)]), (error, user) => {
    if (error) {
      console.log(error);

      return callback({
        statusCode: 500,
        error: 'Database server error.',
        message: 'Database server error.',
      });
    }

    if (!user) {
      return callback({
        statusCode: 404,
        message: 'User does not exists.',
      });
    }

    return callback({
      statusCode: 200,
      message: 'Success',
      payload: { ...user, id: user.id.id },
    });
  });
};

export const signInByUsername = (username, callback) => {
  const query = db.createQuery(ELEMENTS)
    .filter('username', '=', username);

  db.runQuery(query, (error, elements) => {
    if (error) {
      console.log(error);

      return callback({
        statusCode: 500,
        error: 'Database server error.',
        message: 'Database server error.',
      });
    }

    if (elements.length === 0) {
      return callback({
        statusCode: 404,
        error: 'User does not exists.',
        message: 'User does not exists.',
      });
    }

    const payload = { ...elements[0], id: elements[0].id.id };

    return callback({
      statusCode: 200,
      message: 'Successful.',
      payload,
    });
  });
};

export const createUser = (payload, callback) => {
  const query = db.createQuery(ELEMENTS)
    .filter('username', '=', payload.username)
    .select('username')
    .limit(1);

  db.runQuery(query, (error1, result) => {
    if (error1) {
      console.log(error1);

      return callback({
        statusCode: 500,
        error: 'server error.',
      });
    }

    if (result.length !== 0) {
      return callback({
        statusCode: 200,
        message: 'username taken.',
      });
    }

    db.allocateIds(db.key(ELEMENTS), 1, (error2, keys) => {
      if (error2) {
        console.log(error2);

        return callback({
          statusCode: 500,
          error: 'Server error.',
        });
      }

      const key = db.key([ELEMENTS, keys[0].id]);
      const data = {
        ...payload,
        id: key,
        password: crypto.createHash('sha256').update(payload.password).digest('hex'),
        valid: true,
        elementType: 'user',
      };

      db.save({ key, data }, (error3) => {
        if (error3) {
          console.log(error3);

          return callback({
            statusCode: 500,
            error: 'Server error.',
          });
        }

        return callback({
          statusCode: 200,
          message: 'Success',
          payload: { ...data, id: data.id.id },
        });
      });
    });
  });
};

export const updateUserById = (id, payload, callback) => callback({
  statusCode: 503,
  error: 'Service is not available.',
  message: 'This is not working right now.',
});

export const deleteUserById = (id, callback) => {
  const key = db.key([ELEMENTS, parseInt(id, 10)]);
  db.delete(key, (err) => {
    if (err) {
      console.log(err);

      return callback({
        statusCode: 500,
        error: 'Database server error.',
        message: 'Database server error.',
      });
    }

    return callback({
      statusCode: 200,
      message: 'Successfully deleted.',
    });
  });
};
