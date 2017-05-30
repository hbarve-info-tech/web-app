import moment from 'moment';

import db, { ELEMENTS, POSTS } from './setup';

export const getPostByPostId = (postId, callback) => {
  const key = db.key([POSTS, parseInt(postId, 10)]);
  db.get(key, (error, success) => {
    if (error) {
      console.log(error);

      return callback({
        statusCode: 500,
        error: 'Database server error.',
        message: 'Database server error.',
      });
    }

    if (success) {
      return callback({
        statusCode: 200,
        message: 'Success',
        payload: {
          ...success,
          authorId: success.authorId.id,
          postId: success.postId.id,
        },
      });
    }

    return callback({
      statusCode: 404,
      error: 'Post does not exists.',
      message: 'Post does not exists.',
    });
  });
};

// Return all the posts created by user with 'id'
export const getPostsById = (id, callback) => {
  const query = db.createQuery(POSTS)
                .filter('authorId', '=', db.key([ELEMENTS, id]))
                .limit(5);

  db.runQuery(query, (err, posts) => {
    if (err) {
      console.log(err);

      return callback({
        statusCode: 500,
        error: 'Database server error.',
        message: 'Database server error.',
      });
    }

    return callback({
      statusCode: 200,
      message: 'Successful.',
      payload: posts.map(a => ({ ...a, postId: a.postId.id, authorId: a.authorId.id })),
    });
  });
};

export const createPostById = (id, { postType, title, description, data }, callback) => {
  db.allocateIds(db.key(POSTS), 1, (err, keys) => {
    if (err) {
      console.log(err);

      return callback({
        statusCode: 500,
        error: 'Server Error',
      });
    }

    const key = db.key([POSTS, keys[0].id]);
    const authorId = id;
    const postId = key.id;

    const postData = {
      title,
      postType,
      authorId: db.key([ELEMENTS, id]),
      postId: key,
      timestamp: moment.utc().format(),
    };

    if (typeof description === 'string') {
      postData.description = description;
    }

    if (typeof data === 'object'){
      postData.data = data;
    }

    db.save({ key, data: postData }, (error) => {
      if (error) {
        console.log(error);

        return callback({
          statusCode: 500,
          error: 'Database server error.',
          message: 'Database server error.',
        });
      }

      return callback({
        statusCode: 201,
        message: 'Success',
        payload: { authorId, postId },
      });
    });
  });
};

export const updatePostByPostId = (postId, payload, callback) => {
  const key = db.key([POSTS, postId]);
  db.get(key, (error1, post) => {
    if (error1) {
      console.log(error1);

      return callback({
        statusCode: 500,
        error: 'Server error',
      });
    }

    const data = { ...post, ...payload };

    db.save({ key, data }, (error2) => {
      if (error2) {
        console.log(error2);

        return callback({
          statusCode: 500,
          error: 'Server error',
        });
      }

      return callback({
        statusCode: 200,
        message: 'Update successfully.',
      });
    });
  });
};

// For now it is working but it is incomplete.
export const deletePostByPostId = (postId, callback) => {
  db.delete(db.key([POSTS, postId]), (err, result) => {
    if (err) {
      console.log(err);

      return callback({
        statusCode: 500,
        error: 'server error',
      });
    }

    if (result.indexUpdates === 0) {
      return callback({
        statusCode: 404,
        error: 'Post Not found.',
      });
    }

    return callback({
      statusCode: 200,
      message: 'Successfully deleted',
    });
  });
};


export default {
  getPostsById,
  getPostByPostId,
  createPostById,
  updatePostByPostId,
  deletePostByPostId,
};
