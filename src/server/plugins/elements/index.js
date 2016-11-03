/**
 * Created by himank on 2/8/16.
 */
'use strict';
import Joi    from "joi";
import Boom   from "boom";

import { elementdb }  from "../../database";
import { id, username } from "../../config/schema";

const getElement    = {
  auth    : {
      mode : 'required',
      strategies : ['ReadTrafficCheck', 'user']
  },
  validate: {
    query  : Joi.object({
      id : id,
      username: username
    }).length(1)
  },
  handler: (request, reply) => {
    let { username, id } = request.query;
    if(username) {
      elementdb.getElementByUsername(username, (result) => reply(result));
    }
    else {
      elementdb.getElementById(parseInt(id), (result) => reply(result));
    }
  }
};

export const register = (server, options, next) => {

  server.route([

    {method: 'GET',    path: '/api/elements',    config: getElement}

  ]);

  next();
};

register.attributes = {
  pkg : {
    "name": "Elements",
    "version": "0.0.1",
    "description": "This plugin contains all the features related to element."
  }
};
