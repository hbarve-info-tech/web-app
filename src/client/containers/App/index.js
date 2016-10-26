/**
 * This is the main file/root file for client side project.
 */
import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LandingPage from "../LandingPage";
import Layout  from "../Layout";
// import Home    from "../Home";


import actions from '../../actions';


class App extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    let { isSignedIn } = this.props.user;



    if(isSignedIn === true) {
      return (
        <Router history={browserHistory}>
          <Route path="/" component={Layout}>
            <IndexRoute
              component={() => <div>Home</div>}
            />
          </Route>
        </Router>
      );
    }
    else {
      return (
        <Router history={browserHistory}>

          <Route path="/" component={LandingPage}/>

        </Router>
      );
    }
  };
}


function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    actions,
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);