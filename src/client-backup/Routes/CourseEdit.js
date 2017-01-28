"use strict";
import React, { Component, PropTypes }  from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from "lodash";

import { Row, Col } from "react-bootstrap";

import actions    from '../actions';

import CourseInfoBoxEdit from "../components/CourseInfoBoxEdit";
import CourseModulesBoxEdit  from "../components/CourseModulesBoxEdit";
import CourseModuleDisplayBoxEdit from "../components/CourseModuleDisplayBoxEdit";

class RouteCourseEdit extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  };

  configureState = ({routeParams, courses}) => {
    let { courseId } = routeParams;
    let course = courses.array.find(course => course.courseId == courseId);
    this.setState({course});

    if(course && course.modules.length > 0) {
      this.setState({
        displayModuleId: course.modules[0].moduleId
      });
    }
  };

  componentWillMount () {
    this.configureState(this.props);
    this.props.fetchModules(this.props.routeParams.courseId);
  }
  componentWillReceiveProps (nextProps) {
    this.configureState(nextProps);
  }

  onSelectModule = (moduleId) => {
    this.setState({displayModuleId: moduleId});
  };

  render () {
    let courseId = this.props.routeParams.courseId;
    let course   = _.find(this.props.courses.array, (e) => e.courseId == courseId);

    return (
      <section class="content">
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <CourseInfoBoxEdit
              course={course}
              updateCourse={this.props.updateCourse}
            />
          </Col>
          <Col xs={12} sm={4} md={4} lg={4}>
            <CourseModulesBoxEdit
              course         ={course}
              displayModuleId={this.state.displayModuleId}
              onSelect       ={this.onSelectModule.bind(this)}
              createModule   ={this.props.createModule}
            />
          </Col>
          <Col xs={12} sm={8} md={8} lg={8}>
            {this.state.course.modules.length > 0 ?
              <CourseModuleDisplayBoxEdit
                course         ={course}
                displayModuleId={this.state.displayModuleId}
                updateModule   ={this.props.updateModule}
              /> : null}
          </Col>
        </Row>
      </section>
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
)(RouteCourseEdit);