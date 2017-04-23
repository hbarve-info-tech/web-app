
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../../actions';

import ProfileInfo from '../ProfileInfo';
import CreateCourse from '../Create/CreateCourse';
import Timeline from '../Timeline';

class ClassroomPage extends Component {
  componentDidMount() {
    const { token } = this.props.elements[0];
    const { username } = this.props.routeParams;
    const element = this.props.elements.find(e => e.username === username);
    if (element.isFetched && element.classroom) {
      const { id } = element;
      if (element.elementType === 'user') {
        this.props.fetchCourses({ id, token });
      }
      else {
        this.props.fetchClassroomCourses({ id, token });
      }
    }
  }

  render() {
    const { username } = this.props.routeParams;
    const element = this.props.elements.find(e => e.username === username);

    if (element.statusCode === 404) {
      return (
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--8-col mdl-cell--6-col-tablet mdl-cell--4-col-phone">
            Not Found...
          </div>
          <div className="mdl-cell mdl-cell--4-col mdl-cell--2-col-tablet mdl-cell--4-col-phone" />
        </div>
      );
    }

    if (element.classroom !== true) {
      return (
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--8-col mdl-cell--6-col-tablet mdl-cell--4-col-phone">
            This element is not having classroom.
          </div>
          <div className="mdl-cell mdl-cell--4-col mdl-cell--2-col-tablet mdl-cell--4-col-phone" />
        </div>
      );
    }

    const courses = this.props.courses.filter((course) => {
      if (element.elementType === 'user') {
        return course.authorId === element.id;
      }
      return course.circleId === element.id;
    });

    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--2-col mdl-cell--2-col-tablet mdl-cell--4-col-phone">
          <ProfileInfo
            name={element.name}
            username={element.username}
            profilePic={element.profilePic}
            classroom={element.classroom || false}
          />
        </div>
        <div className="mdl-cell mdl-cell--8-col mdl-cell--5-col-tablet mdl-cell--4-col-phone">
          <CreateCourse type="course"/>
          <Timeline courses={courses} type="course"/>
        </div>
      </div>
    );
  }
}

ClassroomPage.propTypes = {
  routeParams: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  elements: PropTypes.array.isRequired,
  // fetchCourses: PropTypes.func,
  // fetchClassroomCourses: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClassroomPage);
