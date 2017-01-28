
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
    const { token } = this.props.user;
    const { courseId } = this.props.routeParams;
    const course = this.props.courses.array.find(a => a.courseId === parseInt(courseId, 10));

    if (course.isFetched && !course.isModulesFetched) {
      this.props.fetchModules({ courseId, token });
    }
  }

  render() {
    const { courseId } = this.props.routeParams;
    const { user } = this.props;
    const course = this.props.courses.array.find(a => a.courseId === parseInt(courseId, 10));

    if (course.statusCode === 200) {
      return (
        <div
          className="mdl-grid mdl-shadow--4dp"
          style={style.course}
        >
          <div className="mdl-cell mdl-cell--3-col mdl-cell--3-col-tablet mdl-cell--4-col-phone">
            <CourseInfo
              course={course}
              user={user}
              updateCourse={this.props.updateCourse}
            />
          </div>
          <div className="mdl-cell mdl-cell--7-col mdl-cell--5-col-tablet mdl-cell--4-col-phone" >
            <ModuleList
              user={user}
              course={course}
              updateModule={this.props.updateModule}
            />
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
  user: PropTypes.shape({
    token: PropTypes.string.isRequired,
  }).isRequired,
  courses: PropTypes.shape({
    array: PropTypes.arrayOf(PropTypes.object),
    isCreating: PropTypes.bool,
    isUpdating: PropTypes.bool,
    isFetching: PropTypes.bool,
    isDeleting: PropTypes.bool,
    isCreated: PropTypes.bool,
    isUpdated: PropTypes.bool,
    isFetched: PropTypes.bool,
    isDeleted: PropTypes.bool,
    isError: PropTypes.bool,
    error: PropTypes.string,
    message: PropTypes.string,
    lastUpdated: PropTypes.number,
  }).isRequired,
  routeParams: PropTypes.shape({
    courseId: PropTypes.string.isRequired,
  }).isRequired,
  updateCourse: PropTypes.func.isRequired,
  fetchCourse: PropTypes.func.isRequired,
  fetchModules: PropTypes.func.isRequired,
  updateModule: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
