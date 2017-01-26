
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import Component from 'react/lib/ReactComponent';
import { Editor, createEditorState } from 'medium-draft';

import style from './style';

const IsClient = typeof document === 'object';

if (IsClient) {
  require('medium-draft/lib/index.css');
}

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    const { articleId, articleName, description, articleData } = this.props.article;
    const articleInitialState = Object.keys(articleData).length !== 0;
    const editorState = articleInitialState ? createEditorState(articleData) : createEditorState();
    const onChange = () => {};

    return (
      <div
        className="mdl-card"
        style={style.article}
      >
        <div className="mdl-card__title" style={style.articleTitle}>
          <h2 className="mdl-card__title-text">
            {articleName}
            <button className="mdl-button mdl-js-button mdl-button--icon">
              <i className="material-icons">edit</i>
            </button>
          </h2>
        </div>
        <div className="mdl-card__supporting-text">
          {description}
          <button className="mdl-button mdl-js-button mdl-button--icon">
            <i className="material-icons">edit</i>
          </button>
        </div>
        <div className="mdl-card__supporting-text">
          <Editor
            editorState={editorState}
            onChange={onChange}
            editorEnabled={false}
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
};

export default Article;
