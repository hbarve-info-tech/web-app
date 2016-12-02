'use strict';
import React, { Component, PropTypes } from 'react';
import {
  Editor,
  EditorState,
  Entity,
  RichUtils,
  ContentState,
  CompositeDecorator,
  AtomicBlockUtils
} from 'draft-js';


/**
 * Mayash Editor is a Editor for Mayash Website.
 *
 * required props are as follows:
 *  {function} onChange    - this function should handle all the changes of the editor.
 *  {object}   editorState - this object should be the state of draft.js editor.
 *  {string}   placeholder - placeholder value.
 *  {boolean}  readOnly    - This boolean value will allow editor to be in ready only mode.
 */
export default class MayashEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { editorState, onChange, placeholder, readOnly } = this.props;

    return (
      <div
        class  ="editor"
        id     ="Editor"
        onClick={this.focus}
      >
        <Editor
          editorState     ={editorState}
          onChange        ={onChange}
          placeholder     ={placeholder}
          spellCheck      ={true}
          ref             ="editor"
          readOnly        ={readOnly}
        />
      </div>
    );
  };
}