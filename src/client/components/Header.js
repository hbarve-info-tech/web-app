"use strict";
import React, { Component, PropTypes }  from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, browserHistory } from "react-router";

import actions from '../actions';

import SignIn from "../components/SignIn";

import Navbar      from "react-bootstrap/lib/Navbar";
import Nav         from "react-bootstrap/lib/Nav";
import NavItem     from "react-bootstrap/lib/NavItem";
import NavDropdown from "react-bootstrap/lib/NavDropdown";
import MenuItem    from "react-bootstrap/lib/MenuItem";
import { Modal, Tabs, Tab } from "react-bootstrap";


class Header extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showModel: false
    };
  }

  close = () => {
    this.setState({
      showModal: false
    });
  };

  open  = () => {
    this.setState({
      showModal: true
    });
  };

  validateUser = () => {
    if(this.props.user.isSignedIn === true) {
      return (
        <NavDropdown eventKey={3}
                     title={this.props.user.name} id="header-user-info">
          <MenuItem eventKey={3.1}
                    href="/settings"
                    onClick={(e) => {
                      e.preventDefault();
                      browserHistory.push('/settings');
                    }}
          >
            Settings
          </MenuItem>
          <MenuItem divider />
          <MenuItem
            eventKey={3.3}
            onClick={() => browserHistory.push('/')}
          >
            Sign Out
          </MenuItem>
        </NavDropdown>
      );
    }
    else {
      return (
        <NavItem
          eventKey={1}
          href="/signin"
          onClick={(e) => {
            e.preventDefault();
            this.open();
          }}
        >
          Sign In
        </NavItem>
      );
    }
  };

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.user.isSignedIn) {
      this.close();
    }
  }

  render () {
    return (
      <header class="main-header">
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  browserHistory.push('/');
                }}
              >
                Mayash &beta;eta
              </a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {/*Add user account info here.*/}
              {this.validateUser()}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Modal
          show={this.state.showModal}
        >
          <Modal.Body>
            <div
              style={{
                position : 'absolute',
                top      : '10%',
                right    : '6%'
              }}
              onClick={this.close.bind(this)}
            >
              <i class="fa fa-times" aria-hidden="true"></i>
            </div>
            <Tabs
              defaultActiveKey={1}
              animation={false}
              id="signin-signup-modal"
            >
              <Tab eventKey={1} title="Sign In">
                <div style={{padding: '3%'}}>
                  <SignIn
                    signIn={this.props.signIn}
                    user={this.props.user}
                  />
                </div>
              </Tab>
            </Tabs>
          </Modal.Body>
        </Modal>
      </header>
    );
  };
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {signIn: actions.signIn},
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
