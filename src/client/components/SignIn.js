"use strict";
import React, { Component, PropTypes }  from "react";
import { Link }  from "react-router";
import { Col, Form,
  FormGroup, FormControl, HelpBlock, Button } from "react-bootstrap";

export default class SignIn extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      usernameInvalid: null,
      usernameError  : '',

      password: '',
      passwordInvalid: null,
      passwordError  : '',

      formInvalid: true,
      formError  : ''
    };
  }

  validateForm     = (usernameInvalid, passwordInvalid) => {
    if(usernameInvalid === false && passwordInvalid === false) {
      this.setState({
        formInvalid: false,
        formError  :''
      });
    }
    else {
      this.setState({
        formInvalid: true,
        formError  :'Form is Invalid.'
      });
    }
  };
  validateUsername = (username) => {
    let usernameRegex = new RegExp("[^a-zA-Z0-9_]");

    if(username === '') {
      this.setState({
        usernameInvalid : true,
        usernameError   : 'Username should not be empty.',
        formInvalid     : true
      });
    }
    else if(username.length < 3) {
      this.setState({
        usernameInvalid : true,
        usernameError   : 'Username length should greater that 3.',
        formInvalid     : true
      });
    }
    else if(usernameRegex.test(username)) {
      this.setState({
        usernameInvalid : true,
        usernameError   : "Invalid username, only a-z, A-Z, 0-9, '_' are allowed",
        formInvalid     : true
      });
    }
    else {
      this.setState({
        usernameInvalid : false,
        usernameError   : '',
        formInvalid: this.state.usernameInvalid && this.state.passwordInvalid
      });
    }
  };
  validatePassword = (password) => {
    let regexPassword = new RegExp("[^a-zA-Z0-9_]");

    if(password === '') {
      this.setState({
        passwordInvalid : true,
        passwordError   : "Password can't be empty.",
        formInvalid     : true
      });
    }
    else if(password.length < 5) {
      this.setState({
        passwordInvalid : true,
        passwordError   : 'Password length should greater that 5.',
        formInvalid     : true
      });
    }
    else if(regexPassword.test(password)) {
      this.setState({
        passwordInvalid : true,
        passwordError   : "Invalid password, only a-z, A-Z, 0-9, '_' are allowed",
        formInvalid     : true
      });
    }
    else {
      this.setState({
        passwordInvalid : false,
        passwordError   : '',
        formInvalid     : this.state.usernameInvalid && this.state.passwordInvalid
      });
    }
  };

  onChangeUsername = (e) => {
    e.preventDefault();
    this.setState({
      username : e.target.value
    });
    this.validateUsername(e.target.value);
  };
  onChangePassword = (e) => {
    this.setState({
      password: e.target.value
    });
    this.validatePassword(e.target.value);
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.signIn({
      username: this.state.username,
      password: this.state.password
    });
  };

  render () {
    return (
    <Form
      horizontal={true}
      onSubmit={this.onSubmit.bind(this)}
    >
      <FormGroup
        controlId="formHorizontalUsername"
        validationState={(() => {
          let usernameInvalid = this.state.usernameInvalid;
          if(usernameInvalid === false) {
            return "success";
          }
          else if(usernameInvalid === true) {
            return "error";
          }
        })()}
      >
        <Col
          xs={10} xsOffset={1}
          sm={10} smOffset={1}
          md={10} mdOffset={1}
          lg={10} lgOffset={1}
        >
          <FormControl
            type="text"
            placeholder="Username"
            required={true}
            minLength={3}
            maxLength={20}
            onChange={this.onChangeUsername.bind(this)}
          />
          {this.state.usernameInvalid && <HelpBlock>{this.state.usernameError}</HelpBlock>}
        </Col>
      </FormGroup>

      <FormGroup
        controlId="formHorizontalPassword"
        validationState={(() => {
          let passwordInvalid = this.state.passwordInvalid;
          if(passwordInvalid === false) {
            return "success";
          }
          else if(passwordInvalid === true) {
            return "error";
          }
        })()}
      >
        <Col
          xs={10} xsOffset={1}
          sm={10} smOffset={1}
          md={10} mdOffset={1}
          lg={10} lgOffset={1}
        >
          <FormControl
            type="password"
            placeholder="Password"
            required={true}
            minLength={5}
            maxLength={20}
            onChange={this.onChangePassword.bind(this)}
          />
          {this.state.passwordInvalid && <HelpBlock>{this.state.passwordError}</HelpBlock>}
        </Col>
      </FormGroup>

      <FormGroup>
        <Col
          xs={10} xsOffset={1}
          sm={10} smOffset={1}
          md={10} mdOffset={1}
          lg={10} lgOffset={1}
          style={{
            position: 'relative'
          }}
        >
          <div style={{textAlign: 'center'}}>
            {this.props.user.isError && this.props.user.errorMessage}
          </div>
          <div style={{textAlign:'right'}}>
            <Button
              type="submit"
              bsStyle="primary"
              disabled={this.state.formInvalid || this.props.user.isFetching}
            >
              {this.props.user.isFetching ? 'Signing In...' : 'Sign In'}
            </Button>
          </div>
        </Col>
      </FormGroup>
    </Form>
    );
  };
}
