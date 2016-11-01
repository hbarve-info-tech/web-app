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
    params : Joi.object({
      id  : Joi.any().allow(id, username)
    }).length(1),
    query  : Joi.object({
      q   : Joi.string().valid('id', 'username').required()
    })
  },
  handler: (request, reply) => {
    if(request.query.q === 'username') {
      elementdb.getElementByUsername(request.params.id, (result) => reply(result));
    }
    else {
      elementdb.getElementById(parseInt(request.params.id), (result) => reply(result));
    }
  }
};

export const register = (server, options, next) => {

  server.route([

    {method: 'GET',    path: '/api/elements/{id}',    config: getElement}

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
