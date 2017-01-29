
import { ELEMENT_FETCH_START, ELEMENT_FETCH_SUCCESS, ELEMENT_FETCH_ERROR } from '../actions/elements';

export const initialElementState = {
  isFetching: false,
  isFetched: false,

  statusCode: 200,
  isError: false,
  error: '',

  message: '',
  lastUpdated: Date.now(),
};
const initialState = {
  array: [],

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
    case ELEMENT_FETCH_START: {
      return {
        ...state,
        ...action.payload,
        isFetching: true,
        lastUpdated: Date.now(),
      };
    }
    case ELEMENT_FETCH_ERROR: {
      return {
        ...state,
        isFetched: false,
        isFetching: true,
        isError: true,
        error: action.error,
        message: action.message,
      };
    }
    case ELEMENT_FETCH_SUCCESS: {
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

const elementsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ELEMENT_FETCH_START: {
      const { username, id } = action.payload;
      let index = -1;

      index = state.array.findIndex(e => e.username === username || e.id === id);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          elementReducer(index === -1 ? undefined : state.array[index], action),
          ...state.array.slice(index + 1, state.array.length),
        ],
      };
    }
    case ELEMENT_FETCH_ERROR: {
      const { username, id } = action.payload;
      let index = -1;

      index = state.array.findIndex(e => e.username === username || e.id === id);

      return {
        ...state,
        array: [
          ...state.array.slice(0, index),
          elementReducer(state.array[index], action),
          ...state.array.slice(index + 1, state.array.length),
        ],
        lastUpdated: Date.now(),
      };
    }
    case ELEMENT_FETCH_SUCCESS: {
      const { array } = state;
      const { username, id } = action.payload;
      let index = -1;

      index = state.array.findIndex(e => e.username === username || e.id === id);

      return {
        ...state,
        array: [
          ...array.slice(0, index),
          elementReducer(array[index], action),
          ...array.slice(index + 1, array.length),
        ],
        lastUpdated: Date.now(),
      };
    }

    default:
      return state;
  }
};

export default elementsReducer;
