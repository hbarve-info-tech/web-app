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
      this.props.fetchElement({username});

      return callback();
    }
    elements.array.map((element, index) => {
      if(element.username === username) {
        return callback();
      }

      if(elements.array.length === index + 1) {
        this.props.fetchElement({username});
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

  getComponentArticleEdit(nextState, callback) {
    if(!this.props.user.isSignedIn) {
      browserHistory.push('/');
    }

    let { articleId }    = nextState.params;
    let { fetchArticle } = this.props;
    articleId = parseInt(articleId);

    if(this.props.articles.array.length === 0) {
      fetchArticle({articleId});
    }

    let count = 0;
    let wait = setInterval(() => {
      let article = this.props.articles.array.find(article => article.articleId == articleId);

      if(!article) {
        fetchArticle({articleId});
      }

      if(article && article.isFetched) {
        clearInterval(wait);
        return callback(null, RouteArticleEdit);
      }
      if(article && article.isError) {
        clearInterval(wait);
        return callback(null, props => <ErrorPage />);
      }
      if(++count > 100) {
        clearInterval(wait);
        return callback(null, props => <ErrorPage statusCode="400"
                                                  messageHeading='Server is taking too long to respond.'/>);
      }
    }, 200);
  }
  getComponentClassroom(nextState, callback) {
    let { username }        = nextState.params;
    let { fetchElement, fetchCourses, fetchClassroomCourses } = this.props;

    if(this.props.elements.array.length === 0) {
      fetchElement({username});
    }

    let count = 0;
    let wait = setInterval(() => {
      let element = this.props.elements.array.find(element => element.username === username);

      if(!element) {
        fetchElement({username});
      }

      if(element && element.isFetched) {
        clearInterval(wait);
        if(element.elementType == "user") {
          fetchCourses(element.id);
        }
        else {
          fetchClassroomCourses({id: element.id});
        }

        return callback(null, RouteClassroom);
      }
      if(element && element.isError) {
        clearInterval(wait);
        return callback(null, props => <ErrorPage />);
      }
      if(++count > 100) {
        clearInterval(wait);
        return callback(null, props => <ErrorPage statusCode="400"
                                                  messageHeading='Server is taking too long to respond.'/>);
      }
    }, 200);
  }
  getComponentCourseDisplay(nextState, callback) {
    let courseId = nextState.params.courseId;
    this.props.fetchCourse({courseId});
    let count = 0;

    let wait = setInterval(()=> {
      let course = _.find(this.props.courses.array, (course) => course.courseId == courseId);

      if(course.isFetched) {
        clearInterval(wait);
        callback(null, RouteCourseDisplay);
      }
      if(course.isError) {
        clearInterval(wait);
        callback(null, ErrorPage({statusCode: 404}));
      }
      if(++count > 100) {
        clearInterval(wait);
        callback(null, ErrorPage({statusCode: 400, messageHeading: 'Server is taking too long to respond.'}));
      }

    }, 100);
  }
  getComponentCourseEdit(nextState, callback) {
    let courseId = nextState.params.courseId;

    let course = _.find(this.props.courses.array, (e) => e.courseId == courseId);

    if(course) {
      if(this.props.user.id == course.authorId) {
        return callback(null, RouteCourseEdit);
      }

      return callback(null, ErrorPage({
        statusCode    : 400,
        messageHeading: 'Not Authorised'
      }));
    }
    else {
      this.props.fetchCourse({courseId});
      let count = 0;

      let wait = setInterval(()=> {
        let course = _.find(this.props.courses.array, (course) => course.courseId == courseId);

        if(course.isFetched) {
          clearInterval(wait);
          if(this.props.user.id != course.authorId) {
            return callback(null, ErrorPage({
              statusCode: 400,
              messageHeading: 'Not Authorised'
            }));
          }

          return callback(null, RouteCourseEdit);
        }
        if(course.isError) {
          clearInterval(wait);
          return callback(null, ErrorPage({statusCode: 400}));
        }
        if(++count > 100) {
          clearInterval(wait);
          return callback(null, ErrorPage({statusCode: 401}));
        }
      }, 100);
    }
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
            getComponent={this.getComponentArticleEdit.bind(this)}
          />

          <Route
            path     ="courses/:courseId"
            getComponent={this.getComponentCourseDisplay.bind(this)}
          />
          <Route
            path     ="courses/:courseId/edit"
            getComponent={this.getComponentCourseEdit.bind(this)}
          />

          <Route
            path     =":username"
            component={RouteElement}
            onEnter  ={this.onEnterElement.bind(this)}
          />
          <Route
            path        =":username/classroom"
            getComponent={this.getComponentClassroom.bind(this)}
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