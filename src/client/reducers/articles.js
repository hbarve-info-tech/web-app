
import uniqBy from 'lodash/uniqBy';

import {
  ARTICLE_CREATE_START, ARTICLE_CREATE_ERROR, ARTICLE_CREATE_SUCCESS,
  ARTICLES_FETCH_START, ARTICLES_FETCH_ERROR, ARTICLES_FETCH_SUCCESS,
  ARTICLE_FETCH_START, ARTICLE_FETCH_ERROR, ARTICLE_FETCH_SUCCESS,
  ARTICLE_UPDATE_START, ARTICLE_UPDATE_ERROR, ARTICLE_UPDATE_SUCCESS,
} from '../actions/articles';


export const initialArticleState = {
  articleId: -1,
  articleName: '',
  description: '',
  articleData: {},

  isCreating: false,
  isUpdating: false,
  isFetching: false,
  isDeleting: false,

  isCreated: false,
  isUpdated: false,
  isFetched: false,
  isDeleted: false,

  statusCode: 200,
  isError: false,
  error: '',
  message: '',
  lastUpdated: Date.now(),
};
const initialArticlesState = {
  array: [],

  isCreating: false,
  isUpdating: false,
  isFetching: false,
  isDeleting: false,

  isCreated: false,
  isUpdated: false,
  isFetched: false,
  isDeleted: false,

  statusCode: 200,
  isError: false,
  error: '',
  message: '',

  lastUpdated: Date.now(),
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

        isCreating: false,
        isUpdating: false,
        isFetching: true,
        isDeleting: false,

        isCreated: false,
        isUpdated: false,
        isFetched: false,
        isDeleted: false,

        isError: false,
        error: '',
        message: '',
        lastUpdated: Date.now(),
      };
    }
    case ARTICLE_FETCH_ERROR: {
      return {
        ...state,
        ...action.payload,

        isCreating: false,
        isUpdating: false,
        isFetching: false,
        isDeleting: false,

        isCreated: false,
        isUpdated: false,
        isFetched: false,
        isDeleted: false,

        isError: true,
        lastUpdated: Date.now(),
      };
    }
    case ARTICLE_FETCH_SUCCESS: {
      return {
        ...state,
        ...action.payload,

        isCreating: false,
        isUpdating: false,
        isFetching: false,
        isDeleting: false,

        isCreated: false,
        isUpdated: false,
        isFetched: true,
        isDeleted: false,

        isError: false,
        error: '',
        message: '',
        lastUpdated: Date.now(),
      };
    }

    case ARTICLE_UPDATE_START: {
      return {
        ...state,
        ...action.payload,
        isCreating: false,
        isUpdating: true,
        isFetching: false,
        isDeleting: false,

        isCreated: false,
        isUpdated: false,
        isFetched: false,
        isDeleted: false,

        isError: false,
        error: '',
        message: '',
        lastUpdated: Date.now(),
      };
    }
    case ARTICLE_UPDATE_ERROR: {
      return {
        ...state,
        isCreating: false,
        isUpdating: false,
        isFetching: false,
        isDeleting: false,

        isCreated: false,
        isUpdated: false,
        isFetched: false,
        isDeleted: false,

        isError: true,
        error: action.payload.error,
        message: action.payload.message,
        lastUpdated: Date.now(),
      };
    }
    case ARTICLE_UPDATE_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isCreating: false,
        isUpdating: false,
        isFetching: false,
        isDeleting: false,

        isCreated: false,
        isUpdated: true,
        isFetched: false,
        isDeleted: false,

        isError: false,
        error: '',
        message: '',
        lastUpdated: Date.now(),
      };
    }

    default:
      return state;
  }
};

export const articlesReducer = (state = initialArticlesState, action) => {
  switch (action.type) {
    case ARTICLE_CREATE_START: {
      return {
        ...state,
        isCreating: true,
        isUpdating: false,
        isFetching: false,
        isDeleting: false,

        isCreated: false,
        isUpdated: false,
        isFetched: false,
        isDeleted: false,

        isError: false,
        error: '',
        message: '',

        lastUpdated: Date.now(),
      };
    }
    case ARTICLE_CREATE_ERROR: {
      return {
        ...state,
        isCreating: false,
        isUpdating: false,
        isFetching: false,
        isDeleting: false,

        isCreated: false,
        isUpdated: false,
        isFetched: false,
        isDeleted: false,

        isError: true,
        error: action.payload.error,
        message: action.payload.message,
        lastUpdated: Date.now(),
      };
    }
    case ARTICLE_CREATE_SUCCESS: {
      return {
        ...state,
        array: [
          ...state.array,
          articleReducer(undefined, action),
        ],
        isCreating: false,
        isUpdating: false,
        isFetching: false,
        isDeleting: false,

        isCreated: true,
        isUpdated: false,
        isFetched: false,
        isDeleted: false,

        isError: false,
        error: '',
        message: '',

        lastUpdated: Date.now(),
      };
    }

    case ARTICLES_FETCH_START: {
      return {
        ...state,
        isCreating: false,
        isUpdating: false,
        isFetching: true,
        isDeleting: false,

        isCreated: false,
        isUpdated: false,
        isFetched: false,
        isDeleted: false,

        isError: false,
        error: '',
        message: '',

        lastUpdated: Date.now(),
      };
    }
    case ARTICLES_FETCH_ERROR: {
      return {
        ...state,
        isCreating: false,
        isUpdating: false,
        isFetching: false,
        isDeleting: false,

        isCreated: false,
        isUpdated: false,
        isFetched: false,
        isDeleted: false,

        isError: true,
        error: action.payload.error,
        message: action.payload.message,
        lastUpdated: Date.now(),
      };
    }
    case ARTICLES_FETCH_SUCCESS: {
      const newArticles = action.payload.map((article) => {
        return articleReducer(undefined, { type: ARTICLE_FETCH_SUCCESS, payload: article });
      });

      let array = [
        ...state.array,
        ...newArticles,
      ];
      array = array.map(article => ({ ...article, articleId: parseInt(article.articleId, 10) }));
      array = uniqBy(array, 'articleId');

      return {
        ...state,
        array,
        isCreating: false,
        isUpdating: false,
        isFetching: false,
        isDeleting: false,

        isCreated: false,
        isUpdated: false,
        isFetched: true,
        isDeleted: false,

        isError: false,
        error: '',
        message: '',

        lastUpdated: Date.now(),
      };
    }

    case ARTICLE_FETCH_START: {
      return {
        ...state,
        array: [
          ...state.array,
          articleReducer(undefined, action),
        ],
        lastUpdated: Date.now(),
      };
    }
    case ARTICLE_FETCH_ERROR: {
      const { articleId } = action.payload;
      const index = state.array.findIndex(a => a.articleId === parseInt(articleId, 10));

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          articleReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length),
        ],
        lastUpdated: Date.now(),
      };
    }
    case ARTICLE_FETCH_SUCCESS: {
      const { articleId } = action.payload;
      const index = state.array.findIndex(a => a.articleId === articleId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          articleReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length),
        ],
        lastUpdated: Date.now(),
      };
    }

    case ARTICLE_UPDATE_START: {
      const index = state.array.findIndex(a => a.articleId === action.payload.articleId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          articleReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length),
        ],
        lastUpdated: Date.now(),
      };
    }
    case ARTICLE_UPDATE_ERROR: {
      const index = state.array.findIndex(a => a.articleId === action.payload.articleId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          articleReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length),
        ],
        lastUpdated: Date.now(),
      };
    }
    case ARTICLE_UPDATE_SUCCESS: {
      const index = state.array.findIndex(a => a.articleId === action.payload.articleId);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          articleReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length),
        ],
        lastUpdated: Date.now(),
      };
    }

    default:
      return state;
  }
};

export default articlesReducer;
