"use strict";
import React, { Component, PropTypes }  from "react";
import { Link }  from "react-router";

import {
  EditorState,
  convertToRaw,
  convertFromRaw
} from 'draft-js';

import 'draft-js/dist/Draft.css';

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
      readOnly: true,
      editorState
    });
  }

  componentWillMount() {
    this.configureModule(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.configureModule(nextProps);
  }

  onClickEdit(e) {
    e.preventDefault();
    this.setState({readOnly: false});
  }
  onClickSave(e) {
    e.preventDefault();
    this.setState({readOnly: true});
    let articleData = convertToRaw(this.state.editorState.getCurrentContent());

    this.props.updateArticle(
      this.state.article.articleId,
      {articleData}
    );
  }

  render() {
    const { editorState, readOnly } = this.state;

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

    return (
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">{this.state.article.articleName}</h3>
          {this.props.user.id === this.props.article.authorId ? !this.state.readOnly ? saveButton : editButton : ''}
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
              readOnly     ={readOnly}
              placeholder  ="Write your story..."
              onChange     ={this.onChange.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  };
}
