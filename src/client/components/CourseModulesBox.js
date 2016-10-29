"use strict";
import React, { Component, PropTypes }  from "react";
import { Link }  from "react-router";
import { Grid, Row, Col,
  Well, Panel, PanelGroup,
  Button, Modal, Tabs,
  Tab, FormGroup, FormControl,
  Form, ControlLabel } from "react-bootstrap";

export default class CourseModulesBox extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showModal: false,
      moduleName: ''
    };
  }

  componentWillMount = () => {
    this.setState({
      course: this.props.course
    });
  };
  componentWillReceiveProps = (nextProps) => {
    this.setState({
      course: nextProps.course
    });

    if(nextProps.course.isCreated) {
      this.onClose();
    }
  };

  onShow()  {
    this.setState({
      showModal: true
    });
  }
  onClose() {
    this.setState({
      showModal: false,
      moduleName: ''
    });
  };
  onChange(e) {
    this.setState({
      moduleName: e.target.value
    });
  };
  onSubmit(e) {
    e.preventDefault();
    this.props.createModule(
      this.state.course.courseId,
      {
        moduleName: this.state.moduleName
      }
    );
  };

  render() {
    let addModule = () => (
      <div class="box-tools pull-right">
        <button
          type="button"
          class="btn btn-box-tool"
          data-widget="collapse"
          onClick={this.onShow.bind(this)}
        >
          <i class="fa fa-plus-circle" aria-hidden="true"/>
        </button>
      </div>
    );
    let moduleList = () => {
      if(this.state.course.modules.length === 0) {
        return "Loading...";
      }

      return this.state.course.modules.map((module, index) => {
        return (
          <Button
            bsSize ="small"
            bsStyle="success"
            key    ={module.moduleId}
            onClick={(e) => {
              e.preventDefault();
              this.props.onSelect(module.moduleId);
            }}
            block
            disabled={this.props.displayModuleId === module.moduleId}
          >
            {module.moduleName}
          </Button>
        );
      })
    };

    return (
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">Modules</h3>
          {this.state.course.authorId === this.props.user.id ? addModule() : ''}
        </div>
        <div class="box-body">
          {moduleList()}
        </div>

        <Modal show={this.state.showModal}>
          <Modal.Body>

            <div style={{padding: '3%'}}>
              <Form
                horizontal
                onSubmit={this.onSubmit.bind(this)}
              >

                <FormGroup controlId="formControlsNewModule">
                  <ControlLabel>Module Name:</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    placeholder="Module Name"
                    minLength={1}
                    maxLength={148}
                    value    ={this.state.moduleName}
                    onChange ={this.onChange.bind(this)}
                    rows     ={3}
                    style    ={{resize: 'none'}}
                  />
                </FormGroup>

                <FormGroup>
                  <div style={{textAlign: 'center'}}>
                    {this.state.course.error}
                    {' '}
                    {this.state.course.message}
                  </div>
                  <div style={{textAlign: 'right'}}>
                    <Button
                      type   ="submit"
                      bsStyle="primary"
                      bsSize ="small"
                    >
                      Create
                    </Button>
                    {' '}
                    <Button
                      type   ="reset"
                      bsStyle="danger"
                      bsSize ="small"
                      onClick={this.onClose.bind(this)}
                    >
                      Cancel
                    </Button>
                  </div>
                </FormGroup>

              </Form>
            </div>

          </Modal.Body>
        </Modal>
      </div>
    );
  };
}
