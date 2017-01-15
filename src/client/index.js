"use strict";
import React        from 'react';
import { render }   from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import configureStore from './store/configureStore';
import Root from "./containers/Root";

const store = configureStore();

// import "bootstrap/dist/css/bootstrap.css";
// import "bootswatch/paper/bootstrap.css";
// import "bootstrap/dist/css/bootstrap-theme.min.css";

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
