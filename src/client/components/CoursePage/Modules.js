
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';

import {
  Editor,
  EditorState,
  ContentState,
  convertFromRaw,
} from 'draft-js';

class Module extends Component {
  constructor(props) {
    super(props);
    const { title, data } = props;
    this.state = {
      title: EditorState.createWithContent(ContentState.createFromText(title || '')),
      data: typeof data === 'undefined' ? EditorState.createEmpty() : EditorState.createWithContent(convertFromRaw(data)),
      edit: false,
      display: 'none'
    };
  }

  render() {
    const { moduleId, authorId, courseId } = this.props;
    const { title, data, edit, display } = this.state;

    return (
      <div className="mdl-card mdl-shadow--4dp" style={{marginBottom: '10px'}}>
        <div
          className="mdl-card__title"
          onClick={() => this.setState({ display: display === 'none' ? 'block' : 'none' })}
        >
          <h2 className="mdl-card__title-text">
            <Editor
              editorState={title}
              onChange={(title) => this.setState({title})}
            />
          </h2>
        </div>
        <div
          className="mdl-card__supporting-text"
          style={{display}}
        >
          <Editor
            editorState={data}
            onChange={(data) => this.setState({data})}
          />
        </div>
        <div className="mdl-card__menu">
          <button
            className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"
            onClick={() => this.setState({edit: !edit})}
          >
            <i className="material-icons">{edit ? 'save' : 'edit'}</i>
          </button>
        </div>
      </div>
    );
  }
}

class Modules extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { modules } = this.props.course;

    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--12-col mdl-cell--8-col-desktop mdl-cell--2-offset-desktop">
          {modules.map(m => (<Module {...m} key={m.moduleId} />))}
        </div>
      </div>
    );
  }
}

export default Modules;
