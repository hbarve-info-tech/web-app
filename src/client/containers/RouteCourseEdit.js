"use strict";
import React, { Component, PropTypes }  from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  convertToRaw, CompositeDecorator,
  ContentState, Editor,
  EditorState, Entity,
  RichUtils, getDefaultKeyBinding,
  KeyBindingUtil } from 'draft-js';
const {hasCommandModifier} = KeyBindingUtil;

import { Grid, Row, Col,
  Well, Panel, PanelGroup,
  Button, Modal, Tabs,
  Tab, FormGroup, FormControl,
  Form, ControlLabel } from "react-bootstrap";

import actions    from '../actions';

import CourseInfoBox    from "../components/CourseInfoBox";
import CourseModulesBox from "../components/CourseModulesBox";
import CourseModuleDisplayBox from "../components/CourseModuleDisplayBox";

class Course extends Component {
  constructor (props) {
    super(props);
    this.state = {
      displayModuleId: 'syllabus'
    };
  };

  configureState = (courseId) => {
    let courses = this.props.courses;

    courses.array.map((course, index) => {
      if(course.courseId == courseId) {
        this.setState({
          course
        });
      }
    });

  };

  componentWillMount () {
    let courseId = this.props.routeParams.courseId;
    this.configureState(courseId);

    this.props.courses.array.map((course, index) => {
      if(course.courseId === courseId) {
        this.props.fetchModules(course.courseId);
      }
    });

  }

  componentWillReceiveProps (nextProps) {
    this.configureState(nextProps.routeParams.courseId);
  }

  onSelectModule = (moduleId) => {
    this.state.course.modules.map((module, index) => {
      if(module.moduleId === moduleId) {
        this.setState({
          displayModuleId: moduleId
        });
      }
    });
  };

  render () {
    let courseId = this.props.routeParams.courseId;
    let course = {};

    this.props.courses.array.map((value, index) => {
      if(value.courseId == courseId) {
        course = value;
      }
    });

    return (
      <section class="content">
        <Row>
          <Col xs={12} sm={3} md={3} lg={3}>
            <CourseInfoBox
              user={this.props.user}
              course={course}
              updateCourse={this.props.updateCourse}
            />
            <CourseModulesBox
              user={this.props.user}
              course={course}
              displayModuleId={this.state.displayModuleId}
              onSelect={this.onSelectModule.bind(this)}
              createModule={this.props.createModule}
            />
          </Col>
          <Col xs={12} sm={9} md={9} lg={9}>
            {this.state.course.modules.length ?
              <CourseModuleDisplayBox
                user           ={this.props.user}
                course         ={course}
                displayModuleId={this.state.displayModuleId}
                updateModule   ={this.props.updateModule}
              /> : ''}
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
)(Course);