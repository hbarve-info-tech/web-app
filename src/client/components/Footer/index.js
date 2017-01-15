"use strict";
import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";

export default class Layout extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <Navbar>
        <Navbar.Collapse>
          <Navbar.Text>
            Copyright: <Navbar.Link href="#">Mayash</Navbar.Link>
          </Navbar.Text>
          <Navbar.Text pullRight>
            Transforming education.
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  }
};
