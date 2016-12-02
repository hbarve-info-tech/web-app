"use strict";
import React, { Component, PropTypes }  from "react";
import _ from "lodash";
import {
  Editor,
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
  KeyBindingUtil,
  Modifier,
  AtomicBlockUtils,
  Entity,
} from 'draft-js';


export default class CourseModuleDisplayBoxEdit extends Component {
  constructor(props) {
    super(props);
    this.sideButtons = [];
    this.onChange = (editorState) => this.setState({ editorState });
  };

  configureModule(moduleId) {
    this.setState({
      course: this.props.course
    });

    let module = _.find(this.props.course.modules, (module, index) => module.moduleId == moduleId);

    let moduleData = module.moduleData;
    this.setState({
      module: module,
      editorState: (moduleData !== undefined) ? EditorState.createWithContent(convertFromRaw(moduleData)) : EditorState.createEmpty(),
      editorEnabled: false
    });
  }


  componentWillMount() {
    this.configureModule(this.props.displayModuleId);
  }
  componentWillReceiveProps(nextProps) {
    this.configureModule(nextProps.displayModuleId);
  }

  onClickEdit(e) {
    e.preventDefault();
    this.setState({editorEnabled: true});
  }
  onClickSave(e) {
    e.preventDefault();
    this.setState({editorEnabled: false});
    let moduleData = convertToRaw(this.state.editorState.getCurrentContent());
    let courseId = this.state.course.courseId;
    let moduleId = this.state.module.moduleId;
    this.props.updateModule(courseId,moduleId,{moduleData});
  }

  render() {
    let editButton =  (
      <div class="box-tools pull-right">
        <button
          type="button"
          class="btn btn-box-tool"
          data-widget="collapse"
          onClick={this.onClickEdit.bind(this)}
        >
          <i class="fa fa-pencil-square-o" aria-hidden="true"/>
        </button>
      </div>
    );
    let saveButton =  (
      <div class="box-tools pull-right">
        <button
          type="button"
          class="btn btn-box-tool"
          data-widget="collapse"
          onClick={this.onClickSave.bind(this)}
        >
          <i class="fa fa-floppy-o" aria-hidden="true"/>
        </button>
      </div>
    );

    const { editorState, editorEnabled } = this.state;

    return (
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">{this.state.module.moduleName}</h3>
          {this.state.editorEnabled ? saveButton : editButton}
        </div>
        <div class="box-body">
          <Editor
            ref          ="editor"
            editorState  ={editorState}
            onChange     ={this.onChange.bind(this)}
            editorEnabled={editorEnabled}
            placeholder  ="Module goes here..."
          />
        </div>
      </div>
    );
  };
}
