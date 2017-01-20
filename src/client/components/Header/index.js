
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../../actions';

const IsClient = typeof document === 'object';

if (IsClient) {
  require('./Header.scss');
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      invalid: true,
    };
  }

  onChange(key, e) {
    const username = key === 'username' ? e.target.value : this.state.username;
    const password = key === 'password' ? e.target.value : this.state.password;
    
    this.setState({ username, password });
    
    const usernameRegexp = new RegExp('^[a-z0-9]+([_]?[a-z0-9])*$');
    const passwordRegexp = new RegExp('^[a-z0-9]+([a-z0-9])*$');
    
    if (usernameRegexp.test(username) && passwordRegexp.test(password)) {
      if (username.length > 2 && username.length <= 20 && password.length >= 5 && password.length <= 20) {
        this.setState({ invalid: false });
      } else {
        this.setState({ invalid: true });
      }
    } else {
      this.setState({ invalid: true });
    }
  }

  openSignInDialog(e) {
    e.preventDefault();
    const dialog = document.querySelector('dialog');
    dialog.showModal();
  }
  closeSignInDialog(e) {
    e.preventDefault();
    const dialog = document.querySelector('dialog');
    dialog.close();
  }

  signIn() {
    const { username, password } = this.state;
    this.props.signIn({ username, password });
  }

  render() {
    const { username, password, invalid } = this.state;
    const { user } = this.props;

    return (
      <header className="mdl-layout__header">
        <div className="mdl-layout__header-row">

          <span className="mdl-layout-title">Mayash</span>

          <div className="mdl-layout-spacer" />

          <nav className="mdl-navigation mdl-layout--large-screen-only">
            <a
              className="mdl-navigation__link"
              onClick={this.openSignInDialog}
            >
              Sign In
            </a>
          </nav>

          <button
            id="demo-menu-lower-right"
            className="mdl-button mdl-js-button mdl-button--icon"
          >
            <i className="material-icons">more_vert</i>
          </button>
          <ul
            className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
            htmlFor="demo-menu-lower-right"
          >
            <li className="mdl-menu__item" onClick={this.openSignInDialog.bind(this)}>Sign In</li>
          </ul>
        </div>

        <dialog className="mdl-dialog">
          <h4 className="mdl-dialog__title">Sign In</h4>
          <div className="mdl-dialog__content">
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input
                className="mdl-textfield__input"
                type="text"
                pattern="^[a-z0-9]+([_]?[a-z0-9])*$"
                minLength={3}
                maxLength={20}
                value={username}
                onChange={this.onChange.bind(this, 'username')}
              />
              <label className="mdl-textfield__label">Username</label>
              <span className="mdl-textfield__error">
                Only these characters are allowed [a-z0-9_-] & 20 > username length > 3
              </span>
            </div>

            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input
                className="mdl-textfield__input"
                type="password"
                pattern="^[a-z0-9]+([a-z0-9])*$"
                minLength={5}
                maxLength={20}
                value={password}
                onChange={this.onChange.bind(this, 'password')}
              />
              <label className="mdl-textfield__label">Password</label>
              <span className="mdl-textfield__error">
                Only these characters are allowed [a-z0-9_-] & 30 > password length > 5
              </span>
            </div>
          </div>
          <div className="mdl-dialog__actions">
            <button
              type="button"
              className="mdl-button"
              disabled={invalid}
              onClick={this.signIn.bind(this)}
            >
              {user.isSigningIn ? 'Signing In...' : 'Sign In'}
            </button>
            <button
              type="button"
              className="mdl-button"
              onClick={this.closeSignInDialog.bind(this)}
            >
              Cancel
            </button>
          </div>
        </dialog>
      </header>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = (dispatch) => {
  const { signIn, signOut } = actions;
  return bindActionCreators({ signIn, signOut }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
