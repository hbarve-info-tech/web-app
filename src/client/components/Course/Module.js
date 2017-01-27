
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import Component from 'react/lib/ReactComponent';

import { Editor, createEditorState } from 'medium-draft';

import style from './style';

class Module extends Component {
  constructor(props) {
    super(props);
    const { moduleData } = this.props;
    const condition = Object.keys(moduleData).length !== 0;
    const editorState = condition ? createEditorState(moduleData) : createEditorState();
    this.state = {
      editorState,
      display: 'none',
    };
  }

  render() {
    const { moduleName, index } = this.props;
    const { editorState, display } = this.state;

    return (
      <div
        className="mdl-card mdl-shadow--2dp"
        style={style.module}
      >
        <div
          className="mdl-card__title"
          onClick={() => this.setState({ display: display === 'none' ? 'block' : 'none' })}
        >
          <h2 className="mdl-card__title-text">{index}. {moduleName}</h2>
        </div>
        <div
          className="mdl-card__supporting-text"
          style={{ display }}
        >
          <Editor
            editorState={editorState}
            onChange={() => this.setState({ editorState })}
            editorEnabled={false}
          />
        </div>
      </div>
    );
  }
}

Module.propTypes = {
  index: PropTypes.number.isRequired,
  moduleName: PropTypes.string.isRequired,
  moduleData: PropTypes.object.isRequired,
};

export default Module;
