
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import { connect } from 'react-redux';

import LandingPage from '../LandingPage';
import Home from '../Home';

const IndexPage = ({ elements }) => {
  // if (elements[0].isSignedIn) {
  //   return <Home />;
  // }
  return <LandingPage />;
};

IndexPage.propTypes = {
  elements: PropTypes.array.isRequired,
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(IndexPage);
