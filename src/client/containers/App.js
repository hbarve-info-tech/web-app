"use strict";
import React, { Component } from 'react';
import { Router, browserHistory } from 'react-router';
import routes from '../routes/index';

export default class App extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
    );
  }
};
