/**
 * This is the main file/root file for client side project.
 */
import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from "lodash";

import actions from '../actions';

import RouteLayout         from "./RouteLayout";
import RouteLandingPage    from "./RouteLandingPage";
import RouteHome           from "./RouteHome";
import RouteElement        from "./RouteElement";
import RouteArticleDisplay from "./RouteArticleDisplay";
import RouteArticleEdit    from "./RouteArticleEdit";
import RouteCourseDisplay  from "./RouteCourseDisplay";
import RouteCourseEdit     from "./RouteCourseEdit";
import RouteClassroom      from "./RouteClassroom";

import ErrorPage           from "../components/ErrorPage";


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
      }
      return callback();
    }
    else if(elements.array.length === 0) {
      this.props.fetchElement({
        id: username,
        q : 'username'
      });

      return callback();
    }
    elements.array.map((element, index) => {
      if(element.username === username) {
        return callback();
      }

      if(elements.array.length === index + 1) {
        this.props.fetchElement({
          id: username,
          q : 'username'
        });
        return callback();
      }
    });
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
  onEnterArticleEdit(nextState, replace, callback) {
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
    let username = nextState.params.username;
    let elements = this.props.elements;

    if(username === this.props.user.username) {
      if(!this.props.user.isFetched) {
        this.props.fetchUser();
      }
      return callback();
    }
    else if(elements.array.length === 0) {
      this.props.fetchElement({
        id: username,
        q : 'username'
      });

      return callback();
    }
    elements.array.map((element, index) => {
      if(element.username === username) {
        return callback();
      }

      if(elements.array.length === index + 1) {
        this.props.fetchElement({
          id: username,
          q : 'username'
        });
        return callback();
      }
    });
  }

  render () {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={RouteLayout}>
          <IndexRoute getComponent={(nextState, callback) => {
            if(this.props.user.isSignedIn) {
              callback(null, RouteHome);
            }
            else {
              callback(null, RouteLandingPage);
            }
          }}/>

          <Route
            path     ="articles/:articleId"
            component={RouteArticleDisplay}
            onEnter  ={this.onEnterArticle.bind(this)}
          />

          <Route
            path     ="articles/:articleId/edit"
            component={RouteArticleEdit}
            onEnter  ={this.onEnterArticleEdit.bind(this)}
          />

          <Route
            path     ="courses/:courseId"
            component={RouteCourseDisplay}
            onEnter  ={this.onEnterCourse.bind(this)}
          />
          <Route
            path     ="courses/:courseId/edit"
            component={RouteCourseEdit}
            onEnter  ={this.onEnterCourse.bind(this)}
          />

          <Route
            path     =":username"
            component={RouteElement}
            onEnter  ={this.onEnterElement.bind(this)}
          />
          <Route
            path     =":username/classroom"
            component={RouteClassroom}
            onEnter  ={this.onEnterClassroom.bind(this)}
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