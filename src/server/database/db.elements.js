
import crypto from 'crypto';

import db, { ELEMENTS } from './setup';

// elementType = ['user', 'circle']
// circle = ['field', 'location', 'org', 'edu']

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

export const getElementById = (id, callback) => {
  db.get(db.key([ELEMENTS, id]), (err, element) => {
    if (err) {
      console.log(err);

      return callback({
        statusCode: 500,
        error: 'Database server error.',
        message: 'Database server error.',
      });
    }

    if (!element) {
      return callback({
        statusCode: 404,
        error: 'Element does not exists.',
        message: 'Element does not exists.',
      });
    }

    const payload = { ...element, id: element.id.id };

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

export const getElementByUsername = (username, callback) => {
  const query = db.createQuery(ELEMENTS)
    .filter('username', '=', username);

  db.runQuery(query, (err, elements) => {
    if (err) {
      console.log(err);

      return callback({
        statusCode: 500,
        error: 'Server Error.',
      });
    }

    if (elements.length === 0) {
      return callback({
        statusCode: 404,
        error: 'Element Not Found.',
      });
    }

    const payload = { ...elements[0], id: elements[0].id.id };

    if (payload.password) {
      delete payload.password;
    }

    return callback({
      statusCode: 200,
      message: 'Success.',
      payload,
    });
  });
};

export const createElement = ({
  username,
  name,
  profilePic = 'https://storage.googleapis.com/mayash/12993536_1078754218834834_8314114430867694644_n.jpg',
  classroom = false,
  password = '12345',
  elementType = 'circle',
  circleType,
}, callback) => {
  const query = db.createQuery(ELEMENTS)
    .filter('username', '=', username)
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

      const key = keys[0];
      const data = {
        id: key,
        username,
        name,
        password: crypto.createHash('sha256').update(password).digest('hex'),
        profilePic,
        elementType,
      };
      if (typeof circleType !== 'undefined') {
        data.circleType = circleType;
      }
      if (classroom === true) {
        data.classroom = true;
      }

      db.save({ key, data }, (error3) => {
        if (error3) {
          console.log(error3);

          return callback({
            statusCode: 500,
            error: 'Server error.',
          });
        }

        if (data.password) {
          delete data.password;
        }

        return callback({
          statusCode: 200,
          message: 'Success',
          payload: { ...data, id: key.id },
        });
      });
    });
  });
};

