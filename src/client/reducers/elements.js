
import {
  ELEMENT_GET_START, ELEMENT_GET_SUCCESS, ELEMENT_GET_ERROR,
  USER_SIGN_IN_START, USER_SIGN_IN_ERROR, USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT,
} from '../constants/elements';

import { writeLocalStore, writeCookie,
  removeLocalStore, removeAllCookies } from '../api/clientApi';

const initialElementState = {
  isFetching: false,
  isFetched: false,

  statusCode: null,
  isError: false,
  error: '',

  message: '',
  lastUpdated: Date.now(),
};
const initialElementsState = [
  {
    ...initialElementState,
    isSignedIn: false,
    isSigningIn: false,
  },
];

const devInitialState = [
  {
    id: 1,
    username: 'hbarve1',
    name: 'Himank Barve',
    avatar: 'https://storage.googleapis.com/mayash/12993536_1078754218834834_8314114430867694644_n.jpg',
    classroom: true,
    description: 'this description is too cool, it is going to be awesome.',
    elementType: 'user',
    isSignedIn: true,
    token: 'this is token string.',
    statusCode: 200,
  },
  {
    id: 2,
    username: 'shubham',
    name: 'Shubham Maurya',
    avatar: 'https://storage.googleapis.com/mayash/12993536_1078754218834834_8314114430867694644_n.jpg',
    elementType: 'user',
    statusCode: 200,
  },
  {
    id: 3,
    username: 'iitdhn',
    name: 'Indian Institute of Technology (ISM), Dhanbad.',
    avatar: 'https://storage.googleapis.com/mayash/12993536_1078754218834834_8314114430867694644_n.jpg',
    classroom: true,
    elementType: 'circle',
    circleType: 'edu',
    statusCode: 200,
  },
  {
    id: 4,
    username: 'google',
    name: 'Google Inc.',
    avatar: 'https://storage.googleapis.com/mayash/12993536_1078754218834834_8314114430867694644_n.jpg',
    classroom: true,
    elementType: 'circle',
    circleType: 'org',
    statusCode: 200,
  },
  {
    id: 4,
    username: 'science',
    name: 'Science',
    avatar: 'https://storage.googleapis.com/mayash/12993536_1078754218834834_8314114430867694644_n.jpg',
    classroom: true,
    elementType: 'circle',
    circleType: 'field',
    statusCode: 200,
  },
  {
    id: 5,
    username: 'dhanbad',
    name: 'Dhanbad',
    avatar: 'https://storage.googleapis.com/mayash/12993536_1078754218834834_8314114430867694644_n.jpg',
    elementType: 'circle',
    circleType: 'location',
    statusCode: 200,
  },
];


const elementReducer = (state = initialElementState, action) => {
  switch (action.type) {
    case ELEMENT_GET_START: {
      return {
        ...state,
        ...action.payload,
        isFetching: true,
        lastUpdated: Date.now(),
      };
    }
    case ELEMENT_GET_ERROR: {
      return {
        ...state,
        isFetched: false,
        isFetching: true,
        isError: true,
        ...action.payload,
      };
    }
    case ELEMENT_GET_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        statusCode: 200,
        isFetching: false,
        isFetched: true,
        lastUpdated: Date.now(),
      };
    }

    default:
      return state;
  }
};

const elementsReducer = (state = initialElementsState, action) => {
  switch (action.type) {
    case USER_SIGN_IN_START: {
      return [
        {
          ...state[0],
          isSigningIn: true,
          isSignedIn: false,

          isFetching: false,
          isFetched: false,

          isError: false,
          error: '',
          message: '',

          lastUpdated: Date.now(),
        },
        ...state.slice(1, state.length)
      ];
    }
    case USER_SIGN_IN_ERROR: {
      return [
        {
          ...state[0],
          isSigningIn: true,
          isSignedIn: false,

          isFetching: false,
          isFetched: false,

          isError: true,
          error: action.payload.error,
          message: action.payload.message,

          lastUpdated: Date.now(),
        },
        ...state.slice(1, state.length)
      ];
    }
    case USER_SIGN_IN_SUCCESS: {
      const { payload } = action;

      writeLocalStore('user', payload);
      writeCookie('isSignedIn', true);
      writeCookie('id', payload.id);
      writeCookie('username', payload.username);
      writeCookie('token', payload.token);

      window.location.href = '/';

      return state;
    }

    case USER_SIGN_OUT: {
      removeAllCookies();
      removeLocalStore('user');

      window.location.href = '/';
      return initialElementsState;
    }

    case ELEMENT_GET_START: {
      const { username, id } = action.payload;
      let index = -1;

      index = state.findIndex(e => e.username === username || e.id === id);

      if (index === -1) {
        return [
          ...state.slice(0, state.length),
          elementReducer(undefined, action),
        ];
      }
      else if (index === 0) {
        return [
          elementReducer(state[index], action),
          ...state.slice(1, state.length),
        ];
      }
      else {
        return [
          ...state.slice(0, index),
          elementReducer(index === -1 ? undefined : state[index], action),
          ...state.slice(index + 1, state.length),
        ];
      }
    }
    case ELEMENT_GET_ERROR: {
      const { username, id } = action.payload;
      let index = -1;

      index = state.findIndex(e => e.username === username || e.id === id);

      if (index === -1) {
        return [
          ...state.slice(0, state.length),
          elementReducer(undefined, action),
        ];
      }
      else if (index === 0) {
        return [
          elementReducer(state[index], action),
          ...state.slice(1, state.length),
        ];
      }
      else {
        return [
          ...state.slice(0, index),
          elementReducer(index === -1 ? undefined : state[index], action),
          ...state.slice(index + 1, state.length),
        ];
      }
    }
    case ELEMENT_GET_SUCCESS: {
      const { username, id } = action.payload;
      let index = -1;

      index = state.findIndex(e => e.username === username || e.id === id);

      if (index === -1) {
        return [
          ...state.slice(0, state.length),
          elementReducer(undefined, action),
        ];
      }
      else if (index === 0) {
        return [
          elementReducer(state[index], action),
          ...state.slice(1, state.length),
        ];
      }
      else {
        return [
          ...state.slice(0, index),
          elementReducer(index === -1 ? undefined : state[index], action),
          ...state.slice(index + 1, state.length),
        ];
      }
    }

    default:
      return state;
  }
};

export default elementsReducer;
