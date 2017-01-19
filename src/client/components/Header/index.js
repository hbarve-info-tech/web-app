"use strict";
const IsClient = typeof document === "object";

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../../actions';

if(IsClient) {
  require('./Header.scss');
}

class Header extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      invalid : true
    };
  }

  openSignInDialog (e) {
    e.preventDefault();
    let dialog = document.querySelector('dialog');
    dialog.showModal();
  }
  closeSignInDialog(e) {
    e.preventDefault();
    let dialog = document.querySelector('dialog');
    dialog.close();
  }

  onChange(key, e) {
    let username = key === 'username' ? e.target.value : this.state.username;
    let password = key === 'password' ? e.target.value : this.state.password;

    this.setState({username, password});

    let usernameRegexp = new RegExp("^[a-z0-9]+([_]?[a-z0-9])*$");
    let passwordRegexp = new RegExp("^[a-z0-9]+([a-z0-9])*$");

    if(usernameRegexp.test(username) && passwordRegexp.test(password)) {
      if(username.length > 2 && username.length <=20 && password.length >= 5 && password.length <= 20) {
        this.setState({invalid: false});
      }
      else {
        this.setState({invalid: true});
      }
    }
    else {
      this.setState({invalid: true});
    }
  }
  signIn() {
    let { username, password } = this.state;
    this.props.signIn({username, password});
  }

  render() {
    let { username, password, invalid } = this.state;
    let { user } = this.props;

    return (
      <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">

          <span class="mdl-layout-title">Mayash</span>

          <div class="mdl-layout-spacer"></div>

          <nav class="mdl-navigation mdl-layout--large-screen-only">
            <a class="mdl-navigation__link"
               onClick={this.openSignInDialog.bind(this)}
            >
              Sign In
            </a>
          </nav>

          <button id="demo-menu-lower-right"
                  class="mdl-button mdl-js-button mdl-button--icon">
            <i class="material-icons">more_vert</i>
          </button>
          <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
              for="demo-menu-lower-right">
            <li class="mdl-menu__item" onClick={this.openSignInDialog.bind(this)}>Sign In</li>
          </ul>
        </div>

        <dialog class="mdl-dialog">
          <h4 class="mdl-dialog__title">Sign In</h4>
          <div class="mdl-dialog__content">
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input class    ="mdl-textfield__input"
                     type     ="text"
                     pattern  ="^[a-z0-9]+([_]?[a-z0-9])*$"
                     minLength={3}
                     maxLength={20}
                     value    ={username}
                     onChange ={this.onChange.bind(this, 'username')}
              />
              <label class="mdl-textfield__label">Username</label>
              <span class="mdl-textfield__error">
                Only these characters are allowed [a-z0-9_-] & 20 > username length > 3
              </span>
            </div>

            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input class    ="mdl-textfield__input"
                     type     ="password"
                     pattern  ="^[a-z0-9]+([a-z0-9])*$"
                     minLength={5}
                     maxLength={20}
                     value    ={password}
                     onChange ={this.onChange.bind(this, 'password')}
              />
              <label class="mdl-textfield__label">Password</label>
              <span class="mdl-textfield__error">
                Only these characters are allowed [a-z0-9_-] & 30 > password length > 5
              </span>
            </div>
          </div>
          <div class="mdl-dialog__actions">
            <button type="button"
                    class="mdl-button"
                    disabled={invalid}
                    onClick={this.signIn.bind(this)}
            >
              {user.isSigningIn ? `Signing In...` : `Sign In`}
            </button>
            <button type="button"
                    class="mdl-button"
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

const mapStateToProps = (state) => ({user: state.user});

const mapDispatchToProps = (dispatch) => {
  const { signIn, signOut } = actions;
  return bindActionCreators({signIn, signOut}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
