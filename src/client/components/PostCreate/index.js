
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../../actions';

import style from './style';

class PostCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
    this.create = this.create.bind(this);
  }

  create(e) {
    e.preventDefault();
    const { id, token } = this.props.user;
    const articleName = this.state.title;
    this.props.createArticle({ id, token, articleName });
    this.refs['post-create-dialog'].close();
  }

  render() {
    return (
      <div style={style.postCreate}>
        <button
          className="mdl-button mdl-js-button mdl-button--fab
                    mdl-js-ripple-effect mdl-button--primary"
          onClick={() => this.refs['post-create-dialog'].showModal()}
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
            <div
              className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
              style={{ width: '100%' }}
            >
              <input
                className="mdl-textfield__input"
                type="text"
                pattern="^[a-zA-Z0-9 ',./?;:{}()-_=\+!@#$%^&*`~]*"
                id="post-create-input"
                onChange={e => this.setState({ title: e.target.value })}
              />
              <label
                className="mdl-textfield__label"
                htmlFor="post-create-input"
              >
                Article Name
              </label>
              <span className="mdl-textfield__error">
                Unidentified Character, double quotes are not allowed.
              </span>
            </div>
          </div>
          <div className="mdl-dialog__actions">
            <button
              type="button"
              className="mdl-button"
              onClick={this.create}
            >
              Create
            </button>
            <button
              type="button"
              className="mdl-button close"
              onClick={() => this.refs['post-create-dialog'].close()}
            >
              Cancel
            </button>
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
