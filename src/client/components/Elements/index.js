
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
  componentDidMount() {
    const { username } = this.props.routeParams;
    const element = this.props.elements.find(e => e.username === username);
    const { token } = this.props.elements[0];

    if (element.isFetched) {
      // this.props.getPosts({ id: element.id, token });
    }
  }
  
  render() {
    const { username } = this.props.routeParams;
    const element = this.props.elements.find(e => e.username === username);

    if (!element || element.statusCode !== 200) {
      return (<ErrorPage {...element} />);
    }

    if (element.elementType === 'user') {
      return <User />;
    }

    if (element.elementType === 'circle' && element.circleType === 'edu') {
      return <CircleEdu/>;
    }

    if (element.elementType === 'circle' && element.circleType === 'org') {
      return <CircleOrg/>;
    }

    if (element.elementType === 'circle' && element.circleType === 'field') {
      return <CircleField/>;
    }

    if (element.elementType === 'circle' && element.circleType === 'location') {
      return <CircleLocation/>;
    }
  }
}

ElementPage.propTypes = {
  routeParams: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  elements: PropTypes.array,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ElementPage);
