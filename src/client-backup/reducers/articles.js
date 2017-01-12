"use strict";
import {
  ARTICLE_CREATE, ARTICLE_CREATE_START, ARTICLE_CREATE_ERROR, ARTICLE_CREATE_SUCCESS,
  ARTICLES_FETCH, ARTICLES_FETCH_START, ARTICLES_FETCH_ERROR, ARTICLES_FETCH_SUCCESS,
  ARTICLE_FETCH,  ARTICLE_FETCH_START,  ARTICLE_FETCH_ERROR,  ARTICLE_FETCH_SUCCESS,
  ARTICLE_UPDATE, ARTICLE_UPDATE_START, ARTICLE_UPDATE_ERROR, ARTICLE_UPDATE_SUCCESS,
  ARTICLE_DELETE, ARTICLE_DELETE_START, ARTICLE_DELETE_ERROR, ARTICLE_DELETE_SUCCESS
} from '../actions/articles';

import _ from "lodash";

let initialArticleState  = {
  articleId   : -1,
  articleName : '',
  description : '',
  articleData : {},

  isCreating  : false,
  isUpdating  : false,
  isFetching  : false,
  isDeleting  : false,

  isCreated   : false,
  isUpdated   : false,
  isFetched   : false,
  isDeleted   : false,

  isError     : false,
  error       : '',
  message     : '',
  lastUpdated : Date.now()
};
let initialArticlesState = {
  array       : [],

  isCreating  : false,
  isUpdating  : false,
  isFetching  : false,
  isDeleting  : false,

  isCreated   : false,
  isUpdated   : false,
  isFetched   : false,
  isDeleted   : false,

  isError     : false,
  error       : '',
  message     : '',

  lastUpdated : Date.now()
};

const articleReducer = (state = initialArticleState, action) => {
  switch (action.type) {
    case ARTICLE_CREATE_SUCCESS: {

      return state;
    }

    case ARTICLE_FETCH_START: {
      return {
        ...state,
        ...action.payload,

        isCreating  : false,
        isUpdating  : false,
        isFetching  : true,
        isDeleting  : false,

        isCreated   : false,
        isUpdated   : false,
        isFetched   : false,
        isDeleted   : false,

        isError     : false,
        error       : '',
        message     : '',
        lastUpdated : Date.now()
      };
    }
    case ARTICLE_FETCH_ERROR: {
      return {
        ...state,

        isCreating  : false,
        isUpdating  : false,
        isFetching  : false,
        isDeleting  : false,

        isCreated   : false,
        isUpdated   : false,
        isFetched   : false,
        isDeleted   : false,

        isError     : true,
        error       : action.error,
        message     : action.message,
        lastUpdated : Date.now()
      };
    }
    case ARTICLE_FETCH_SUCCESS: {
      return {
        ...state,
        ...action.payload,

        isCreating  : false,
        isUpdating  : false,
        isFetching  : false,
        isDeleting  : false,

        isCreated   : false,
        isUpdated   : false,
        isFetched   : true,
        isDeleted   : false,

        isError     : false,
        error       : '',
        message     : '',
        lastUpdated : Date.now()
      };
    }

    case ARTICLE_UPDATE_START: {
      return {
        ...state,
        ...action.payload,

        isCreating  : false,
        isUpdating  : true,
        isFetching  : false,
        isDeleting  : false,

        isCreated   : false,
        isUpdated   : false,
        isFetched   : false,
        isDeleted   : false,

        isError     : false,
        error       : '',
        message     : '',
        lastUpdated : Date.now()
      };
    }
    case ARTICLE_UPDATE_ERROR: {
      return {
        ...state,

        isCreating  : false,
        isUpdating  : false,
        isFetching  : false,
        isDeleting  : false,

        isCreated   : false,
        isUpdated   : false,
        isFetched   : false,
        isDeleted   : false,

        isError     : true,
        error       : action.payload.error,
        message     : action.payload.message,
        lastUpdated : Date.now()
      };
    }
    case ARTICLE_UPDATE_SUCCESS: {
      return {
        ...state,
        ...action.payload,

        isCreating  : false,
        isUpdating  : false,
        isFetching  : false,
        isDeleting  : false,

        isCreated   : false,
        isUpdated   : true,
        isFetched   : false,
        isDeleted   : false,

        isError     : false,
        error       : '',
        message     : '',
        lastUpdated : Date.now()
      };
    }

    default:
      return state;
  }
};

const articlesReducer = (state = initialArticlesState, action) => {
  switch (action.type) {
    case ARTICLE_CREATE_START  : {
      return {
        ...state,
        isCreating  : true,
        isUpdating  : false,
        isFetching  : false,
        isDeleting  : false,

        isCreated   : false,
        isUpdated   : false,
        isFetched   : false,
        isDeleted   : false,

        isError     : false,
        error       : '',
        message     : '',

        lastUpdated : Date.now()
      };
    }
    case ARTICLE_CREATE_ERROR  : {
      return {
        ...state,
        isCreating  : false,
        isUpdating  : false,
        isFetching  : false,
        isDeleting  : false,

        isCreated   : false,
        isUpdated   : false,
        isFetched   : false,
        isDeleted   : false,

        isError     : true,
        error       : action.payload.error,
        message     : action.payload.message,
        lastUpdated : Date.now()
      };
    }
    case ARTICLE_CREATE_SUCCESS: {
      return {
        ...state,
        array : [
          ...state.array,
          articleReducer(undefined, {type: ARTICLE_CREATE, payload: action.payload})
        ],
        isCreating  : false,
        isUpdating  : false,
        isFetching  : false,
        isDeleting  : false,

        isCreated   : true,
        isUpdated   : false,
        isFetched   : false,
        isDeleted   : false,

        isError     : false,
        error       : '',
        message     : '',

        lastUpdated : Date.now()
      };
    }

    case ARTICLES_FETCH_START  : {
      return {
        ...state,
        isCreating  : false,
        isUpdating  : false,
        isFetching  : true,
        isDeleting  : false,

        isCreated   : false,
        isUpdated   : false,
        isFetched   : false,
        isDeleted   : false,

        isError     : false,
        error       : '',
        message     : '',

        lastUpdated : Date.now()
      };
    }
    case ARTICLES_FETCH_ERROR  : {
      return {
        ...state,
        isCreating  : false,
        isUpdating  : false,
        isFetching  : false,
        isDeleting  : false,

        isCreated   : false,
        isUpdated   : false,
        isFetched   : false,
        isDeleted   : false,

        isError     : true,
        error       : action.payload.error,
        message     : action.payload.message,
        lastUpdated : Date.now()
      };
    }
    case ARTICLES_FETCH_SUCCESS: {
      action.payload = action.payload.map(article => articleReducer(undefined, {type: ARTICLE_FETCH_SUCCESS, payload: article}));

      let array = [
        ...state.array,
        ...action.payload
      ];
      array = array.map(article => ({...article, articleId: parseInt(article.articleId)}));
      array = _.uniqBy(array, 'articleId');

      return {
        ...state,
        array,
        isCreating  : false,
        isUpdating  : false,
        isFetching  : false,
        isDeleting  : false,

        isCreated   : false,
        isUpdated   : false,
        isFetched   : true,
        isDeleted   : false,

        isError     : false,
        error       : '',
        message     : '',

        lastUpdated : Date.now()
      };
    }

    case ARTICLE_FETCH_START  : {
      return {
        ...state,
        array: [
          ...state.array,
          articleReducer(undefined, action)
        ],
        lastUpdated : Date.now()
      };
    }
    case ARTICLE_FETCH_ERROR  : {
      let index = state.array.findIndex(article => article.articleId == action.payload.articleId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          articleReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length)
        ],
        lastUpdated : Date.now()
      };
    }
    case ARTICLE_FETCH_SUCCESS: {
      let index = state.array.findIndex(article => article.articleId == action.payload.articleId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          articleReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length)
        ],
        lastUpdated : Date.now()
      };
    }

    case ARTICLE_UPDATE_START  : {
      let index = state.array.findIndex(article => article.articleId == action.payload.articleId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          articleReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length)
        ],
        lastUpdated : Date.now()
      };
    }
    case ARTICLE_UPDATE_ERROR  : {
      let index = state.array.findIndex(article => article.articleId == action.payload.articleId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          articleReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length)
        ],
        lastUpdated: Date.now()
      };
    }
    case ARTICLE_UPDATE_SUCCESS: {
      let index = state.array.findIndex(article => article.articleId == action.payload.articleId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          articleReducer(state.array[index], {type: ARTICLE_UPDATE_SUCCESS, payload: action.payload}),
          ...state.array.slice(index + 1, state.array.length)
        ],
        lastUpdated : Date.now()
      };
    }

    case ARTICLE_DELETE_START  : {

      return state;
    }
    case ARTICLE_DELETE_ERROR  : {

      return state;
    }
    case ARTICLE_DELETE_SUCCESS: {

      return state;
    }

    default:
      return state;
  }
};

export default articlesReducer;