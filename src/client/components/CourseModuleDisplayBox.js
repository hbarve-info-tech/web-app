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
  EditorState,
  convertToRaw,
  convertFromRaw,
  KeyBindingUtil,
  Modifier,
  AtomicBlockUtils,
  Entity,
} from 'draft-js';

import 'draft-js/dist/Draft.css';

import {
  Editor,
  StringToTypeMap,
  Block,
  keyBindingFn,
  createEditorState,
  addNewBlockAt,
  beforeInput,
  getCurrentBlock,
  ImageSideButton,
  rendererFn,
} from 'medium-draft';


const newTypeMap = StringToTypeMap;
newTypeMap['2.'] = Block.OL;

const { hasCommandModifier } = KeyBindingUtil;

/*
 A demo for example editor. (Feature not built into medium-draft as too specific.)
 Convert quotes to curly quotes.
 */
const DQUOTE_START = '“';
const DQUOTE_END = '”';
const SQUOTE_START = '‘';
const SQUOTE_END = '’';

const handleBeforeInput = (editorState, str, onChange) => {
  if (str === '"' || str === '\'') {
    const currentBlock = getCurrentBlock(editorState);
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const text = currentBlock.getText();
    const len = text.length;
    if (selectionState.getAnchorOffset() === 0) {
      onChange(EditorState.push(editorState, Modifier.insertText(contentState, selectionState, (str === '"' ? DQUOTE_START : SQUOTE_START)), 'transpose-characters'));
      return true;
    } else if (len > 0) {
      const lastChar = text[len - 1];
      if (lastChar !== ' ') {
        onChange(EditorState.push(editorState, Modifier.insertText(contentState, selectionState, (str === '"' ? DQUOTE_END : SQUOTE_END)), 'transpose-characters'));
      } else {
        onChange(EditorState.push(editorState, Modifier.insertText(contentState, selectionState, (str === '"' ? DQUOTE_START : SQUOTE_START)), 'transpose-characters'));
      }
      return true;
    }
  }
  return beforeInput(editorState, str, onChange, newTypeMap);
};


class SeparatorSideButton extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const entityKey = Entity.create('separator', 'IMMUTABLE', {});
    this.props.setEditorState(
      AtomicBlockUtils.insertAtomicBlock(
        this.props.getEditorState(),
        entityKey,
        '-'
      )
    );
    this.props.close();
  }

  render() {
    return (
      <button
        className="md-sb-button md-sb-img-button"
        type="button"
        title="Add a separator"
        onClick={this.onClick}
      >
        <i className="fa fa-minus" />
      </button>
    );
  }
}


class EmbedSideButton extends React.Component {

  static propTypes = {
    setEditorState: React.PropTypes.func,
    getEditorState: React.PropTypes.func,
    close: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.addEmbedURL = this.addEmbedURL.bind(this);
  }

  onClick() {
    const url = window.prompt('Enter a URL', 'https://www.youtube.com/watch?v=PMNFaAUs2mo');
    this.props.close();
    if (!url) {
      return;
    }
    this.addEmbedURL(url);
  }

  addEmbedURL(url) {
    const entityKey = Entity.create('embed', 'IMMUTABLE', {url});
    this.props.setEditorState(
      AtomicBlockUtils.insertAtomicBlock(
        this.props.getEditorState(),
        entityKey,
        'E'
      )
    );
  }

  render() {
    return (
      <button
        className="md-sb-button md-sb-img-button"
        type="button"
        title="Add an Embed"
        onClick={this.onClick}
      >
        <i className="fa fa-code" />
      </button>
    );
  }

}


class AtomicEmbedComponent extends React.Component {

  static propTypes = {
    data: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      showIframe: false,
    };

    this.enablePreview = this.enablePreview.bind(this);
  }

  componentDidMount() {
    this.renderEmbedly();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.showIframe !== this.state.showIframe && this.state.showIframe === true) {
      this.renderEmbedly();
    }
  }

  getScript() {
    const script = document.createElement('script');
    script.async = 1;
    script.src = '//cdn.embedly.com/widgets/platform.js';
    script.onload = () => {
      window.embedly();
    };
    document.body.appendChild(script);
  }

  renderEmbedly() {
    if (window.embedly) {
      window.embedly();
    } else {
      this.getScript();
    }
  }

  enablePreview() {
    this.setState({
      showIframe: true,
    });
  }

  render() {
    const { url } = this.props.data;
    const innerHTML = `<div><a class="embedly-card" href="${url}" data-card-controls="0" data-card-theme="dark">Embedded ― ${url}</a></div>`;
    return (
      <div className="md-block-atomic-embed">
        <div dangerouslySetInnerHTML={{ __html: innerHTML }} />
      </div>
    );
  }
}

const AtomicSeparatorComponent = (props) => (
  <hr />
);

const AtomicBlock = (props) => {
  const { blockProps, block } = props;
  const entity = Entity.get(block.getEntityAt(0));
  const data = entity.getData();
  const type = entity.getType();
  if (blockProps.components[type]) {
    const AtComponent = blockProps.components[type];
    return (
      <div className={`md-block-atomic-wrapper md-block-atomic-wrapper-${type}`}>
        <AtComponent data={data} />
      </div>
    );
  }
  return <p>Block of type <b>{type}</b> is not supported.</p>;
};












export default class CourseModuleDisplayBox extends Component {
  constructor(props) {
    super(props);
    this.sideButtons = [];
    this.onChange = (editorState) => this.setState({ editorState });
  };

  configureModule(moduleId) {
    this.setState({
      course: this.props.course
    });

    this.props.course.modules.map((module, index) => {
      if(moduleId === module.moduleId) {
        let moduleData = module.moduleData;
        this.setState({
          module: module,
          editorState: (moduleData !== undefined && moduleData.length) ? createEditorState(JSON.parse(moduleData)) : createEditorState(),
          editorEnabled: false
        });
      }
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
    let moduleData = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
    this.props.updateModule(
      this.state.course.courseId,
      this.state.module.moduleId,
      {moduleData}
    );
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
          {this.props.user.id === this.props.course.authorId ? this.state.editorEnabled ? saveButton : editButton : ''}
        </div>
        <div class="box-body">
          <Editor
            ref          ="editor"
            editorState  ={editorState}
            onChange     ={this.onChange.bind(this)}
            editorEnabled={editorEnabled}
            placeholder  ="Module goes here..."
            sideButtons  ={this.sideButtons}
          />
        </div>
      </div>
    );
  };
}
