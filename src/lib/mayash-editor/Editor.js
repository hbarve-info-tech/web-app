import React, { Component } from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import {
  Editor,
  RichUtils,
  Entity,
  CompositeDecorator,
} from 'draft-js';

import {
  hashtagStrategy,
  HashtagSpan,

  handleStrategy,
  HandleSpan,
} from './components/Decorators';



export class MayashEditor extends Component {
  constructor() {
    super();
    this.state = {};
    this.onChange = (editorState) => {
      this.props.onChange(editorState);
    };
    this.focus = () => this._editorNode.focus();
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.onTab = this.onTab.bind(this);

    const compositeDecorator = new CompositeDecorator([
      {
        strategy: handleStrategy,
        component: HandleSpan,
      },
      {
        strategy: hashtagStrategy,
        component: HashtagSpan,
      },
    ]);
  }
  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.props.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.props.editorState, 'BOLD'));
  }

  onTab(e) {
    const { editorState } = this.props;
    const newEditorState = RichUtils.onTab(e, editorState, 2);
    if (newEditorState !== editorState) {
      this.onChange(newEditorState);
    }
  }

  render() {
    const { onChange, editorState, placeholder } = this.props;

    return (
      <div>
        <button onClick={this._onBoldClick.bind(this)}>Bold</button>
        <Editor
          ref={(node) => { this._editorNode = node; }}
          handleKeyCommand={this.handleKeyCommand}
          placeholder={placeholder || 'Write Here...'}
          spellCheck={true}
          onTab={this.onTab}
          onChange={onChange}
          editorState={editorState}
        />
      </div>
    );
  }
}

MayashEditor.propTypes = {
  editorState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MayashEditor;
