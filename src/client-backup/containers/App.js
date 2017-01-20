/**
 * This is the main file/root file for client side project.
 */
import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from "lodash";

import actions from '../actions';

import Layout         from "../Routes/Layout";
import LandingPage    from "../Routes/LandingPage";
import Home           from "../Routes/Home";
import Element        from "../Routes/Element";
import ArticleDisplay from "../Routes/ArticleDisplay";
import ArticleEdit    from "../Routes/ArticleEdit";
import CourseDisplay  from "../Routes/CourseDisplay";
import CourseEdit     from "../Routes/CourseEdit";
import Classroom      from "../Routes/Classroom";

import ErrorPage      from "../components/ErrorPage";


class App extends Component {
  constructor (props) {
    super(props);
  }

  getComponentElement(nextState, callback) {
    let { username }     = nextState.params;
    let { fetchElement } = this.props;

    if(this.props.elements.array.length === 0) {
      fetchElement({username});
    }

    let count = 0;
    let wait = setInterval(() => {
      let element = this.props.elements.array.find(element => element.username == username);

      if(!element) {
        fetchElement({username});
      }

      if(element && element.isFetched) {
        clearInterval(wait);
        return callback(null, Element);
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

  getComponentArticleDisplay(nextState, callback) {
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
        return callback(null, ArticleDisplay);
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
        return callback(null, ArticleEdit);
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

        return callback(null, Classroom);
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
        callback(null, CourseDisplay);
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
        return callback(null, CourseEdit);
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

          return callback(null, CourseEdit);
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
        <Route path="/" component={Layout}>
          <IndexRoute getComponent={(nextState, callback) => {
            if(this.props.user.isSignedIn) {
              return callback(null, Home);
            }
            else {
              return callback(null, LandingPage);
            }
          }}/>

          <Route
            path        ="articles/:articleId"
            getComponent={this.getComponentArticleDisplay.bind(this)}
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
            path        =":username"
            getComponent={this.getComponentElement.bind(this)}
            onEnter     ={(nextState, replace, callback) => {
              let { username } = nextState.params;
              if(username.toLowerCase() == username) {
                return callback();
              }
              browserHistory.replace(username.toLowerCase());
            }}
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

const mapStateToProps    = (state)    => state;
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);