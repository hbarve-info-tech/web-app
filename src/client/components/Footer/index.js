"use strict";
const IsClient = typeof document === "object";

import React, { Component } from 'react';

if(IsClient) {
  require('./Footer.scss');
}

export default class Footer extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <footer class="mdl-mini-footer">
        <div class="mdl-mini-footer__left-section">
          <div class="mdl-logo">Title</div>
          <ul class="mdl-mini-footer__link-list">
            <li><a href="#">Help</a></li>
            <li><a href="#">Privacy & Terms</a></li>
          </ul>
        </div>
      </footer>
    );
  }
};
