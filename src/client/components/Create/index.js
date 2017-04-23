
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Editor, EditorState, convertToRaw } from 'draft-js';

import actions from '../../actions';

import style from './style';

const convertToString = state => state.blocks.map(block => block.text).join(' ').trim();

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: false,
      message: '',
      title: EditorState.createEmpty(),
      description: EditorState.createEmpty(),
      data: EditorState.createEmpty(),
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (title) => {
    const titleText = convertToString(convertToRaw(title.getCurrentContent()));

    this.setState({
      title,
      valid: titleText.length > 0 && titleText.length < 148,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { id, token } = this.props.user;
    const { title, description, data } = this.state;

    const params = {
      id,
      token,
      postType: 'tweet',
      title: convertToString(convertToRaw(title.getCurrentContent())),
    };
    this.props.createPost(params);
  };

  componentWillReceiveProps({ create }) {
    const { post } = create;
    if (post.isCreating === true) {
      this.setState({message: 'Creating Post...'});
    }
    if (post.isCreated === true) {
      this.setState({message: 'Successfully Created.'});
      setTimeout(() => {
        this.props.resetCreate();
      }, 1000);
    }
  }

  render() {
    const { title, valid, message } = this.state;

    return (
      <div className="mdl-card mdl-shadow--4dp" style={style}>
        <div className="mdl-card__supporting-text">
          <Editor
            editorState={title}
            onChange={this.onChange}
            placeholder="Post title goes here..."
          />
        </div>
        <div className="mdl-card__actions mdl-card--border" style={{display: 'flex', alignItems: 'center'}}>
          <button
            className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored"
            onClick={this.onSubmit}
            disabled={!valid}
            style={{alignContent: 'flex-end'}}
          >
            Create
          </button>
          <div>{message}</div>
        </div>
      </div>
    );
  };
}

Create.propTypes = {
  type: PropTypes.oneOf([
    'post',
    'course'
  ]).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    username: PropTypes.string,
    classroom: PropTypes.bool,
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
  }),
  create: PropTypes.object,
  posts: PropTypes.array,
  courses: PropTypes.array,
  createPost: PropTypes.func,
  createCourse: PropTypes.func,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Create);
