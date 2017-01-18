"use strict";
const IsClient = typeof document === "object";

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

if(IsClient) {
  require('./Drawer.scss');
}

class Drawer extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div class="mdl-layout__drawer">
        <span class="mdl-layout-title">Mayash</span>
        <nav class="mdl-navigation">
          <a class="mdl-navigation__link" href="">Introduction</a>
          <a class="mdl-navigation__link" href="">About us</a>
          <a class="mdl-navigation__link" href="">Product & Services</a>
          <a class="mdl-navigation__link" href="">Team</a>
          <a class="mdl-navigation__link" href="">Sponsors</a>
          <a class="mdl-navigation__link" href="">Customer Reviews</a>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Drawer);
