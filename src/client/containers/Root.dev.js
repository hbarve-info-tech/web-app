'use strict';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from './App';
import DevTools from './DevTools';

export default class Root extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    const { store } = this.props;

    if(process.env.REDUX == 'true') {
      return (
        <Provider store={store}>
          <div>
            <App />
            <DevTools />
          </div>
        </Provider>
      );
    }
    else {
      return (
        <Provider store={store}>
          <App />
        </Provider>
      );
    }
  }
}
