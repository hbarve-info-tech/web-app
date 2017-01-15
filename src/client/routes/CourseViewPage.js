"use strict";
import React, { Component } from 'react';


export default class ElementPage extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div>
        Element: {this.props.routeParams.username}
      </div>
    );
  }
};
