"use strict";
import React, { Component, PropTypes }  from "react";
import { Link }  from "react-router";
import { Grid, Row, Col, Well, Image,
  Button, Modal, Form,
  FormGroup, FormControl, HelpBlock, ControlLabel } from "react-bootstrap";

export default class CreateCourseForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      courseName       : '',
      courseNameInvalid: null,
      courseNameError  : '',


      level       : 1,
      levelInvalid: null,
      levelError  : '',


      standard       : 'graduation',
      standardInvalid: null,
      standardError  : '',


      description       : '',
      descriptionInvalid: null,
      descriptionError  : '',

      formInvalid: true,
      formError  : ''
    };
  }

  onChangeCourseName = (e) => {
    e.preventDefault();
    let courseName = e.target.value;

    this.setState({
      courseName : courseName
    });

    if(courseName === '') {
      this.setState({
        courseNameInvalid : true,
        courseNameError   : 'Course Name should not be empty.',
        formInvalid       : true
      });
    }
    else {
      this.setState({
        courseNameInvalid : false,
        courseNameError   : '',

        formInvalid       : this.state.courseNameInvalid && this.state.levelInvalid &&
        this.state.descriptionInvalid && this.state.standardInvalid
      });
    }
  };
  onChangeLevel      = (e) => {
    e.preventDefault();

    this.setState({
      level : e.target.value
    });
  };
  onChangeStandard   = (e) => {
    e.preventDefault();

    this.setState({
      standard : e.target.value
    });
  };
  onChangeDescription= (e) => {
    e.preventDefault();
    let description = e.target.value;

    this.setState({
      description : description
    });

    if(description === '') {
      this.setState({
        descriptionInvalid : true,
        descriptionError   : 'Course Name should not be empty.',
        formInvalid        : true
      });
    }
    else {
      this.setState({
        descriptionInvalid : false,
        descriptionError   : '',

        formInvalid       : this.state.courseNameInvalid && this.state.levelInvalid &&
        this.state.descriptionInvalid && this.state.standardInvalid
      });
    }
  };

  onSubmit(e) {
    e.preventDefault();
    this.props.createCourse({
      courseName : this.state.courseName,
      description: this.state.description,
      level      : this.state.level,
      standard   : this.state.standard
    });
  }

  render () {
    return (
      <Form
        horizontal={true}
        onSubmit  ={this.onSubmit.bind(this)}
      >
        <FormGroup
          controlId="formControlsCourseName"
          validationState={(() => {
            let courseNameInvalid = this.state.courseNameInvalid;
            if(courseNameInvalid === false) {
              return "success";
            }
            else if(courseNameInvalid === true) {
              return "error";
            }
          })()}
        >
          <Col
            xs={10} xsOffset={1}
            sm={10} smOffset={1}
            md={10} mdOffset={1}
            lg={10} lgOffset={1}
          >
            <ControlLabel>Course Name: </ControlLabel>
            <FormControl
              componentClass="textarea"
              placeholder   ="Course Name"
              required      ={true}
              minLength     ={1}
              maxLength     ={148}
              onChange      ={this.onChangeCourseName.bind(this)}
              rows          ={3}
              style         ={{resize: 'none'}}
            />
            {this.state.courseNameInvalid && <HelpBlock>{this.state.courseNameError}</HelpBlock>}
          </Col>
        </FormGroup>

        <FormGroup
          controlId="formControlsDescription"
          validationState={(() => {
            let descriptionInvalid = this.state.descriptionInvalid;
            if(descriptionInvalid === false) {
              return "success";
            }
            else if(descriptionInvalid === true) {
              return "error";
            }
          })()}
        >
          <Col
            xs={10} xsOffset={1}
            sm={10} smOffset={1}
            md={10} mdOffset={1}
            lg={10} lgOffset={1}
          >
            <ControlLabel>Description</ControlLabel>
            <FormControl
              componentClass="textarea"
              placeholder   ="Course Description"
              required      ={true}
              minLength     ={1}
              maxLength     ={300}
              onChange      ={this.onChangeDescription.bind(this)}
              rows          ={5}
              style         ={{resize: 'none'}}
            />
            {this.state.descriptionInvalid && <HelpBlock>{this.state.descriptionError}</HelpBlock>}
          </Col>
        </FormGroup>

        <FormGroup controlId="formControlsLevel">
          <Col
            xs={10} xsOffset={1}
            sm={10} smOffset={1}
            md={10} mdOffset={1}
            lg={10} lgOffset={1}
          >
            <ControlLabel>Difficulty Level</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder   ="Select Difficulty Level"
              required      ={true}
              value         ={this.state.level}
              onChange      ={this.onChangeLevel.bind(this)}
            >
              <option value="1">Level 1, Introduction</option>
              <option value="2">Level 2, Detailed</option>
              <option value="3">Level 3, Advance</option>
              <option value="4">Level 4, Deep Learning</option>
              <option value="5">Level 5, Research</option>
            </FormControl>
          </Col>
        </FormGroup>

        <FormGroup controlId="formControlsStandard">
          <Col
            xs={10} xsOffset={1}
            sm={10} smOffset={1}
            md={10} mdOffset={1}
            lg={10} lgOffset={1}
          >
            <ControlLabel>Graduation Level</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder   ="Graduation Level"
              required      ={true}
              onChange      ={this.onChangeStandard.bind(this)}
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="higher-secondary">Higher Secondary</option>
              <option value="graduation">Graduation</option>
              <option value="post-graduation">Post Graduation</option>
              <option value="phd">Ph.D.</option>
            </FormControl>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col
            xs={10} xsOffset={1}
            sm={10} smOffset={1}
            md={10} mdOffset={1}
            lg={10} lgOffset={1}
            style={{
              position: 'relative'
            }}
          >
            <div style={{textAlign: 'center'}}>
              {this.props.courses.isError ? this.props.courses.error + ', ' + this.props.courses.message : ''}
            </div>
            <div style={{textAlign:'right'}}>
              <Button
                type    ="submit"
                bsStyle ="primary"
                disabled={this.state.formInvalid || this.props.courses.isCreatingCourse}
              >
                {this.props.courses.isCreatingCourse ? 'Creating...' : 'Create'}
              </Button>
            </div>
          </Col>
        </FormGroup>
      </Form>
    );
  };
}
