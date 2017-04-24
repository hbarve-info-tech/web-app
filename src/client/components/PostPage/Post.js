
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import Component from 'react/lib/ReactComponent';

import {
  Editor,
  EditorState,
  convertFromRaw,
  ContentState,
} from 'draft-js';

import style from './style';

class Post extends Component {
  constructor(props) {
    super(props);
    const { title, description, data } = props.post;

    this.state = {
      title: EditorState.createWithContent(ContentState.createFromText(title)),
      description: EditorState.createWithContent(ContentState.createFromText(description || '')),
      data: typeof data === 'undefined' ? EditorState.createEmpty() : EditorState.createWithContent(convertFromRaw(data)),
    };
  }

  render() {
    return (
      <div
        className="mdl-card mdl-shadow--4dp"
        style={style.article}
      >
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">
            <Editor
              editorState={this.state.title}
              onChange={(title) => this.setState({title})}
              readOnly={true}
            />
          </h2>
        </div>
        <div className="mdl-card__supporting-text">
          <Editor
            editorState={this.state.description}
            onChange={(description) => this.setState({description})}
            readOnly={true}
          />
        </div>
        <div className="mdl-card__supporting-text">
          <Editor
            editorState={this.state.data}
            onChange={(data) => this.setState({data})}
            readOnly={true}
          />
        </div>
        <div className="mdl-card__menu">
          <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
            <i className="material-icons">edit</i>
          </button>
          <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
            <i className="material-icons">save</i>
          </button>
          <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
            <i className="material-icons">share</i>
          </button>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.shape({
    authorId: PropTypes.number,
    postId: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    data: PropTypes.shape({
      entityMap: PropTypes.shape({}),
      blocks: PropTypes.arrayOf(PropTypes.object),
    }),
  }),
};

export default Post;
