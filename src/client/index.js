
// TODO: use performance.now() in place of Date.now()
// TODO: PM2 for monitoring node.js app, (http://pm2.keymetrics.io/)
// TODO: use Flow js for type checking (flowtype.org)
// TODO: use immutable-js for client side data types (http://facebook.github.io/immutable-js/)

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import 'draft-js/dist/Draft.css';
import './stylesheet.css';

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
}
