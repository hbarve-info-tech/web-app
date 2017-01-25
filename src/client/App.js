
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import routes from './components/Routes';

const App = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
