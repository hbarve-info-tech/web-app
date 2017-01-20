
import React from 'react';
import { connect } from 'react-redux';

import LandingPage from '../components/LandingPage';
import Home from '../components/Home';

const IndexPage = ({ user }) => {
  if (user.isSignedIn) {
    return <Home />;
  }
  return <LandingPage />;
};

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps)(IndexPage);
