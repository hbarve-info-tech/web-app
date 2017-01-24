
// Import library here.
import * as api from '../api';

// Global variables are defined here.
export const ARTICLES_FETCH = 'ARTICLES_FETCH';
export const ARTICLES_FETCH_START = 'ARTICLES_FETCH_START';
export const ARTICLES_FETCH_SUCCESS = 'ARTICLES_FETCH_SUCCESS';
export const ARTICLES_FETCH_ERROR = 'ARTICLES_FETCH_ERROR';

export const ARTICLE_FETCH = 'ARTICLE_FETCH';
export const ARTICLE_FETCH_START = 'ARTICLE_FETCH_START';
export const ARTICLE_FETCH_SUCCESS = 'ARTICLE_FETCH_SUCCESS';
export const ARTICLE_FETCH_ERROR = 'ARTICLE_FETCH_ERROR';


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
      dispatch(fetchArticleError(json));
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
