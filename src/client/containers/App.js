
import React from 'react';
import { Router, browserHistory } from 'react-router';
import routes from '../routes/index';

export default () => (<Router history={browserHistory} routes={routes} />);
