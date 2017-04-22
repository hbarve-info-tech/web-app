
import api from '../api/post';

// Global variables are defined here.
export const POSTS_GET_START = 'POSTS_GET_START';
export const POSTS_GET_SUCCESS = 'POSTS_GET_SUCCESS';
export const POSTS_GET_ERROR = 'POSTS_GET_ERROR';

export const POST_GET_START = 'POST_GET_START';
export const POST_GET_SUCCESS = 'POST_GET_SUCCESS';
export const POST_GET_ERROR = 'POST_GET_ERROR';

export const POST_CREATE_START = 'POST_CREATE_START';
export const POST_CREATE_SUCCESS = 'POST_CREATE_SUCCESS';
export const POST_CREATE_ERROR = 'POST_CREATE_ERROR';


const getPostStart = payload => ({ type: POST_GET_START, payload });
const getPostSuccess = payload => ({ type: POST_GET_SUCCESS, payload });
const getPostError = payload => ({ type: POST_GET_ERROR, payload });
export const getPost = ({ postId, token }) => (dispatch) => {
  dispatch(getPostStart({ postId }));

  api.getPost({ postId, token }, (json) => {
    if (json.statusCode === 200) {
      dispatch(getPostSuccess(json.payload));
    }
    else if (json.statusCode >= 400) {
      dispatch(getPostError({ postId, ...json }));
    }
  });
};

const getPostsStart = payload => ({ type: POSTS_GET_START, payload });
const getPostsSuccess = payload => ({ type: POSTS_GET_SUCCESS, payload });
const getPostsError = payload => ({ type: POSTS_GET_ERROR, payload });
export const getPosts = ({ id, token }) => (dispatch) => {
  dispatch(getPostsStart());

  api.getPosts({ id, token }, (json) => {
    if (json.statusCode === 200) {
      dispatch(getPostsSuccess(json.payload));
    }
    else if (json.statusCode >= 400) {
      dispatch(getPostsError(json));
    }
  });
};

const createPostStart = () => ({ type: POST_CREATE_START });
const createPostSuccess = payload => ({ type: POST_CREATE_SUCCESS, payload });
const createPostError = payload => ({ type: POST_CREATE_ERROR, payload });
export const createPost = ({ id, token, postType, title, description, data }) => (dispatch) => {
  dispatch(createPostStart());

  api.createPost({ id, token, postType, title, description, data }, (json) => {
    if (json.statusCode === 201) {
      dispatch(createPostSuccess({ ...json.payload, postType, title, description, data }));
    }
    else if (json.statusCode >= 400) {
      dispatch(createPostError(json));
    }
  });
};
