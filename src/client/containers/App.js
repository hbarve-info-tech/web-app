/**
 * This is the main file/root file for client side project.
 */
import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LandingPage from "../components/LandingPage";
import Layout  from "./Layout";
import Home    from "./Home";
import Course  from "./Course";
import Article from "./Article";
import Element from "./Element";
import Classroom from "./Classroom";


import actions from '../actions';


class App extends Component {
  constructor (props) {
    super(props);
  }

  onEnterCourse(nextState, replace, callback) {
    let courseId = nextState.params.courseId;

    if(this.props.courses.array.length === 0) {
      this.props.fetchCourse({
        courseId: courseId
      });

      return callback();
    }

    this.props.courses.array.map((course, index) => {
      if(course.courseId === courseId) {
        return callback();
      }

      if(this.props.courses.array.length === index + 1) {
        this.props.fetchCourse({
          courseId: courseId
        });

        return callback();
      }

    });

  }
  onEnterArticle(nextState, replace, callback) {
    let articleId = nextState.params.articleId;

    if(this.props.articles.array.length === 0) {
      this.props.fetchArticle({
        articleId
      });

      return callback();
    }

    this.props.articles.array.map((article, index) => {
      if(article.articleId === articleId) {
        return callback();
      }

      if(this.props.articles.array.length === index + 1) {
        this.props.fetchArticle({
          articleId
        });

        return callback();
      }

    });

  }


  render () {
    if(this.props.user.isSignedIn === true) {
      return (
        <Router history={browserHistory}>
          <Route path="/" component={Layout}>
            <IndexRoute
              component={Home}
            />

            <Route path ="/:username" component ={Element}/>

            <Route path="/:username/classroom" component={Classroom} />

            <Route
              path="courses/:courseId"
              component={Course}
              onEnter={this.onEnterCourse.bind(this)}
            />

            <Route
              path      ="articles/:articleId"
              component ={Article}
              onEnter   ={this.onEnterArticle.bind(this)}
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