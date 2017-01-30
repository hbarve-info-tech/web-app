
// TODO: use performance.now() in place of Date.now()
// TODO: PM2 for monitoring node.js app, (http://pm2.keymetrics.io/)
// TODO: use Flow js for type checking (flowtype.org)
// TODO: use immutable-js for client side data types (http://facebook.github.io/immutable-js/)

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import App from './App';

const initialState = window.__INITIAL_STATE__;
// delete window.__INITIAL_STATE__;

const store = configureStore(initialState);

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('app'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    const App = require('./App').default;
    render(App);
  });

  // Hide react-router error in React-hot-reloading.
  const orgError = console.error;
  console.error = (...args) => {
    if (args && args.length === 1 && typeof args[0] === 'string' && args[0].indexOf('Warning: [react-router] You cannot change <Router routes>; it will be ignored') > -1) {
      // React route changed
    }
    else {
      // Log the error as normally
      orgError.apply(console, args);
    }
  };
}
