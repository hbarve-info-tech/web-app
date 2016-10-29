'use strict';
import db, { ELEMENTS, ARTICLES} from "./setup";

export const getArticleByArticleId = (articleId, callback) => {
  let key = db.key([ARTICLES, parseInt(articleId, 10)]);
  db.get(key, function(error, success) {
    if(error) {
      console.log(error);

      return callback({
        statusCode: 500,
        error     : 'Database server error.',
        message   : 'Database server error.'
      });
    }

    if(success) {
      return callback({
        statusCode: 200,
        message   : 'Success',
        payload   : Object.assign(
          {},
          success,
          {
            authorId : success.authorId.id,
            articleId: success.articleId.id
          }
        )
      });
    }

    return callback({
      statusCode: 404,
      message   : 'Article does not exists.'
    });
  });
};

//Return all the articles created by user with 'id'
export const getArticlesById = (id, callback) => {
  var query = db.createQuery(ARTICLES)
                .filter('authorId', '=', db.key([ELEMENTS, id]));

  db.runQuery(query, (err, articles) => {
    if(err) {
      console.log(err);

      return callback({
        statusCode: 500,
        error     : 'Database server error.',
        message   : 'Database server error.'
      });
    }

    if(articles.length === 0) {
      return callback({
        statusCode: 404,
        error     : 'User does not exists.',
        message   : 'User does not exists.'
      });
    }

    articles = articles.map((article) => Object.assign(
      {},
      article,
      {
        articleId: article.articleId.id,
        authorId : article.authorId.id
      }
    ));

    return callback({
      statusCode: 200,
      message   : 'Successful.',
      payload   : articles
    });
  });
};

export const createArticleById    = (id, payload, callback) => {
  let key = db.key(ARTICLES);

  db.allocateIds(key, 1, (err, result) => {
    if(err) {
      console.log(err);

      return callback({
        statusCode: 500,
        error     : 'Server Error'
      });
    }

    payload.authorId  = db.key([ELEMENTS, id]);
    payload.articleId = db.key([ARTICLES, result[0].id]);

    db.save({
      key : payload.articleId,
      data: payload
    }, (error, success) => {
      if (error) {
        console.log (error);

        return callback ({
          statusCode : 500,
          error : 'Database server error.',
          message : 'Database server error.'
        });
      }

      return callback ({
        statusCode : 201,
        message    : 'Success',
        payload    : {
          authorId    : payload.authorId.id,
          articleId   : payload.articleId.id,
          articleName : payload.articleName
        }
      });
    });
  });
};

export const updateArticleByArticleId = (articleId, payload, callback) => {
  let transaction = db.transaction();

  transaction.run((err) => {
    if(err) {
      console.log(err);
      return callback({
        statusCode : 500,
        error      : 'Server error'
      });
    }
    let key = db.key([ARTICLES, articleId]);

    transaction.get(key, (err, data) => {
      if(err) {
        console.log(err);
        return callback({
          statusCode : 500,
          error      : 'Server error'
        });
      }

      data = Object.assign(
        {},
        data,
        payload
      );

      transaction.save({
        key : key,
        data : data
      });

      transaction.commit((err) => {
        if(err) {
          console.log(err);
          return callback({
            statusCode : 500,
            error      : 'Server error'
          });
        }

        return callback({
          statusCode : 200,
          message    : 'Update successfully.'
        });
      })
    });

  });
};

//For now it is working but it is incomplete.
export const deleteArticleByArticleId = (articleId, callback) => {
  db.delete(db.key([ARTICLES, articleId]), (err, result) => {
    if(err) {
      console.log(err);

      return callback({
        statusCode: 500,
        error     : 'server error'
      });
    }

    if(result.indexUpdates === 0) {
      return callback({
        statusCode: 404,
        error     : 'Article Not found.'
      });
    }

    return callback({
      statusCode: 200,
      message   : 'Successfully deleted'
    });
  });
};
