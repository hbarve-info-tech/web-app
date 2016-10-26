'use strict';
import Joi    from "joi";

import { articledb }  from "../../database";
import {
  id, articleId, articleName,
  description, articleData
} from "../../config/schema";

const getArticles     = {
  auth    : {
    mode       : 'required',
    strategies : ['ReadTrafficCheck', 'user']
  },
  validate: {
    params : Joi.object({
      id : id.required()
    })
  },
  handler : (request, reply) => {
    articledb.getArticlesById(request.params.id, (result) => reply(result));
  }
};

const getArticle      = {
  auth    : {
    mode       : 'required',
    strategies : ['ReadTrafficCheck', 'user']
  },
  validate: {
    params : Joi.object({
      articleId : articleId.required()
    })
  },
  handler : (request, reply) => {
    articledb.getArticleByArticleId(
      request.params.articleId,
      (result) => {
        return reply(result);
      });
  }
};

const createArticle   = {
  auth     : {
    mode       : 'required',
    strategies : ['WriteTrafficCheck', 'owner']
  },
  validate : {
    params : Joi.object({
      id       : id.required()
    }),
    payload: Joi.object({
      articleName : articleName.required(),
      articleData : articleData,
      description : description
    })
  },
  handler  : (request, reply) => {
    articledb.createArticleById(
      request.params.id,
      request.payload,
      (result) => reply(result)
    );
  }
};

const updateArticle   = {
  auth     : {
    mode       : 'required',
    strategies : ['WriteTrafficCheck', 'owner']
  },
  validate : {
    params : Joi.object({
      id       : id.required(),
      articleId : articleId.required()
    }),
    payload: Joi.object({
      articleName : articleName,
      articleData : articleData,
      description : description
    }).min(1).max(3)
  },
  handler  : (request, reply) => {
    articledb.updateArticleByArticleId(
      request.params.articleId,
      request.payload,
      (result) => {
        return reply(result);
      }
    );
  }
};

const deleteArticle   = {
  auth    : {
    mode       : 'required',
    strategies : ['WriteTrafficCheck', 'owner']
  },
  validate: {
    params : Joi.object({
      id        : id.required(),
      articleId : articleId.required()
    })
  },
  handler : (request, reply) => {
    articledb.deleteArticleByArticleId(request.params.articleId, (result) => {
      return reply(result);
    });
  }
};

export const register = (server, options, next) => {

  server.route([

    //Get all the articles of respective element
    {method: 'GET',    path: '/api/elements/{id}/articles',             config: getArticles},
    //Get article details with articleId
    {method: 'GET',    path: '/api/articles/{articleId}',               config: getArticle},
    //Create new article for element with 'id'
    {method: 'POST',   path: '/api/elements/{id}/articles',             config: createArticle},
    //Update article for element with 'id' and article with 'articleId'
    {method: 'PUT',    path: '/api/elements/{id}/articles/{articleId}', config: updateArticle},
    //Delete article for element with 'id' and article with 'articleId'
    {method: 'DELETE', path: '/api/elements/{id}/articles/{articleId}', config: deleteArticle},

  ]);

  next();
};

register.attributes = {
  pkg : {
    "name": "Articles",
    "version": "0.0.1",
    "description": "This plugin contains all the features related to Article."
  }
};
