
import db, { ELEMENTS } from './setup';


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
