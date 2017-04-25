
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Editor, EditorState, convertToRaw } from 'draft-js';

import actions from '../../actions';

import style from './style';

// This function will raw state of draft-js editor to string.
const convertToString = state => state.blocks.map(block => block.text).join(' ').trim();

const CreatePostType = ({ onClick, checked = false, label = 'tweet' }) => {
  return (
    <label
      className="mdl-switch mdl-js-switch mdl-js-ripple-effect"
      htmlFor="create-post-type-switch"
    >
      <input
        type="checkbox"
        id="create-post-type-switch"
        className="mdl-switch__input"
        onClick={onClick}
        checked={checked}
      />
      <span className="mdl-switch__label">{label}</span>
    </label>
  );
};

const CreatePostEditor = ({ editorState, onChange, placeholder }) => {
  return (
    <div className="mdl-card__supporting-text">
      <Editor
        editorState={editorState}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

const CreatePostNotification = ({ message }) => {
  if (message.length === 0) return <div/>;

  return (
    <div className="mdl-card__supporting-text">
      <p>{message}</p>
    </div>
  );
};

const CreatePostSubmitButton = ({ disabled = true, onSubmit }) => {
  return (
    <button
      className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored"
      onClick={onSubmit}
      disabled={disabled}
      style={style.actions.submitButton}
    >
      Create
    </button>
  );
};


class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: false,
      message: '',
      postType: 'tweet',
      titlePlaceholder: 'Tweet something...',
      title: EditorState.createEmpty(),
      titleLength: 0,
      description: EditorState.createEmpty(),
      descriptionLength: 0,
      data: EditorState.createEmpty(),
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (title) => {
    const titleText = convertToString(convertToRaw(title.getCurrentContent()));
    const titleLength = titleText.length;

    this.setState({
      title,
      titleLength,
      valid: titleLength > 0 && titleLength < 148,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { id, token } = this.props.elements[0];
    const { postType, title, data } = this.state;

    const params = {
      id,
      token,
      postType,
      title: convertToString(convertToRaw(title.getCurrentContent())),
    };
    if (postType === 'article') {
      params.data = convertToRaw(data.getCurrentContent());
    }

    this.props.createPost(params);
  };

  componentWillReceiveProps({ create }) {
    const { post } = create;
    if (post.isCreating === true) {
      this.setState({message: 'Creating Post...'});
    }
    if (post.isError === true) {
      this.setState({message: post.message});
      setTimeout(() => {
        this.props.resetCreate();
        this.setState({message: ''});
      }, 1000);
    }
    if (post.isCreated === true) {
      this.setState({message: 'Successfully Created.'});
      setTimeout(() => {
        this.props.resetCreate();
        this.setState({
          valid: false,
          message: '',
          title: EditorState.createEmpty(),
          titleLength: 0,
          description: EditorState.createEmpty(),
          data: EditorState.createEmpty(),
        });
      }, 1000);
    }
  }

  render() {
    const { postType, titlePlaceholder, title, titleLength, data, valid, message } = this.state;

    return (
      <div className="mdl-card mdl-shadow--4dp" style={style}>
        <CreatePostEditor
          editorState={title}
          onChange={this.onChange}
          placeholder={titlePlaceholder}
        />
        {postType === 'article' ? (
          <CreatePostEditor
            editorState={data}
            onChange={(data) => this.setState({data})}
            placeholder="Article Goes Here..."
          />
        ) : null }
        <CreatePostNotification message={message} />
        <div className="mdl-card__actions mdl-card--border" style={style.actions}>
          <CreatePostType
            onClick={() => this.setState({
              postType: postType === 'tweet' ? 'article' : 'tweet',
              titlePlaceholder: postType === 'article' ? 'Tweet something...' : 'Article Title Goes Here...',
            })}
            label={postType}
            checked={postType === 'article'}
          />
          <p>{titleLength}/148</p>
          <CreatePostSubmitButton
            disabled={!valid}
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    );
  };
}

CreatePost.propTypes = {
  elements: PropTypes.array,
  create: PropTypes.object,
  posts: PropTypes.array,
  courses: PropTypes.array,
  createPost: PropTypes.func,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
