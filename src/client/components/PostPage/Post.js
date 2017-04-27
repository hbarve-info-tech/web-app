
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import Component from 'react/lib/ReactComponent';

import {
  Editor,
  EditorState,
  convertFromRaw,
  ContentState,
} from 'draft-js';

import {
  convertToString,
} from '../../../lib/mayash-editor';

import style from './style';

const EditButton = ({ edit, onClick, savePost }) => {
  return (
    <button
      className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"
      onClick={onClick}
    >
      <i className="material-icons">{edit ? 'save' : 'edit'}</i>
    </button>
  );
};

class Post extends Component {
  constructor(props) {
    super(props);
    const { title, description, data } = props.post;

    this.state = {
      edit: false,
      title: EditorState.createWithContent(ContentState.createFromText(title)),
      description: EditorState.createWithContent(ContentState.createFromText(description || '')),
      data: typeof data === 'undefined' ? EditorState.createEmpty() : EditorState.createWithContent(convertFromRaw(data)),
    };

    this.onClick = this.onClick.bind(this);
  }

  savePost = () => {
    const { title, description, data, user } = this.props;
    console.log(user)

    const params = {

    };

  };

  onClick = () => {
    const { edit } = this.state;
    this.setState({edit: !edit});
  };

  render() {
    const { edit } = this.state;
    const { post, user } = this.props;


    return (
      <div
        className="mdl-card mdl-shadow--4dp"
        style={style.container}
      >
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">
            <Editor
              editorState={this.state.title}
              onChange={(title) => this.setState({title})}
              readOnly={!edit}
            />
          </h2>
        </div>
        <div className="mdl-card__supporting-text">
          <Editor
            editorState={this.state.description}
            onChange={(description) => this.setState({description})}
            readOnly={!edit}
          />
        </div>
        <div className="mdl-card__supporting-text">
          <Editor
            editorState={this.state.data}
            onChange={(data) => this.setState({data})}
            readOnly={!edit}
          />
        </div>
        <div className="mdl-card__menu">
          {post.authorId === user.id ? (<EditButton edit={edit} onClick={this.onClick} />) : null}
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
  updatePost: PropTypes.func.isRequired,
};

export default Post;
