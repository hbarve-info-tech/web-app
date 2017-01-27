/* eslint import/no-extraneous-dependencies: "warn" */

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const composeEnhancers = composeWithDevTools({
  realtime: true,
  hostname: 'localhost',
  port: 5002,
});

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
);

export default function (initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default),
    );
  }

  return store;
}
