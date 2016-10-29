"use strict";
import {
  ARTICLE_CREATE, ARTICLE_CREATE_START, ARTICLE_CREATE_ERROR, ARTICLE_CREATE_SUCCESS,
  ARTICLES_FETCH, ARTICLES_FETCH_START, ARTICLES_FETCH_ERROR, ARTICLES_FETCH_SUCCESS,
  ARTICLE_FETCH,  ARTICLE_FETCH_START,  ARTICLE_FETCH_ERROR,  ARTICLE_FETCH_SUCCESS,
  ARTICLE_UPDATE, ARTICLE_UPDATE_START, ARTICLE_UPDATE_ERROR, ARTICLE_UPDATE_SUCCESS,
  ARTICLE_DELETE, ARTICLE_DELETE_START, ARTICLE_DELETE_ERROR, ARTICLE_DELETE_SUCCESS
} from '../actions/articles';


let initialArticleState  = {
  articleId   : '',
  articleName : '',
  description : '',
  articleData : '',

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
    case ARTICLE_CREATE : {

      return Object.assign(
        {},
        state,
        action.payload,
        {
          isFetching  : false,
          isFetched   : true,
          isError     : false,
          error       : '',
          message     : '',
          lastUpdated : Date.now()
        }
      );
    }
    case ARTICLE_FETCH  : {

      return Object.assign(
        {},
        state,
        action.payload,
        {
          isFetching  : true,
          isFetched   : false,
          isError     : false,
          error       : '',
          message     : '',
          lastUpdated : Date.now()
        }
      );
    }
    case ARTICLE_UPDATE : {

      return Object.assign(
        {},
        state,
        action.payload,
        {
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
        }
      );
    }
    case ARTICLE_DELETE : {

      return state;
    }
  }
};

const articlesReducer = (state = initialArticlesState, action) => {
  switch (action.type) {
    case ARTICLE_CREATE_START  : {

      return Object.assign(
        {},
        state,
        {
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
        }
      );
    }
    case ARTICLE_CREATE_ERROR  : {

      return Object.assign(
        {},
        state,
        {
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
        }
      );
    }
    case ARTICLE_CREATE_SUCCESS: {
      let newArticle = articleReducer(
        undefined,
        {
          type   : ARTICLE_CREATE,
          payload: action.payload
        }
      );

      let array = state.array;
      array.push(newArticle);

      for(let i = 0; i < array.length; i++) {
        for(let j = i + 1; j < array.length; j++) {
          if(array[i].articleId === array[j].articleId) {
            array[i] = Object.assign(
              {},
              array[i],
              array[j]
            );
            array.splice(j, 1);
          }
        }
      }

      return Object.assign(
        {},
        state,
        {
          array       : array,

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
        }
      );
    }

    case ARTICLES_FETCH_START  : {
      return Object.assign(
        {},
        state,
        {
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
        }
      );
    }
    case ARTICLES_FETCH_ERROR  : {
      return Object.assign(
        {},
        state,
        {
          isCreating  : false,
          isUpdating  : false,
          isFetching  : false,
          isDeleting  : false,

          isCreated   : false,
          isUpdated   : false,
          isFetched   : true,
          isDeleted   : false,

          isError     : true,
          error       : action.payload.error,
          message     : action.payload.message,
          lastUpdated : Date.now()
        }
      );
    }
    case ARTICLES_FETCH_SUCCESS: {
      let array = state.array;

      if(array.length === 0) {
        action.payload.map((fetchedArticle, index) => {
          array.push(articleReducer(
              undefined,
              {
                type   : ARTICLE_CREATE,
                payload: fetchedArticle
              }
            )
          );
        });
      }
      else {
        array = array.concat(action.payload);
      }

      for(let i = 0; i < array.length; i++) {
        for(let j = i + 1; j < array.length; j++) {
          if(array[i].articleId === array[j].articleId) {
            array[i] = Object.assign(
              {},
              array[i],
              array[j]
            );
            array.splice(j, 1);
          }
        }
      }

      return Object.assign(
        {},
        state,
        {
          array       : array,

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
        }
      );
    }

    case ARTICLE_FETCH_START  : {
      let newArticle = articleReducer(undefined, {
        type   : ARTICLE_FETCH,
        payload: action.payload
      });

      let array = state.array;
      array.push(newArticle);

      for(let i = 0; i < array.length; i++) {
        for(let j = i + 1; j < array.length; j++) {
          if(array[i].articleId === array[j].articleId) {
            array[i] = Object.assign(
              {},
              array[i],
              array[j]
            );
            array.splice(j, 1);
          }
        }
      }

      return Object.assign(
        {},
        state,
        {
          array       : array,

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
        }
      );
    }
    case ARTICLE_FETCH_ERROR  : {
      let article = articleReducer(undefined, {
        type   : ARTICLE_UPDATE,
        payload: action.payload
      });

      let array = state.array;
      array.push(article);


      for(let i = 0; i < array.length; i++) {
        for(let j = i + 1; j < array.length; j++) {
          if(array[i].articleId === array[j].articleId) {
            array[i] = Object.assign(
              {},
              array[i],
              array[j]
            );
            array.splice(j, 1);
          }
        }
      }

      return Object.assign(
        {},
        state,
        {
          array       : array,

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
        }
      );
    }
    case ARTICLE_FETCH_SUCCESS: {

      let array = state.array;
      array.map((article, index) => {
        if(article.articleId == action.payload.articleId) {
          array[index] = articleReducer(undefined, {
            type   : ARTICLE_UPDATE,
            payload: action.payload
          });
        }
      });


      for(let i = 0; i < array.length; i++) {
        for(let j = i + 1; j < array.length; j++) {
          if(array[i].articleId === array[j].articleId) {
            array[i] = Object.assign(
              {},
              array[i],
              array[j]
            );
            array.splice(j, 1);
          }
        }
      }

      return Object.assign(
        {},
        state,
        {
          array     : array,
          isFetching: false,
          isFetched : true,
          isError   : false,
          error     : ''
        }
      );
    }

    case ARTICLE_UPDATE_START  : {
      return Object.assign(
        {},
        state,
        {
          array: state.array.map((article, index) => {
            if(article.articleId == action.payload.articleId) {
              return Object.assign(
                {},
                article,
                {
                  isUpdating: true,
                  lastUpdated : Date.now()
                }
              )
            }
            else {
              return article;
            }
          })
        }
      );
    }
    case ARTICLE_UPDATE_ERROR  : {

      return state;
    }
    case ARTICLE_UPDATE_SUCCESS: {

      return Object.assign(
        {},
        state,
        {
          array: state.array.map((article, index) => {
            if(article.articleId === action.payload.articleId) {

              return articleReducer(article, {
                type   : ARTICLE_UPDATE,
                payload: action.payload
              });
            }
            else {
              return article;
            }
          })
        },
        {
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
        }
      );
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