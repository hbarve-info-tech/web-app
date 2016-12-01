"use strict";
import React, { Component, PropTypes }  from "react";
import { Link }  from "react-router";
import {
  Grid, Row, Col,
  Well, Panel, PanelGroup,
  Button, Modal, Tabs,
  Tab, FormGroup, FormControl,
  Form, ControlLabel
} from "react-bootstrap";

import {
  Editor,
  EditorState,
  convertToRaw,
  convertFromRaw,
  KeyBindingUtil,
  Modifier,
  AtomicBlockUtils,
  Entity,
} from 'draft-js';


export default class CourseModuleDisplayBox extends Component {
  constructor(props) {
    super(props);
  };

  configureModule(moduleId) {
    let module = this.props.modules.find(module => module.moduleId == moduleId);

    let moduleData = module.moduleData;
    let keys = Object.keys(moduleData);
    this.setState({
      module: module,
      editorState: (keys.length !== 0) ? EditorState.createWithContent(convertFromRaw(moduleData)) : EditorState.createEmpty()
    });
  }

  componentWillMount() {
    this.configureModule(this.props.displayModuleId);
  }
  componentWillReceiveProps(nextProps) {
    this.configureModule(nextProps.displayModuleId);
  }

  render() {
    const { editorState } = this.state;

    return (
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">{this.state.module.moduleName}</h3>
        </div>
        <div class="box-body">
          <Editor
            ref        ="editor"
            editorState={editorState}
            placeholder="Module goes here..."
            readOnly   ={true}
          />
        </div>
      </div>
    );
  };
}
