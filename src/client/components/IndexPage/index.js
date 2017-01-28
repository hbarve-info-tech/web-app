
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import { connect } from 'react-redux';

import LandingPage from '../LandingPage';
import Home from '../Home';

const IndexPage = ({ user }) => {
  if (user.isSignedIn) {
    return <Home />;
  }
  return <LandingPage />;
};

IndexPage.propTypes = {
  user: PropTypes.shape({
    isSignedIn: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps)(IndexPage);
