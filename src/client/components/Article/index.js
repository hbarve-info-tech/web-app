
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import { Editor, createEditorState } from 'medium-draft';

const IsClient = typeof document === 'object';

if (IsClient) {
  require('medium-draft/lib/index.css');
  require('./Article.scss');
}

const Article = ({ articleId, articleName, description, articleData }) => {
  const articleInitialState = Object.keys(articleData).length !== 0;
  const editorState = articleInitialState ? createEditorState(articleData) : createEditorState();
  const onChange = () => {};

  return (
    <div className="mdl-card mayash-article">
      <div className="mdl-card__title">
        <h2 className="mdl-card__title-text">
          {articleName}
        </h2>
      </div>
      <div className="mdl-card__supporting-text">
        {description}
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
};

Article.propTypes = {
  articleId: PropTypes.number.isRequired,
  articleName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  articleData: PropTypes.shape({
    entityMap: PropTypes.shape({}),
    blocks: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default Article;
