/**
 * This is the main file/root file for client side project.
 */
"use strict";
import React        from 'react';
import { render }   from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configureStore';

import Root  from "./containers/Root";

import "./stylesheets/index.scss";
import "bootswatch/paper/bootstrap.css";


const store = configureStore();


render(
  <AppContainer>
    <Root store={store}/>
  </AppContainer>,
  document.getElementById('app')
);

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

