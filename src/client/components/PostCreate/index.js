
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../../actions';

import style from './style';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      postType: 'article', // 'article', 'course'
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ value: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const { id, token, createArticle, createCourse, closeDialog } = this.props;
    const { value, postType } = this.state;

    if (postType === 'article') {
      createArticle({ id, token, articleName: value });
    }
    else if (postType === 'course') {
      createCourse({ id, token, courseName: value });
    }

    closeDialog();
  }

  render() {
    return (
      <form
        style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <div className="mdl-textfield mdl-js-textfield" style={{ width: '100%' }}>
          <textarea
            className="mdl-textfield__input"
            type="text"
            id="post-create-textarea"
            pattern="^[a-zA-Z0-9 ',./?;:{}()-_=\+!@#$%^&*`~]*"
            rows={3}
            onChange={this.onChange}
            style={{ width: '100%', resize: 'none' }}
          />
          <label className="mdl-textfield__label" htmlFor="post-create-textarea">
            New Article Name
          </label>
          <span className="mdl-textfield__error">
            Unidentified Character, double quotes are not allowed.
          </span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <button
            className="mdl-button"
            onClick={this.props.closeDialog}
          >
            Cancel
          </button>
          <button
            className="mdl-button"
            onClick={this.onSubmit}
          >
            Create
          </button>
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  id: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  createArticle: PropTypes.func.isRequired,
  createCourse: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired,
};

class PostCreate extends Component {
  constructor(props) {
    super(props);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  openDialog(e) {
    if (e) {
      e.preventDefault();
    }
    this.refs['post-create-dialog'].showModal();
  }
  closeDialog(e) {
    if (e) {
      e.preventDefault();
    }
    this.refs['post-create-dialog'].close();
  }

  render() {
    const { id, token, classroom } = this.props.user;

    return (
      <div style={style.postCreate}>
        <button
          className="mdl-button mdl-js-button mdl-button--fab
                    mdl-js-ripple-effect mdl-button--primary"
          onClick={this.openDialog}
        >
          <i className="material-icons">add</i>
        </button>
        <dialog
          className="mdl-dialog"
          ref="post-create-dialog"
          id="post-create-dialog"
          style={style.dialog}
        >
          <div className="mdl-dialog__content">
            <Form
              id={id}
              token={token}
              classroom={classroom || false}
              createArticle={this.props.createArticle}
              createCourse={this.props.createCourse}
              closeDialog={this.closeDialog}
            />
          </div>
        </dialog>
      </div>
    );
  }
}

PostCreate.propTypes = {
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
  }).isRequired,
  courses: PropTypes.object.isRequired,
  articles: PropTypes.object.isRequired,
  createArticle: PropTypes.func.isRequired,
  createCourse: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  articles: state.articles,
  courses: state.courses,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  createArticle: actions.createArticle,
  createCourse: actions.createCourse,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PostCreate);
