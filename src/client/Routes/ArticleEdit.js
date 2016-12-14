"use strict";
import React, { Component, PropTypes }  from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getToken, getUserId } from "../apis";

import {
  convertToRaw,
  CompositeDecorator,
  ContentState,
  EditorState,
  Entity,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil
} from 'draft-js';

import { Row, Col, Button, Form, FormControl, FormGroup, ControlLabel, HelpBlock } from "react-bootstrap";

import 'medium-draft/lib/index.css';
import {
  ImageSideButton,
  Block,
  addNewBlock,
  createEditorState,
  Editor,
} from 'medium-draft';

import actions from '../actions';

class CustomImageSideButton extends ImageSideButton {
  onChange(e) {
    const file = e.target.files[0];
    if(file.type.indexOf('image/') === 0) {
      fetch(`/api/elements/${getUserId()}/images`, {
          method : 'POST',
          headers: {
            'Authorization': getToken()
          },
          body   : file
        })
        .then(response => response.json())
        .then(json => {
          console.log(json);
          if(json.statusCode === 200) {
            const { authorId, imageId } = json.payload;

            const src = `/api/elements/${authorId}/images/${imageId}`;
            this.props.setEditorState(addNewBlock(
              this.props.getEditorState(),
              Block.IMAGE, { src }
            ));
          }
          else {
            console.log(json);
          }
        });
    }
    this.props.close();
  }
}

class BasicArticleInfo extends Component {
  constructor (props) {
    super(props);
    this.state = {
      enabled: false,
      article: {}
    };
  }

  componentWillMount() {
    this.setState({
      article: {...this.props.article}
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      article: {...nextProps.article}
    });
  }

  disableFormButton(newArticle) {
    let oldArticle = this.props.article;

    this.setState({
      enabled: newArticle.articleName !== oldArticle.articleName || newArticle.description !== oldArticle.description
    });
  }
  onChange = (key, e) => {
    let { article } = this.state;
    article[key] = e.target.value;
    this.setState({article});
    this.disableFormButton(article);
  };

  onSubmit(e) {
    e.preventDefault();
    let { articleId, articleName, description } = this.state.article;
    let payload = {};
    if(this.props.article.articleName !== articleName) {
      payload = {
        ...payload,
        articleName
      }
    }
    if(this.props.article.description !== description) {
      payload = {
        ...payload,
        description
      }
    }
    this.props.updateArticle(articleId, payload);
  }

  render() {
    let { articleName, description } = this.state.article;

    return (
      <Form
        onSubmit={this.onSubmit.bind(this)}
      >
        <FormGroup
          controlId="courseName"
        >
          <ControlLabel>Name: </ControlLabel>
          <FormControl
            componentClass="textarea"
            placeholder   ="Article Name"
            value         ={articleName}
            onChange      ={this.onChange.bind(this, 'articleName')}
          />
        </FormGroup>

        <FormGroup
          controlId="description"
        >
          <ControlLabel>Description: </ControlLabel>
          <FormControl
            componentClass="textarea"
            placeholder   ="Article Description"
            value         ={description}
            onChange      ={this.onChange.bind(this, 'description')}
          />
        </FormGroup>

        <div style={{textAlign: 'right'}}>
          <Button
            type    ="submit"
            disabled={!this.state.enabled}
          >
            Save
          </Button>
        </div>
      </Form>
    );
  };
}

class ArticleEditor extends Component {
  constructor (props) {
    super(props);
    this.state = {
      editorState  : createEditorState(),
      editorEnabled: true,
      placeholder  : 'Story goes here...',
    };
    this.sideButtons = [{
      title: 'Image',
      component: CustomImageSideButton,
    }];

    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  configureState({articleData}) {
    this.setState({
      editorState: (Object.keys(articleData).length != 0 ? createEditorState(articleData) : createEditorState())
    });
  }
  componentWillMount() {
    this.configureState(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.configureState(nextProps);
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  onSave() {
    let { articleId } = this.props;
    let payload = {
      articleData: convertToRaw(this.state.editorState.getCurrentContent())
    };
    this.props.updateArticle(articleId, payload);
  }

  render() {
    let { editorState, editorEnabled, placeholder } = this.state;

    return (
      <div>
        <div>
          <Editor
            ref             ="editor"
            editorState     ={editorState}
            editorEnabled   ={editorEnabled}
            onChange        ={this.onChange}
            sideButtons     ={this.sideButtons}
            handleKeyCommand={this.handleKeyCommand}
            placeholder     ={placeholder}
          />
        </div>
        <div style={{textAlign: 'right'}}>
          <Button
            onClick={this.onSave.bind(this)}
          >
            Save
          </Button>
        </div>
      </div>
    );
  };
}

class RouteArticleEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  configureState = ({articles, routeParams}) => {
    let { articleId } = routeParams;
    let article = articles.array.find(article => article.articleId == articleId);
    this.setState({article});
  };
  componentWillMount() {
    this.configureState(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.configureState(nextProps);
  }

  render () {
    let { article } = this.state;

    return (
      <section class="content">
        <Row>
          <Col xs={12} sm={12} md={9} lg={9}>
            <div class="box box-primary">
              <div class="box-header">
                <BasicArticleInfo
                  article       ={article}
                  updateArticle ={this.props.updateArticle}
                />
              </div>
              <div class="box box-body">
                <ArticleEditor
                  articleId    ={article.articleId}
                  articleData  ={article.articleData}
                  updateArticle={this.props.updateArticle}
                />
              </div>
            </div>
          </Col>
          <Col xs={12} sm={3} md={3} lg={3}>

          </Col>
        </Row>
      </section>
    );
  };
}

const mapStateToProps    = (state)    => state;
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RouteArticleEdit);
