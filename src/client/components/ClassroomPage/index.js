
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../../actions';

import ProfileInfo from '../ProfileInfo';
import CreateCourse from '../Create/CreateCourse';
import Timeline from '../Timeline';

import User from './User';
import Org from './Org';
import Edu from './Edu';
import Field from './Field';

import ErrorPage from '../ErrorPage';

class ClassroomPage extends Component {

  render() {
    const { username } = this.props.routeParams;
    const user = this.props.elements[0];
    const element = this.props.elements.find(e => e.username === username);

    if (element.statusCode !== 200) {
      return (<ErrorPage {...element} />);
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

    console.log(element);

    if (element.elementType === 'user') {
      return <User />
    }

    if (element.elementType === 'circle' && element.circleType === 'edu') {
      return <Edu/>;
    }

    if (element.elementType === 'circle' && element.circleType === 'org') {
      return <Org/>;
    }

    if (element.elementType === 'circle' && element.circleType === 'field') {
      return <Field/>;
    }
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
