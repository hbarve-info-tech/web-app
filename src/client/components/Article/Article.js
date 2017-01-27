
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import Component from 'react/lib/ReactComponent';

import ArticleName from './ArticleName';
import ArticleEditor from './ArticleEditor';
import ArticleDescription from './ArticleDescription';

import style from './style';

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { id, isSignedIn } = this.props.user;
    const { updateArticle } = this.props;
    const { articleId, authorId, articleName, description, articleData } = this.props.article;

    return (
      <div
        className="mdl-card"
        style={style.article}
      >
        <div className="mdl-card__title" style={style.articleTitle}>
          <h2 className="mdl-card__title-text">
            <ArticleName
              author={isSignedIn && authorId === id}
              user={this.props.user}
              articleId={articleId}
              articleName={articleName}
              updateArticle={updateArticle}
            />
          </h2>
        </div>
        <div className="mdl-card__supporting-text">
          <ArticleDescription
            author={isSignedIn && authorId === id}
            user={this.props.user}
            articleId={articleId}
            articleDescription={description}
            updateArticle={updateArticle}
          />
        </div>
        <div className="mdl-card__supporting-text">
          <ArticleEditor
            author={isSignedIn && authorId === id}
            user={this.props.user}
            articleId={articleId}
            articleData={articleData || {}}
            updateArticle={updateArticle}
          />
        </div>
      </div>
    );
  }
}

Article.propTypes = {
  article: PropTypes.shape({
    authorId: PropTypes.number.isRequired,
    articleId: PropTypes.number.isRequired,
    articleName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    articleData: PropTypes.shape({
      entityMap: PropTypes.shape({}),
      blocks: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    username: PropTypes.string,
    token: PropTypes.string,
    profilePic: PropTypes.string,
    isSigningIn: PropTypes.bool,
    isSignedIn: PropTypes.bool,
    isFetching: PropTypes.bool,
    isFetched: PropTypes.bool,
    isError: PropTypes.bool,
    error: PropTypes.string,
    message: PropTypes.string,
    lastUpdated: PropTypes.number,
  }).isRequired,
  updateArticle: PropTypes.func.isRequired,
};

export default Article;
