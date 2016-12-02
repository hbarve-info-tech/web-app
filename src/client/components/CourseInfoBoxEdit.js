"use strict";
import React, { Component, PropTypes }  from "react";
import { Col, Button, FormGroup, FormControl, Form, ControlLabel } from "react-bootstrap";

export default class CourseInfoBox extends Component {
  constructor (props) {
    super(props);
    this.state = {
      enabled: false
    };
  }

  componentWillMount = () => {
    this.setState({course: {...this.props.course}});
  };
  componentWillReceiveProps = (nextProps) => {
    this.setState({course: {...nextProps.course}});

    if(this.props.course.isUpdated) {
      this.setState({enabled: false});
    }
  };

  buttonDisabled = (newCourse) => {
    let oldCourse = this.props.course;

    this.setState({
      enabled: oldCourse.courseName  !== newCourse.courseName || oldCourse.level       != newCourse.level      ||
               oldCourse.standard    !== newCourse.standard   || oldCourse.description !== newCourse.description
    });
  };

  onChange = (key, e) => {
    let course  = this.state.course;
    course[key] = e.target.value;
    this.setState({course});
    this.buttonDisabled(course);
  };
  onSave   = ()       => {
    let payload = {};

    payload.courseName  = this.state.course.courseName;
    payload.level       = this.state.course.level;
    payload.standard    = this.state.course.standard;
    payload.description = this.state.course.description;

    this.props.updateCourse(this.state.course.courseId, payload);
  };

  render() {
    return (
      <div class="box box-primary">
        <div class="box-body">
          <Form horizontal>
            <FormGroup controlId="formHorizontalCourseName">
              <Col xs={2} sm={2} md={2} lg={2} style={{textAlign: 'right'}}>
                <ControlLabel>Course Name:</ControlLabel>
              </Col>
              <Col xs={10} sm={10} md={10} lg={10}>
                <FormControl
                  componentClass="textarea"
                  placeholder="Course Name"
                  value   ={this.state.course.courseName}
                  onChange={this.onChange.bind(this, 'courseName')}
                  rows    ={3}
                  style   ={{resize: 'none'}}
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalLevel">
              <Col xs={2} sm={2} md={2} lg={2} style={{textAlign: 'right'}}>
                <ControlLabel>Difficulty Level:</ControlLabel>
              </Col>
              <Col xs={10} sm={10} md={10} lg={10}>
                <FormControl
                  componentClass="select"
                  placeholder="select"
                  value={this.state.course.level}
                  onChange={this.onChange.bind(this, 'level')}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </FormControl>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalStandard">
              <Col xs={2} sm={2} md={2} lg={2} style={{textAlign: 'right'}}>
                <ControlLabel>Course Standard:</ControlLabel>
              </Col>
              <Col xs={10} sm={10} md={10} lg={10}>
                <FormControl
                  componentClass="select"
                  placeholder="select"
                  value={this.state.course.standard}
                  onChange={this.onChange.bind(this, 'standard')}
                >
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="higher-secondary">Higher Secondary</option>
                  <option value="graduation">Graduation</option>
                  <option value="post-graduation">Post Graduation</option>
                  <option value="phd">PHD</option>
                </FormControl>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalDescription">
              <Col xs={2} sm={2} md={2} lg={2} style={{textAlign: 'right'}}>
                <ControlLabel>Course Description:</ControlLabel>
              </Col>
              <Col xs={10} sm={10} md={10} lg={10}>
                <FormControl
                  componentClass="textarea"
                  placeholder="Course Description."
                  value={this.state.course.description}
                  onChange={this.onChange.bind(this, 'description')}
                  rows={5}
                  style={{resize: 'none'}}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col xs={12} style={{textAlign: 'right'}}>
                <Button
                  bsStyle="primary"
                  bsSize ="small"
                  disabled={!this.state.enabled}
                >
                  Save
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  };
}
