
// Import library here.
import * as api from '../api';

// Global variables are defined here.
export const ARTICLES_FETCH_START = 'ARTICLES_FETCH_START';
export const ARTICLES_FETCH_SUCCESS = 'ARTICLES_FETCH_SUCCESS';
export const ARTICLES_FETCH_ERROR = 'ARTICLES_FETCH_ERROR';

export const ARTICLE_FETCH_START = 'ARTICLE_FETCH_START';
export const ARTICLE_FETCH_SUCCESS = 'ARTICLE_FETCH_SUCCESS';
export const ARTICLE_FETCH_ERROR = 'ARTICLE_FETCH_ERROR';

export const ARTICLE_CREATE_START = 'ARTICLE_CREATE_START';
export const ARTICLE_CREATE_SUCCESS = 'ARTICLE_CREATE_SUCCESS';
export const ARTICLE_CREATE_ERROR = 'ARTICLE_CREATE_ERROR';

export const ARTICLE_UPDATE_START = 'ARTICLE_UPDATE_START';
export const ARTICLE_UPDATE_SUCCESS = 'ARTICLE_UPDATE_SUCCESS';
export const ARTICLE_UPDATE_ERROR = 'ARTICLE_UPDATE_ERROR';


const fetchArticleStart = payload => ({ type: ARTICLE_FETCH_START, payload });
const fetchArticleSuccess = payload => ({ type: ARTICLE_FETCH_SUCCESS, payload });
const fetchArticleError = payload => ({ type: ARTICLE_FETCH_ERROR, payload });
export const fetchArticle = ({ articleId, token }) => (dispatch) => {
  dispatch(fetchArticleStart({ articleId }));

  api.getArticle({ articleId, token }, (json) => {
    if (json.statusCode === 200) {
      dispatch(fetchArticleSuccess(json.payload));
    }
    else if (json.statusCode >= 400) {
      dispatch(fetchArticleError({ articleId, ...json }));
    }
  });
};

const fetchArticlesStart = payload => ({ type: ARTICLES_FETCH_START, payload });
const fetchArticlesSuccess = payload => ({ type: ARTICLES_FETCH_SUCCESS, payload });
const fetchArticlesError = payload => ({ type: ARTICLES_FETCH_ERROR, payload });
export const fetchArticles = ({ id, token }) => (dispatch) => {
  dispatch(fetchArticlesStart());

  api.getArticles({ id, token }, (json) => {
    if (json.statusCode === 200) {
      dispatch(fetchArticlesSuccess(json.payload));
    }
    else if (json.statusCode >= 400) {
      dispatch(fetchArticlesError(json));
    }
  });
};

const createArticleStart = () => ({ type: ARTICLE_CREATE_START });
const createArticleSuccess = payload => ({ type: ARTICLE_CREATE_SUCCESS, payload });
const createArticleError = payload => ({ type: ARTICLE_CREATE_ERROR, payload });
export const createArticle = ({ id, token, articleName }) => (dispatch) => {
  dispatch(createArticleStart());

  api.createArticle({ id, token, articleName }, (json) => {
    if (json.statusCode === 201) {
      dispatch(createArticleSuccess(json.payload));
    }
    else if (json.statusCode >= 400) {
      dispatch(createArticleError(json));
    }
  });
};

const updateArticleStart = payload => ({ type: ARTICLE_UPDATE_START, payload });
const updateArticleSuccess = payload => ({ type: ARTICLE_UPDATE_SUCCESS, payload });
const updateArticleError = payload => ({ type: ARTICLE_UPDATE_ERROR, payload });
export const updateArticle = ({
  id,
  token,
  articleId,
  articleName,
  description,
  articleData,
}) => (dispatch) => {
  dispatch(updateArticleStart({ articleId: parseInt(articleId, 10) }));

  api.updateArticle({
    id,
    token,
    articleId,
    articleName,
    description,
    articleData,
  }, (json) => {
    if (json.statusCode === 200) {
      const payload = { articleId };

      if (articleName) {
        payload.articleName = articleName;
      }
      if (description) {
        payload.description = description;
      }
      if (articleData) {
        payload.articleData = articleData;
      }
      dispatch(updateArticleSuccess(payload));
    }
    else if (json.statusCode >= 400) {
      dispatch(updateArticleError({ articleId, ...json }));
    }
  });
};
