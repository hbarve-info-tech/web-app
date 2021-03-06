
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import Component from 'react/lib/ReactComponent';
import { convertToRaw, convertFromRaw } from 'draft-js';
import { Editor, createEditorState } from 'medium-draft';

class ArticleEditor extends Component {
  constructor(props) {
    super(props);
    const { articleData } = this.props;
    const articleInitialState = Object.keys(articleData).length !== 0;
    const editorState = articleInitialState ? createEditorState(articleData) : createEditorState();
    this.state = {
      editorState,
      edit: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(editorState) {
    this.setState({ editorState });
  }
  onSubmit() {
    const { id, token } = this.props.user;
    const { articleId } = this.props;
    const { editorState } = this.state;
    this.props.updateArticle({
      id,
      token,
      articleId,
      articleData: convertToRaw(editorState.getCurrentContent()),
    });
    this.setState({ edit: false });
  }

  render() {
    const { editorState, edit } = this.state;
    const { author } = this.props;

    if (author === false) {
      return (
        <Editor
          editorState={editorState}
          onChange={this.onChange}
          editorEnabled={false}
        />
      );
    }

    if (edit === false) {
      return (
        <div style={{ position: 'relative' }}>
          <Editor
            editorState={editorState}
            onChange={this.onChange}
            editorEnabled={edit}
          />
          <div style={{ position: 'absolute', right: '0px', top: '0px' }}>
            <button
              className="mdl-button mdl-js-button mdl-button--icon"
              onClick={() => this.setState({ edit: !edit })}
            >
              <i className="material-icons">edit</i>
            </button>
          </div>
        </div>
      );
    }

    return (
      <div style={{ position: 'relative' }}>
        <Editor
          editorState={editorState}
          onChange={this.onChange}
          editorEnabled={edit}
        />
        <div style={{ position: 'absolute', right: '0px', top: '0px' }}>
          <button
            className="mdl-button mdl-js-button mdl-button--icon"
            onClick={this.onSubmit}
          >
            <i className="material-icons">save</i>
          </button>
        </div>
      </div>
    );
  }
}

ArticleEditor.propTypes = {
  author: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  articleId: PropTypes.number.isRequired,
  articleData: PropTypes.object.isRequired,
  updateArticle: PropTypes.func.isRequired,
};

export default ArticleEditor;
