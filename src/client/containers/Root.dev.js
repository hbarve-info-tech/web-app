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

// const Root = () => <App/>;

// export default Root;

if (module.hot) {
  //Hide react-router error in React-hot-reloading.
  const orgError = console.error;
  console.error = (...args) => {
    if (args && args.length === 1 && typeof args[0] === "string" && args[0].indexOf('Warning: [react-router] You cannot change <Router routes>; it will be ignored') > -1) {
      // React route changed
    } else {
      // Log the error as normally
      orgError.apply(console, args);
    }
  };
}
