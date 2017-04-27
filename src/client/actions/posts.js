
import api from '../api/posts';

import {
  POSTS_GET_START, POSTS_GET_SUCCESS, POSTS_GET_ERROR,
  POST_GET_START, POST_GET_SUCCESS,  POST_GET_ERROR,
  POST_UPDATE_START, POST_UPDATE_SUCCESS, POST_UPDATE_ERROR,
  POST_DELETE_START, POST_DELETE_SUCCESS, POST_DELETE_ERROR,
} from '../constants/posts';


const getPostStart = payload => ({ type: POST_GET_START, payload });
const getPostSuccess = payload => ({ type: POST_GET_SUCCESS, payload });
const getPostError = payload => ({ type: POST_GET_ERROR, payload });
export const getPost = ({ postId, token }) => (dispatch) => {
  dispatch(getPostStart({ postId: parseInt(postId, 10) }));

  api.getPost({ postId: parseInt(postId, 10), token }, (json) => {
    if (json.statusCode === 200) {
      dispatch(getPostSuccess(json.payload));
    }
    else if (json.statusCode >= 400) {
      dispatch(getPostError({ postId: parseInt(postId, 10), ...json }));
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


const updatePostStart = payload => ({ type: POST_GET_START, payload });
const updatePostSuccess = payload => ({ type: POST_GET_SUCCESS, payload });
const updatePostError = payload => ({ type: POST_GET_ERROR, payload });
export const updatePost = ({ postId, token, ...restProps }) => (dispatch) => {
  dispatch(updatePostStart({ postId: parseInt(postId, 10) }));

  api.updatePost({ postId: parseInt(postId, 10), token, ...restProps }, (json) => {
    if (json.statusCode === 200) {
      dispatch(updatePostSuccess(json.payload));
    }
    else if (json.statusCode >= 400) {
      dispatch(updatePostError({ postId: parseInt(postId, 10), ...json }));
    }
  });
};


export default {
  getPosts,
  getPost,

  updatePost,
};
