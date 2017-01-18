"use strict";
const IsClient = typeof document === "object";

import React        from 'react';
import { render }   from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import configureStore from './store/configureStore';
import Root from "./containers/Root";

const store = configureStore();

if(IsClient) {
  require('material-design-lite/src/material-design-lite.scss');
  // require('material-design-lite/dist/material.blue-lime.min.css');
}

render(
  <AppContainer>
    <Root store={store}/>
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const Root = require('./containers/Root').default;
    render(
      <AppContainer>
        <Root store={store}/>
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
