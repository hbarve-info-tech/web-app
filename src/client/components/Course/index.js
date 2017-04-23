
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../../actions';

import Error from '../Error';
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
      // this.props.fetchModules({ courseId, token });
    }
  }

  render() {
    const { courseId } = this.props.routeParams;
    const user = this.props.elements[0];
    const course = this.props.courses.find(a => a.courseId === parseInt(courseId, 10));

    if (course.statusCode === 200) {
      console.log(course);

      return (
        <div
          className="mdl-grid"
          style={style.course}
        >
          <div className="mdl-cell mdl-cell--3-col mdl-cell--3-col-tablet mdl-cell--4-col-phone">
            {/*<CourseInfo*/}
              {/*course={course}*/}
              {/*user={user}*/}
              {/*updateCourse={this.props.updateCourse}*/}
            {/*/>*/}
          </div>
          <div className="mdl-cell mdl-cell--7-col mdl-cell--5-col-tablet mdl-cell--4-col-phone" >
            {/*<ModuleList*/}
              {/*user={user}*/}
              {/*course={course}*/}
              {/*createModule={this.props.createModule}*/}
              {/*updateModule={this.props.updateModule}*/}
            {/*/>*/}
          </div>
        </div>
      );
    }

    return (
      <div className="mdl-grid mdl-shadow--4dp">
        <div className="mdl-cell mdl-cell--8-col mdl-cell--6-col-tablet mdl-cell--4-col-phone">
          <Error {...course} />
        </div>
        <div className="mdl-cell mdl-cell--4-col mdl-cell--2-col-tablet mdl-cell--4-col-phone" />
      </div>
    );
  }
}

CoursePage.propTypes = {
  elements: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  routeParams: PropTypes.shape({
    courseId: PropTypes.string.isRequired,
  }).isRequired,
  updateCourse: PropTypes.func.isRequired,
  fetchCourse: PropTypes.func.isRequired,
  fetchModules: PropTypes.func.isRequired,
  updateModule: PropTypes.func.isRequired,
  createModule: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
