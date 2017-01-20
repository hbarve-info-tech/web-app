"use strict";
import React, { Component, PropTypes }  from "react";
import { Button } from "react-bootstrap";

export default class CourseModulesBox extends Component {

  render () {
    let modules = this.props.modules;

    return (
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">Modules</h3>
        </div>
        <div class="box-body">
          {modules.length ?
            modules.map((module, index) => {
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
            }) : null}
        </div>
      </div>
    );
  }
}
