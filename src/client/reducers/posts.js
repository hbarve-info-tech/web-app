
import uniqBy from 'lodash/uniqBy';

import {
  POST_CREATE,
  POST_CREATE_SUCCESS,
  POSTS_GET_START, POSTS_GET_ERROR, POSTS_GET_SUCCESS,
  POST_GET_START, POST_GET_ERROR, POST_GET_SUCCESS,
} from '../constants/posts';

const devInitialState = [
  {
    postId: 1,
    authorId: 1,
    postType: 'status',
    title: 'This is first Status',
    timestamp: ''
  },
  {
    postId: 2,
    authorId: 1,
    postType: 'article',
    title: 'This is First Article.',
    description: 'this description is awesome.',
    data: undefined, // add draft-js raw state.,
    timestamp: ''
  },
  {
    postId: 3,
    authorId: 1,
    postType: 'report',
    title: 'This is First Report.',
    description: 'this description is awesome report.',
    data: undefined, // add draft-js raw state.,
    timestamp: ''
  },
  {
    postId: 4,
    authorId: 1,
    postType: 'question',
    title: 'This is First question.',
    description: 'this description is awesome question.',
    data: undefined, // add draft-js raw state.,
    timestamp: ''
  },
];

const postReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_CREATE: {
      return {
        ...state,
        ...action.payload,

        isUpdating: false,
        isFetching: false,
        isDeleting: false,

        isUpdated: false,
        isFetched: false,
        isDeleted: false,

        statusCode: 0,
        isError: false,
        error: '',
        message: '',
        lastUpdated: 0,
      };
    }

    case POST_CREATE_SUCCESS: {
      return {
        ...state,
        ...action.payload,

        isUpdating: false,
        isFetching: false,
        isDeleting: false,

        isUpdated: false,
        isFetched: false,
        isDeleted: false,

        statusCode: 201,
        isError: false,
        error: '',
        message: '',
        lastUpdated: 0,
      };
    }

    case POST_GET_START: {
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
    case POST_GET_ERROR: {
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
    case POST_GET_SUCCESS: {
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

        statusCode: 200,
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

export const postsReducer = (state = [], action) => {
  switch (action.type) {
    case POST_CREATE: {
      return [
        ...state,
        postReducer(undefined, action),
      ];
    }

    case POST_CREATE_SUCCESS: {
      return [
        ...state,
        postReducer(undefined, action),
      ];
    }

    case POSTS_GET_SUCCESS: {
      const newPosts = action.payload.map((post) => {
        return postReducer(undefined, { type: POST_GET_SUCCESS, payload: post });
      });

      let array = [
        ...state,
        ...newPosts,
      ];
      array = array.map(post => ({ ...post, postId: parseInt(post.postId, 10) }));
      array = uniqBy(array, 'postId');

      return array;
    }

    case POST_GET_START: {
      return [
        ...state,
        postReducer(undefined, action),
      ];
    }
    case POST_GET_ERROR: {
      const { postId } = action.payload;
      const index = state.findIndex(a => a.postId === parseInt(postId, 10));

      return [
        ...state.slice(0, index),
        postReducer(state[index], action),
        ...state.slice(index + 1, state.length),
      ];
    }
    case POST_GET_SUCCESS: {
      const { postId } = action.payload;
      const index = state.findIndex(a => a.postId === postId);

      return [
        ...state.slice(0, index),
        postReducer(state[index], action),
        ...state.slice(index + 1, state.length),
      ];
    }

    default:
      return state;
  }
};

export default postsReducer;
