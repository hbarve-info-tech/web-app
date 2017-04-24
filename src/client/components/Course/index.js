
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../../actions';

import Error from '../Error';
import CourseIntroduction from './CourseIntroduction';
import Modules from './Modules';
import CourseInfo from './CourseInfo';
import ModuleList from './ModuleList';

import style from './style';

class CoursePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { isSignedIn, token } = this.props.elements[0];
    const { courseId } = this.props.routeParams;
    const course = this.props.courses.find(a => a.courseId === parseInt(courseId, 10));

    if (course.isFetched && !course.isModulesFetched) {
      this.props.getModules({ courseId, token });
    }
  }

  render() {
    const { courseId } = this.props.routeParams;
    const user = this.props.elements[0];
    const course = this.props.courses.find(a => a.courseId === parseInt(courseId, 10));

    if (course.statusCode !== 200) {
      return (
        <div className="mdl-grid mdl-shadow--4dp">
          <div className="mdl-cell mdl-cell--8-col mdl-cell--6-col-tablet mdl-cell--4-col-phone">
            <Error {...course} />
          </div>
          <div className="mdl-cell mdl-cell--4-col mdl-cell--2-col-tablet mdl-cell--4-col-phone" />
        </div>
      );
    }

    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--12--col mdl-cell--12-col-desktop mdl-cell--8-col-tablet mdl-cell--4-col-phone">
          <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
            <div className="mdl-tabs__tab-bar">
              <a href="#introduction" className="mdl-tabs__tab is-active">Introduction</a>
              <a href="#modules" className="mdl-tabs__tab">Modules</a>
              <a href="#discussion" className="mdl-tabs__tab">Discussion</a>
              <a href="#test-yourself" className="mdl-tabs__tab">Test Yourself</a>
              <a href="#course-feedback" className="mdl-tabs__tab">Feedback</a>
            </div>
            <div className="mdl-tabs__panel is-active" id="introduction">
              <CourseIntroduction {...user} course={course} />
            </div>
            <div className="mdl-tabs__panel" id="modules">
              <Modules user={user} course={course} />
            </div>
            <div className="mdl-tabs__panel" id="discussion">

            </div>
            <div className="mdl-tabs__panel" id="test-yourself">

            </div>
            <div className="mdl-tabs__panel" id="course-feedback">

            </div>
          </div>
        </div>
      </div>
    );
  }
}

CoursePage.propTypes = {
  routeParams: PropTypes.shape({
    courseId: PropTypes.string.isRequired,
  }).isRequired,
  elements: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  // updateCourse: PropTypes.func.isRequired,
  getCourse: PropTypes.func.isRequired,
  // fetchModules: PropTypes.func.isRequired,
  // updateModule: PropTypes.func.isRequired,
  // createModule: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
