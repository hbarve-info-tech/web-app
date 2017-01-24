
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import configureStore from './store/configureStore';
import Root from './containers/Root';

const IsClient = typeof document === 'object';

const initialState = window.__INITIAL_STATE__;
delete window.__INITIAL_STATE__;

const store = configureStore(initialState);

if (IsClient) {
  require('material-design-lite/src/material-design-lite.scss');
  // require('material-design-lite/dist/material.blue-lime.min.css');
}

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} />
    </AppContainer>,
    document.getElementById('app'),
  );
};

render(Root);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const Root = require('./containers/Root').default;
    render(Root);
  });
}
  