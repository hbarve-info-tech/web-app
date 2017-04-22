
import { ELEMENT_GET_START, ELEMENT_GET_SUCCESS, ELEMENT_GET_ERROR } from '../actions/elements';

export const initialElementState = {
  isFetching: false,
  isFetched: false,

  statusCode: 200,
  isError: false,
  error: '',

  message: '',
  lastUpdated: Date.now(),
};

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
        isFetching: false,
        isFetched: true,
        lastUpdated: Date.now(),
      };
    }

    default:
      return state;
  }
};

const elementsReducer = (state = [], action) => {
  switch (action.type) {
    case ELEMENT_GET_START: {
      const { username, id } = action.payload;
      let index = -1;

      index = state.findIndex(e => e.username === username || e.id === id);

      return [
        ...state.slice(0, index),
        elementReducer(index === -1 ? undefined : state[index], action),
        ...state.slice(index + 1, state.length),
      ];
    }
    case ELEMENT_GET_ERROR: {
      const { username, id } = action.payload;
      let index = -1;

      index = state.findIndex(e => e.username === username || e.id === id);

      return [
        ...state.slice(0, index),
        elementReducer(state[index], action),
        ...state.slice(index + 1, state.length),
      ];
    }
    case ELEMENT_GET_SUCCESS: {
      const { username, id } = action.payload;
      let index = -1;

      index = state.findIndex(e => e.username === username || e.id === id);

      return [
        ...state.slice(0, index),
        elementReducer(state[index], action),
        ...state.slice(index + 1, state.length),
      ];
    }

    default:
      return state;
  }
};

export default elementsReducer;
