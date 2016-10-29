"use strict";
import React, { Component, PropTypes }  from "react";
import { Link }  from "react-router";
import { Grid, Row, Col, Well, Image,
  Button, Modal, Form,
  FormGroup, FormControl, HelpBlock, ControlLabel } from "react-bootstrap";

import CourseCreateForm from "../components/CourseCreateForm";


export default class CourseCreateButton extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  openModal() {
    this.setState({
      showModal: true
    });
  }
  closeModal() {
    this.setState({
      showModal: false
    });
  }

  render() {
    return (
      <div>
        <div>
          <Button
            bsStyle="success"
            bsSize ="small"
            onClick={this.openModal.bind(this)}
          >
            Create Course
          </Button>
        </div>
        <Modal
          bsSize="large"
          show={this.state.showModal}
          onHide={this.closeModal.bind(this)}
        >
          <Modal.Body>
            <CourseCreateForm
              courses      = {this.props.courses}
              createCourse = {this.props.createCourse}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
