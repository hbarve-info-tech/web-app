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

import ViewHome      from "./ViewHome";
import ViewElement   from "./ViewElement";
import ViewArticle   from "./ViewArticle";
import ViewCourse    from "./ViewCourse";
import ViewClassroom from "./ViewClassroom";


import actions from '../actions';


class App extends Component {
  constructor (props) {
    super(props);
  }

  onEnterElement(nextState, replace, callback) {
    let username = nextState.params.username;
    let elements = this.props.elements;

    if(username === this.props.user.username) {
      if(!this.props.user.isFetched) {
        this.props.fetchUser();

        return callback();
      }
    }
    else if(elements.array.length === 0) {
      this.props.fetchElement({
        id: username,
        q : 'username'
      });

      return callback();
    }
    else {
      elements.array.map((element, index) => {
        if(element.username === username) {
          return callback();
        }

        if(elements.array.length === index + 1) {
          this.props.fetchElement({
            id: username,
            q : 'username'
          });
          callback();
        }
      });
    }
  }
  onEnterCourse (nextState, replace, callback) {
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
  onEnterClassroom(nextState, replace, callback) {
    callback();
  }


  render () {
    let { user } = this.props;
    return (
      <Router history={browserHistory}>
        <Route path="/">
          <IndexRoute
            component={LandingPage}
            onEnter={()=>{
                        if(user.isSignedIn) {
                          window.location.href='/' + user.username;
                        }
                      }}
          />

          <Route
            path     =":username"
            component={ViewElement}
            onEnter  ={this.onEnterElement.bind(this)}
          />

          <Route
            path      ="articles/:articleId"
            component ={ViewArticle}
            onEnter   ={this.onEnterArticle.bind(this)}
          />

          <Route
            path     =":username/classroom"
            component={ViewClassroom}
            onEnter  ={this.onEnterClassroom.bind(this)}
          />

          <Route
            path     ="courses/:courseId"
            component={ViewCourse}
          />
        </Route>
      </Router>
    );
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