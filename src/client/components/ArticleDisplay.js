"use strict";
import React, { Component, PropTypes }  from "react";
import { Link }  from "react-router";

import {
  EditorState,
  convertToRaw,
  convertFromRaw
} from 'draft-js';

import MayashEditor from "../lib/Editor";

export default class ArticleDisplayBox extends Component {
  constructor(props) {
    super(props);
    this.state    = {
      editorState: EditorState.createEmpty()
    };
    this.onChange = (editorState) => this.setState({ editorState });
  };

  configureModule({article}) {
    let { articleData } = article;
    let editorState = EditorState.createEmpty();

    if(articleData !== undefined && articleData.length !== 0) {
      editorState = EditorState.createWithContent(convertFromRaw(articleData));
    }

    this.setState({
      article: article,
      editorState
    });
  }

  componentWillMount() {
    this.configureModule(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.configureModule(nextProps);
  }

  render() {
    const { editorState } = this.state;

    return (
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">{this.state.article.articleName}</h3>
        </div>
        <div class="box-body no-padding">
          {this.state.article.description ?
            (
              <div class="mailbox-read-info">
                <h5>
                  {this.state.article.description}
                  {/*<span class="mailbox-read-time pull-right">15 Feb. 2016 11:03 PM</span>*/}
                </h5>
              </div>
            ) : null
          }

          <div class="mailbox-read-message">
            <MayashEditor
              editorState  ={editorState}
              readOnly     ={true}
            />
          </div>
        </div>
      </div>
    );
  };
}
