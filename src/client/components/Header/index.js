"use strict";
const IsClient = typeof document === "object";

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

if(IsClient) {
  require('./Header.scss');
}

class Header extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">

          <span class="mdl-layout-title">Mayash</span>

          <div class="mdl-layout-spacer"></div>

          <nav class="mdl-navigation mdl-layout--large-screen-only">
            <a class="mdl-navigation__link" href="">Sign In</a>
          </nav>

          <button id="demo-menu-lower-right"
                  class="mdl-button mdl-js-button mdl-button--icon">
            <i class="material-icons">more_vert</i>
          </button>

          <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
              for="demo-menu-lower-right">
            <li class="mdl-menu__item">Some Action</li>
            <li class="mdl-menu__item">Another Action</li>
            <li disabled class="mdl-menu__item">Disabled Action</li>
            <li class="mdl-menu__item">Yet Another Action</li>
          </ul>
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Header);
