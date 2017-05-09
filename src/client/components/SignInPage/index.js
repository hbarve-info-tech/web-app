
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import Component from 'react/lib/ReactComponent';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HeaderRow from '../Header/HeaderRow';
import actions from '../../actions';

class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      invalid: true,
    };

    this.onChange = this.onChange.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  componentWillReceiveProps({ elements }) {
    const user = elements[0];
    if (user.isSignedIn === true) {
      window.location.href = '/';
    }
  }

  onChange(key, e) {
    const username = key === 'username' ? e.target.value : this.state.username;
    const password = key === 'password' ? e.target.value : this.state.password;

    this.setState({ username, password });

    const usernameRegexp = new RegExp('^[a-z0-9]+([_]?[a-z0-9])*$');
    const passwordRegexp = new RegExp('^[a-z0-9]+([a-z0-9])*$');

    if (usernameRegexp.test(username) && passwordRegexp.test(password)) {
      if (username.length > 2 && username.length <= 20
        && password.length >= 5 && password.length <= 20) {
        this.setState({ invalid: false });
      } else {
        this.setState({ invalid: true });
      }
    } else {
      this.setState({ invalid: true });
    }
  }

  signIn() {
    const { username, password } = this.state;
    this.props.signIn({ username, password });
  }

  render() {
    const { username, password, invalid } = this.state;
    const user = this.props.elements[0];

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--no-drawer-button">
        <header className="mdl-layout__header">
          <HeaderRow/>
        </header>
        <main className="mdl-layout__content">
          <div className="page-content">
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--4-col mdl-cell--4-offset-desktop">
                <div className="mdl-card mdl-shadow--4dp">
                  <div className="mdl-card__title">
                    <h2 className="mdl-card__title-text">Sign In</h2>
                  </div>
                  <div className="mdl-card__supporting-text">
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style={{width: '100%'}}>
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
                    Please use lowercase alphabets, length must be greater than 3 and less then 20.
                  </span>
                    </div>

                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style={{width: '100%'}}>
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
                    Please use lowercase alphabets, length must be greater than 3 and less then 20.
                  </span>
                    </div>
                  </div>
                  <div className="mdl-card__actions mdl-card--border" style={{textAlign: 'right'}}>
                    <button
                      type="button"
                      className="mdl-button"
                      disabled={invalid}
                      onClick={this.signIn}
                    >
                      {user.isSigningIn ? 'Signing In...' : 'Sign In'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  };
}

const mapStateToProps = state => state;
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
