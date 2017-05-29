
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import Component from 'react/lib/ReactComponent';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../../actions';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      invalid: true,
      statusCode: 0,
      error: '',
      message: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  onSubmit() {
    const { username, password } = this.state;
    const { signInSuccess, signInError } = this.props;
    const temp = (params) => {
      this.setState({...params});
    }
    const { setState } = this;

    fetch('/api/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.statusCode === 200) {
          signInSuccess(json.payload);
        }
        else if (json.statusCode >= 400) {
          temp({ ...json });
        }
      });
  }

  render() {
    const { username, password, invalid, statusCode, error, message } = this.state;
    const user = this.props.elements[0];

    return (
      <div className="mdl-card">
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
        {message.length ? (
          <div className="mdl-card__supporting-text">
            <p>{statusCode}: {error || message}</p>
          </div>
        ) : null}
        <div className="mdl-card__actions mdl-card--border" style={{textAlign: 'right'}}>
          <button
            type="button"
            className="mdl-button"
            disabled={invalid}
            onClick={this.onSubmit}
          >
            {user.isSigningIn ? 'Signing In...' : 'Sign In'}
          </button>
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => state;
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
