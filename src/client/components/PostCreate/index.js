
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../../actions';

const IsClient = typeof document === 'object';

if (IsClient) {
  require('./PostCreate.scss');
}

class PostCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
    this.openDialog = () => {
      const postCreate = document.querySelector('#post-create-dialog');
      postCreate.showModal();
    };
    this.closeDialog = () => {
      const postCreate = document.querySelector('#post-create-dialog');
      postCreate.close();
    };
  }

  render() {
    return (
      <div className="mayash-post-create">
        <button
          className="mdl-button mdl-js-button mdl-button--fab
                    mdl-js-ripple-effect mdl-button--primary"
          onClick={this.openDialog}
        >
          <i className="material-icons">add</i>
        </button>
        <dialog
          className="mdl-dialog"
          id="post-create-dialog"
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
            >
              Agree
            </button>
            <button
              type="button"
              className="mdl-button close"
              onClick={this.closeDialog}
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
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PostCreate);
