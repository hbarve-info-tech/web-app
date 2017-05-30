
import Joi from 'joi';
import moment from 'moment';

import { postdb } from '../mayash-database';
import { Id, PostId, PostType, Title, Description, PostData } from '../mayash-api-common/schema';

const getPosts = {
  auth: {
    mode: 'required',
    strategies: ['visitor'],
  },
  validate: {
    params: Joi.object({
      id: Id.required(),
    }),
  },
  handler: (request, reply) => {
    postdb.getPostsById(request.params.id, result => reply(result));
  },
};

const getPost = {
  auth: {
    mode: 'required',
    strategies: ['visitor'],
  },
  validate: {
    params: Joi.object({
      postId: PostId.required(),
    }),
  },
  handler: (request, reply) => {
    postdb.getPostByPostId(
      request.params.postId,
      result => reply(result));
  },
};

const createPost = {
  auth: {
    mode: 'required',
    strategies: ['WriteTrafficCheck', 'owner'],
  },
  validate: {
    params: Joi.object({
      id: Id.required(),
    }),
    payload: Joi.object({
      postType: PostType.required(),
      title: Title.required(),
      // description: Description,
      // description: Description.when('postType', { is: 'article', then: Joi.required() }),
      // data: PostData.when('postType', { is: 'article', then: Joi.required() }),
    }).length(2),
  },
  handler: (request, reply) => {
    postdb.createPostById(
      request.params.id,
      request.payload,
      result => reply(result),
    );
  },
};

const updatePost = {
  auth: {
    mode: 'required',
    strategies: ['WriteTrafficCheck', 'owner'],
  },
  validate: {
    params: Joi.object({
      id: Id.required(),
      postId: PostId.required(),
    }),
    payload: Joi.object({
      title: Title,
      description: Description,
      data: PostData,
    }).min(1).max(3),
  },
  handler: (request, reply) => {
    postdb.updatePostByPostId(
      request.params.postId,
      request.payload,
      result => reply(result),
    );
  },
};

const deletePost = {
  auth: {
    mode: 'required',
    strategies: ['WriteTrafficCheck', 'owner'],
  },
  validate: {
    params: Joi.object({
      id: Id.required(),
      postId: PostId.required(),
    }),
  },
  handler: (request, reply) => {
    postdb.deletePostByPostId(request.params.postId, result => reply(result));
  },
};


export const Routes = [

  { path: '/api/elements/{id}/posts', method: 'GET',  config: getPosts },
  { path: '/api/posts/{postId}', method: 'GET',  config: getPost },
  { path: '/api/elements/{id}/posts', method: 'POST',  config: createPost },
  { path: '/api/elements/{id}/posts/{postId}', method: 'PUT',  config: updatePost },
  { path: '/api/elements/{id}/posts/{postId}', method: 'DELETE',  config: deletePost },

];

export default Routes;
