
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../../actions';

import User from './User';
import Org from './Org';
import Edu from './Edu';
import Field from './Field';

import ErrorPage from '../ErrorPage';

class ClassroomPage extends Component {

  render() {
    const { username } = this.props.routeParams;
    const element = this.props.elements.find(e => e.username === username);

    if (!element || element.statusCode !== 200) {
      return (<ErrorPage {...element} />);
    }

    if (element.classroom !== true) {
      return (
        <ErrorPage
          statusCode={'404'}
          error={'This Element is not having Classroom Feature.'}
          message={'This Element is not having Classroom Feature.'}
        />
      );
    }

    if (element.elementType === 'user') {
      return <User {...this.props} />
    }

    if (element.elementType === 'circle' && element.circleType === 'edu') {
      return <Edu {...this.props} />;
    }

    if (element.elementType === 'circle' && element.circleType === 'org') {
      return <Org {...this.props} />;
    }

    if (element.elementType === 'circle' && element.circleType === 'field') {
      return <Field {...this.props} />;
    }
  }
}

ClassroomPage.propTypes = {
  routeParams: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  elements: PropTypes.array.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClassroomPage);
