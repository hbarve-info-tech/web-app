"use strict";
import React, { Component, PropTypes }  from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from "lodash";

import {
  convertToRaw, CompositeDecorator,
  ContentState, Editor,
  EditorState, Entity,
  RichUtils, getDefaultKeyBinding,
  KeyBindingUtil } from 'draft-js';

import { Row, Col } from "react-bootstrap";

import actions    from '../actions';

import CourseInfoBox    from "../components/CourseInfoBox";
import CourseModulesBox from "../components/CourseModulesBox";
import CourseModuleDisplayBox from "../components/CourseModuleDisplayBox";

class RouteCourseDisplay extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  };

  configureState = ({courses, routeParams}) => {
    let course = courses.array.find(course => course.courseId == routeParams.courseId);
    this.setState({course});

    if(course && course.modules.length > 0) {
      this.setState({
        displayModuleId: course.modules[0].moduleId
      });
    }
  };

  componentWillMount () {
    this.configureState(this.props);
    let courseId = this.props.routeParams.courseId;
    let course = _.find(this.props.courses.array, (course) => course.courseId == courseId);
    this.props.fetchModules(course.courseId);

  }

  componentWillReceiveProps (nextProps) {
    this.configureState(nextProps);
  }

  onSelectModule = (moduleId) => {
    this.setState({
      displayModuleId: moduleId
    });
  };

  render () {
    let courseId = this.props.routeParams.courseId;
    let course = this.props.courses.array.find((course) => course.courseId == courseId);

    return (
      <section class="content">
        <Row>
          <Col xs={12} sm={4} md={4} lg={4}>
            <CourseInfoBox {...course}/>
            <CourseModulesBox
              modules        ={course.modules}
              displayModuleId={this.state.displayModuleId}
              onSelect       ={this.onSelectModule.bind(this)}
            />
          </Col>
          <Col xs={12} sm={8} md={8} lg={8}>
            {this.state.course.modules.length ?
              <CourseModuleDisplayBox
                modules        ={course.modules}
                displayModuleId={this.state.displayModuleId}
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
)(RouteCourseDisplay);