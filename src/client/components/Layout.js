"use strict";
import React, { Component } from 'react';


export default class Layout extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div>
        <header>Mayash Heading</header>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
};
