"use strict";
import React, { Component, PropTypes }  from "react";
import { Link }  from "react-router";
import { Tabs, Tab, DropdownButton, Button, MenuItem, ButtonToolbar } from "react-bootstrap";

export default class PostCreate extends Component {
  constructor (props) {
    super(props);
    this.state = {
      textarea : '',
      error    : '',
      invalid  : true
    };
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  onChange(e) {
    e.preventDefault();
    let textarea = e.target.value;
    this.setState({textarea});

    if(textarea === '') {
      this.setState({
        invalid : true,
        error   : 'Heading should not be empty.'
      });
    }
    else {
      this.setState({
        invalid : false,
        error   : ''
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.createArticle({
      articleName : this.state.textarea
    });
  }

  render () {
    return (
      <div class="box box-primary">
        <div class="box-body">
          <textarea
            style      ={{
              width: '100%',
              fontSize: '14px',
              lineHeight: '18px',
              border: '1px solid rgb(221, 221, 221)',
              padding: '10px',
              resize : 'none'
            }}
            rows       ={3}
            required   ={true}
            minLength  ={1}
            maxLength  ={148}
            placeholder='Write Something...'
            onChange   ={this.onChange.bind(this)}
          />
          <div style={{textAlign: 'right'}}>
            <Button
              bsStyle ="primary"
              bsSize  ="small"
              disabled={this.state.invalid}
              onClick ={this.onSubmit.bind(this)}
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    );
  };
}
