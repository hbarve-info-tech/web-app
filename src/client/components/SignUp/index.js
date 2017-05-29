
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import Component from 'react/lib/ReactComponent';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      invalid: true,
      statusCode: 0,
      error: '',
      message: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(key, e) {
    const email = key === 'email' ? e.target.value : this.state.email;

    this.setState({ email });
  }

  onSubmit() {
    const { username, password } = this.state;
    const temp = (params) => {
      this.setState({...params});
    }

    // fetch('/api/signin', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ username, password }),
    // })
    //   .then(response => response.json())
    //   .then(json => {
    //     if (json.statusCode === 200) {
    //       signInSuccess(json.payload);
    //     }
    //     else if (json.statusCode >= 400) {
    //       temp({ ...json });
    //     }
    //   });
  }

  render() {
    const { email, invalid, statusCode, error, message } = this.state;

    return (
      <div className="mdl-card">
        <div className="mdl-card__supporting-text">
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style={{width: '100%'}}>
            <input
              className="mdl-textfield__input"
              type="email"
              value={email}
              onChange={this.onChange.bind(this, 'email')}
            />
            <label className="mdl-textfield__label">Email</label>
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
            Sign Up
          </button>
        </div>
      </div>
    );
  };
}

export default SignUp;
