
import db, { ELEMENTS, ARTICLES } from './setup';

export const getArticleByArticleId = (articleId, callback) => {
  const key = db.key([ARTICLES, parseInt(articleId, 10)]);
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
        payload: Object.assign(
          {},
          success,
          {
            authorId: success.authorId.id,
            articleId: success.articleId.id,
          },
        ),
      });
    }

    return callback({
      statusCode: 404,
      message: 'Article does not exists.',
    });
  });
};

// Return all the articles created by user with 'id'
export const getArticlesById = (id, callback) => {
  const query = db.createQuery(ARTICLES)
                .filter('authorId', '=', db.key([ELEMENTS, id]));

  db.runQuery(query, (err, articles) => {
    if (err) {
      console.log(err);

      return callback({
        statusCode: 500,
        error: 'Database server error.',
        message: 'Database server error.',
      });
    }

    if (articles.length === 0) {
      return callback({
        statusCode: 404,
        error: 'User does not exists.',
        message: 'User does not exists.',
      });
    }

    return callback({
      statusCode: 200,
      message: 'Successful.',
      payload: articles.map(a => ({ ...a, articleId: a.articleId.id, authorId: a.authorId.id })),
    });
  });
};

export const createArticleById = (id, payload, callback) => {
  db.allocateIds(db.key(ARTICLES), 1, (err, keys) => {
    if (err) {
      console.log(err);

      return callback({
        statusCode: 500,
        error: 'Server Error',
      });
    }

    const key = db.key([ARTICLES, keys[0].id]);
    const authorId = id;
    const articleId = key.id;

    const data = {
      ...payload,
      authorId: db.key([ELEMENTS, id]),
      articleId: key,
    };

    db.save({ key, data }, (error) => {
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
        payload: { authorId, articleId },
      });
    });
  });
};

export const updateArticleByArticleId = (articleId, payload, callback) => {
  const key = db.key([ARTICLES, articleId]);
  db.get(key, (error1, article) => {
    if (error1) {
      console.log(error1);

      return callback({
        statusCode: 500,
        error: 'Server error',
      });
    }

    const data = { ...article, ...payload };

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
export const deleteArticleByArticleId = (articleId, callback) => {
  db.delete(db.key([ARTICLES, articleId]), (err, result) => {
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
        error: 'Article Not found.',
      });
    }

    return callback({
      statusCode: 200,
      message: 'Successfully deleted',
    });
  });
};
