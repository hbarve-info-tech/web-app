'use strict';
import db, { ELEMENTS } from "./setup";


//Return all the articles created by user with 'id'
export const getElementById = (id, callback) => {
  db.get(db.key([ELEMENTS, id]), (err, element) => {
    if(err) {
      console.log(err);

      return callback({
        statusCode: 500,
        error     : 'Database server error.',
        message   : 'Database server error.'
      });
    }

    if(!element) {
      return callback({
        statusCode: 404,
        error     : 'Element does not exists.',
        message   : 'Element does not exists.'
      });
    }

    element =  Object.assign(
      {},
      element,
      {
        id: element.id.id
      }
    );

    return callback({
      statusCode: 200,
      message   : 'Successful.',
      payload   : element
    });
  });
};

export const getElementByUsername = (username, callback) => {
  let query = db.createQuery(ELEMENTS)
    .filter('username', '=', username);

  db.runQuery(query, (err, elements) => {
    if(err) {
      console.log(err);

      return callback({
        statusCode: 500,
        error     : 'Server Error.'
      });
    }

    if(elements.length === 0) {
      return callback({
        statusCode: 404,
        error     : 'Element Not Found.'
      });
    }

    elements[0] = Object.assign(
      {},
      elements[0],
      {
        id: elements[0].id.id
      }
    );

    return callback({
      statusCode: 200,
      message   : 'Success.',
      payload   : elements[0]
    })
  });
};
