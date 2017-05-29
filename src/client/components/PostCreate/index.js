
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
      statusCode: 0,
      error: '',
      message: '',

      postType: 'article',

      titlePlaceholder: 'Title...',
      title: EditorState.createEmpty(),
      titleLength: 0,
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
    const { postType, title } = this.state;

    const params = {
      id,
      postType,
      title: convertToString(convertToRaw(title.getCurrentContent())),
    };

    const body = {
      postType,
      title,
    };

    this.setState({message: 'Creating Article...'});

    fetch(`/api/elements/${id}/posts`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(json => {
        if (json.statusCode === 201) {
          this.setState({ message: 'Successfully Created.' });
        } else if (json.statusCode >= 400) {
          this.setState({ ...json });
        }
      });
  };

  render() {
    const { postType, titlePlaceholder, title, titleLength, valid, message } = this.state;

    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--8-col mdl-cell--2-offset-desktop">
          <div className="mdl-card mdl-shadow--4dp" style={style}>
            <CreatePostEditor
              editorState={title}
              onChange={this.onChange}
              placeholder={titlePlaceholder}
            />
            <CreatePostNotification message={message} />
            <div className="mdl-card__actions mdl-card--border" style={style.actions}>
              <CreatePostSubmitButton
                disabled={!valid}
                onSubmit={this.onSubmit}
              />
              <div>{titleLength}/148</div>
            </div>
          </div>
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
