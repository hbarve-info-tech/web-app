"use strict";
import React, { Component } from 'react';
import { connect } from 'react-redux';

import LandingPage from "../components/LandingPage";
import Home        from "../components/Home";

const IndexPage = ({user}) => user.isSignedIn ? <Home/> : <LandingPage/>;

const mapStateToProps = (state) => ({user: state.user});

export default connect(mapStateToProps)(IndexPage);
