"use strict";
//Global variables are defined here.
export const ARTICLE_CREATE         = 'ARTICLE_CREATE';
export const ARTICLE_CREATE_START   = 'ARTICLE_CREATE_START';
export const ARTICLE_CREATE_SUCCESS = 'ARTICLE_CREATE_SUCCESS';
export const ARTICLE_CREATE_ERROR   = 'ARTICLE_CREATE_ERROR';

export const ARTICLES_FETCH          = 'ARTICLES_FETCH';
export const ARTICLES_FETCH_START    = 'ARTICLES_FETCH_START';
export const ARTICLES_FETCH_SUCCESS  = 'ARTICLES_FETCH_SUCCESS';
export const ARTICLES_FETCH_ERROR    = 'ARTICLES_FETCH_ERROR';

export const ARTICLE_FETCH          = 'ARTICLE_FETCH';
export const ARTICLE_FETCH_START    = 'ARTICLE_FETCH_START';
export const ARTICLE_FETCH_SUCCESS  = 'ARTICLE_FETCH_SUCCESS';
export const ARTICLE_FETCH_ERROR    = 'ARTICLE_FETCH_ERROR';

export const ARTICLE_UPDATE         = 'ARTICLE_UPDATE';
export const ARTICLE_UPDATE_START   = 'ARTICLE_UPDATE_START';
export const ARTICLE_UPDATE_SUCCESS = 'ARTICLE_UPDATE_SUCCESS';
export const ARTICLE_UPDATE_ERROR   = 'ARTICLE_UPDATE_ERROR';

export const ARTICLE_DELETE         = 'ARTICLE_DELETE';
export const ARTICLE_DELETE_START   = 'ARTICLE_DELETE_START';
export const ARTICLE_DELETE_SUCCESS = 'ARTICLE_DELETE_SUCCESS';
export const ARTICLE_DELETE_ERROR   = 'ARTICLE_DELETE_ERROR';

import { browserHistory } from "react-router";

//Import library here.
import fetch from 'isomorphic-fetch';

import * as api from "../apis";

const createArticleStart  = ()        => {
  return {
    type: ARTICLE_CREATE_START
  };
};
const createArticleSuccess= (payload) => {
  return {
    type: ARTICLE_CREATE_SUCCESS,
    payload
  };
};
const createArticleError  = (payload) => {
  return {
    type: ARTICLE_CREATE_ERROR,
    payload
  };
};
export const createArticle= (payload) => {
  return (dispatch) => {

    dispatch(createArticleStart());

    api.createArticle(payload, (json) => {
      if(json.statusCode === 201) {
        dispatch(createArticleSuccess(json.payload));
        browserHistory.push('/articles/' + json.payload.articleId);
      }
      else if(json.statusCode >= 400) {
        dispatch(createArticleError(json));
      }
    });
  };
};

const fetchArticleStart  = (payload) => {
  return {
    type: ARTICLE_FETCH_START,
    payload
  };
};
const fetchArticleSuccess= (payload) => {
  return {
    type: ARTICLE_FETCH_SUCCESS,
    payload
  };
};
const fetchArticleError  = (payload) => {
  return {
    type: ARTICLE_FETCH_ERROR,
    payload
  };
};
export const fetchArticle= (payload) => {
  return (dispatch) => {

    dispatch(fetchArticleStart(payload));

    fetch('/api/articles/' + payload.articleId, {
      method: 'GET',
      headers: {
        'Accept'       : 'application/json',
        'Content-Type' : 'application/json',
        'Authorization': api.getToken()
      }
    })
      .then(response => response.json())
      .then(
        (json) => {
          if(json.statusCode === 200) {
            dispatch(fetchArticleSuccess(json.payload));
          }
          else if(json.statusCode >= 400) {
            dispatch(fetchArticleError(json));
          }
        }
      );
  };
};

const fetchArticlesStart  = (payload) => {
  return {
    type: ARTICLES_FETCH_START,
    payload
  };
};
const fetchArticlesSuccess= (payload) => {
  return {
    type: ARTICLES_FETCH_SUCCESS,
    payload
  };
};
const fetchArticlesError  = (payload) => {
  return {
    type: ARTICLES_FETCH_ERROR,
    payload
  };
};
export const fetchArticles= (id)      => {
  return (dispatch) => {

    dispatch(fetchArticlesStart({}));

    api.getArticles(id, (json) => {
      if(json.statusCode === 200) {
        dispatch(fetchArticlesSuccess(json.payload));
      }
      else if(json.statusCode >= 400) {
        dispatch(fetchArticlesError(json));
      }
    });
  };
};

const updateArticleStart  = (payload) => {
  return {
    type: ARTICLE_UPDATE_START,
    payload
  };
};
const updateArticleSuccess= (payload) => {
  return {
    type: ARTICLE_UPDATE_SUCCESS,
    payload
  };
};
const updateArticleError  = (payload) => {
  return {
    type: ARTICLE_UPDATE_ERROR,
    payload
  };
};
export const updateArticle= (articleId, payload) => {
  return (dispatch) => {

    dispatch(updateArticleStart({articleId}));

    api.updateArticle(articleId, payload, (json) => {
      if(json.statusCode === 200) {
        payload.articleId = articleId;
        dispatch(updateArticleSuccess(payload));
      }
      else if(json.statusCode >= 400) {
        console.log(json);
        dispatch(updateArticleError(json));
      }
    });
  };
};

const deleteArticleStart  = ()        => {
  return {
    type: ARTICLE_DELETE_START
  };
};
const deleteArticleSuccess= (payload) => {
  return {
    type: ARTICLE_DELETE_SUCCESS,
    payload
  };
};
const deleteArticleError  = (payload) => {
  return {
    type: ARTICLE_DELETE_ERROR,
    payload
  };
};
export const deleteArticle= (payload) => {
  return {
    type: ARTICLE_DELETE,
    payload
  };
};
