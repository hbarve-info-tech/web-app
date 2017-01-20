
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import DevTools from './DevTools';

const { REDUX } = process.env;

export default ({ store }) => {
  if (REDUX === 'true') {
    return (
      <Provider store={store}>
        <div>
          <App />
          <DevTools />
        </div>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

if (module.hot) {
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
