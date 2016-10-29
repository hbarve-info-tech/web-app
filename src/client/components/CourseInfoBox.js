"use strict";
import React, { Component, PropTypes }  from "react";
import { Link }  from "react-router";
import { Grid, Row, Col,
  Well, Panel, PanelGroup,
  Button, Modal, Tabs,
  Tab, FormGroup, FormControl,
  Form, ControlLabel } from "react-bootstrap";

export default class CourseInfoBox extends Component {
  constructor (props) {
    super(props);
    this.state = {
      //'true' for only view of of info,
      //else 'false' for editing the content.
      button: true,
      buttonSave: false
    };
  }

  componentWillMount = () => {
    let course = this.props.course;
    course = Object.assign({}, course);
    this.setState({course});
  };
  componentWillReceiveProps = (nextProps) => {
    let course = nextProps.course;
    course = Object.assign({}, course);
    this.setState({course});

    if(this.props.course.isUpdated) {
      this.setState({button: true});
    }

  };

  buttonDisabled = (newCourse) => {
    let oldCourse = this.props.course;

    this.setState({
      buttonSave: oldCourse.courseName  !== newCourse.courseName ||
                      oldCourse.level       !== newCourse.level      ||
                      oldCourse.standard    !== newCourse.standard   ||
                      oldCourse.description !== newCourse.description
    });
  };

  onChangeCourseName        = (e) => {
    let course        = this.state.course;
    course.courseName = e.target.value;
    this.setState({
      course
    });
    this.buttonDisabled(course);
  };
  onChangeCourseDescription = (e) => {
    let course        = this.state.course;
    course.description = e.target.value;
    this.setState({
      course
    });
    this.buttonDisabled(course);
  };
  onChangeCourseLevel       = (e) => {
    let course        = this.state.course;
    course.level = Number(e.target.value);
    this.setState({
      course
    });
    this.buttonDisabled(course);
  };
  onChangeCourseStandard    = (e) => {
    let course         = this.state.course;
    course.standard = e.target.value;
    this.setState({
      course
    });
    this.buttonDisabled(course);
  };

  courseInfoEdit   = () => {
    return (
      <div>
        <Form>
          <FormGroup controlId="formHorizontalCourseName">
            <ControlLabel>Course Name:</ControlLabel>
            <FormControl
              componentClass="textarea"
              placeholder="Course Name"
              value={this.state.course.courseName}
              onChange={this.onChangeCourseName.bind(this)}
              rows={3}
              style={{resize: 'none'}}
            />
          </FormGroup>

          <FormGroup controlId="formHorizontalLevel">
            <ControlLabel>Difficulty Level:</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              value={this.state.course.level}
              onChange={this.onChangeCourseLevel.bind(this)}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </FormControl>
          </FormGroup>

          <FormGroup controlId="formHorizontalStandard">
            <ControlLabel>Course Standard:</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              value={this.state.course.standard}
              onChange={this.onChangeCourseStandard.bind(this)}
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="higher-secondary">Higher Secondary</option>
              <option value="graduation">Graduation</option>
              <option value="post-graduation">Post Graduation</option>
              <option value="phd">PHD</option>
            </FormControl>
          </FormGroup>

          <FormGroup controlId="formHorizontalDescription">
            <ControlLabel>Course Description:</ControlLabel>
            <FormControl
              componentClass="textarea"
              placeholder="Course Description."
              value={this.state.course.description}
              onChange={this.onChangeCourseDescription.bind(this)}
              rows={5}
              style={{resize: 'none'}}
            />
          </FormGroup>
        </Form>
      </div>
    );
  };
  courseInfoView   = () => {
    return (
      <div>
        <div class="course-name">
          <strong>Name:</strong> {this.state.course.courseName}
        </div>
        <div class="course-level">
          <strong>Difficulty Level:</strong> {this.state.course.level}
        </div>
        <div class="course-standard">
          <strong>Course Standard:</strong> {this.state.course.standard}
        </div>
        <div class="course-description">
          <strong>Description:</strong> {this.state.course.description}
        </div>
      </div>
    );
  };

  onSave() {
    let payload = {};

    payload.courseName  = this.state.course.courseName;
    payload.level       = this.state.course.level;
    payload.standard    = this.state.course.standard;
    payload.description = this.state.course.description;

    this.props.updateCourse(this.state.course.courseId, payload);
  }

  render() {

    let cancelButton = () => (
      <div class="box-tools pull-right">
        <button
          type       ="button"
          class      ="btn btn-box-tool"
          data-widget="collapse"
          onClick    ={(e) => {
            e.preventDefault();
            this.setState({button: true})
          }}
        >
          <i class="fa fa-reply" aria-hidden="true"/>
        </button>
      </div>
    );
    let saveButton = () => (
      <div class="box-tools pull-right">
        <button
          type       ="button"
          class      ="btn btn-box-tool"
          data-widget="collapse"
          onClick    ={this.onSave.bind(this)}
        >
          <i class="fa fa-floppy-o" aria-hidden="true"/>
        </button>
      </div>
    );
    let editButton = () => (
      <div class="box-tools pull-right">
        <button
          type="button"
          class="btn btn-box-tool"
          data-widget="collapse"
          onClick ={(e) => {
            e.preventDefault();
            this.setState({button: false})
          }}
        >
          <i class="fa fa-pencil-square-o" aria-hidden="true"/>
        </button>
      </div>
    );

    return (
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">Course Info</h3>
          {this.state.course.authorId === this.props.user.id ?
            this.state.button ? editButton() : this.state.buttonSave ? saveButton() : cancelButton()
            : ''}
        </div>
        <div class="box-body">
          {this.state.button === true ? this.courseInfoView() : this.courseInfoEdit()}
        </div>
      </div>
    );
  }
}
