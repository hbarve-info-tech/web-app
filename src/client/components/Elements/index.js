
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../../actions';

import User from './User';
import CircleEdu from './CircleEdu';
import CircleOrg from './CircleOrg';
import CircleField from './CircleField';
import CircleLocation from './CircleLocation';

import ProfileInfo from '../ProfileInfo';
import Timeline from '../Timeline';
import ErrorPage from '../ErrorPage';

class ElementPage extends Component {

  render() {
    const { username } = this.props.routeParams;
    const element = this.props.elements.find(e => e.username === username);

    if (!element || element.statusCode !== 200) {
      return (<ErrorPage {...element} />);
    }

    if (element.elementType === 'user') {
      return <User {...this.props} />;
    }

    if (element.elementType === 'circle' && element.circleType === 'edu') {
      return <CircleEdu {...this.props} />;
    }

    if (element.elementType === 'circle' && element.circleType === 'org') {
      return <CircleOrg {...this.props} />;
    }

    if (element.elementType === 'circle' && element.circleType === 'field') {
      return <CircleField {...this.props} />;
    }

    if (element.elementType === 'circle' && element.circleType === 'location') {
      return <CircleLocation {...this.props} />;
    }
  }
}

ElementPage.propTypes = {
  routeParams: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  elements: PropTypes.array,
  posts: PropTypes.array,
  courses: PropTypes.array,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ElementPage);
