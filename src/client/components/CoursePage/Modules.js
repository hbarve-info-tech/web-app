
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';

import {
  Editor,
  EditorState,
  ContentState,
  convertFromRaw,
  convertToRaw,
} from 'draft-js';

const convertToString = state => state.blocks.map(block => block.text).join(' ').trim();

class ModuleCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: false,
      message: '',
      title: EditorState.createEmpty(),
      titleLength: 0,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (title) => {
    const titleText = convertToString(convertToRaw(title.getCurrentContent()));
    const titleLength = titleText.length;

    this.setState({
      title,
      titleLength,
      valid: titleLength > 0 && titleLength < 148,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { id, token } = this.props.elements[0];
    const { courseId } = this.props.course;
    const { title } = this.state;
    const { createModuleSuccess } = this.props;

    const body = {
      title: convertToString(convertToRaw(title.getCurrentContent())),
    };

    this.setState({message: 'Creating Module...'});

    fetch(`/api/elements/${id}/courses/${courseId}/modules`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(json => {
        if (json.statusCode === 201) {
          this.setState({message: 'Successfully Created.'});
          createModuleSuccess({ ...body, ...json.payload });

          setTimeout(() => {
            this.setState({
              valid: false,
              message: '',
              title: EditorState.createEmpty(),
              titleLength: 0,
            });
          }, 1000);
        }
        else if (json.statusCode >= 400) {
          this.setState({ message: json.error || json.message });
        }
      });
  };

  render() {
    const { title, titleLength, valid, message } = this.state;

    return (
      <div className="mdl-card mdl-shadow--4dp">
        <div className="mdl-card__supporting-text">
          <Editor
            editorState={title}
            onChange={this.onChange}
            placeholder="Title..."
          />
        </div>
        {message.length > 0 ? (
          <div className="mdl-card__supporting-text">
            <div>{message}</div>
          </div>
        ) : null}
        <div className="mdl-card__actions mdl-card--border" style={{display: 'flex', alignItems: 'center'}}>
          <p>{titleLength}/148</p>
          <button
            className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored"
            onClick={this.onSubmit}
            disabled={!valid}
            style={{alignContent: 'flex-end'}}
          >
            Create
          </button>
        </div>
      </div>
    );
  };
}

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
              readOnly={!edit}
              placeholder={'Title'}
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
            readOnly={!edit}
            placeholder="Module Content"
          />
        </div>
        <div className="mdl-card__menu">
          <button
            className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"
            onClick={() => this.setState({edit: !edit})}
          >
            <i className="material-icons">{edit ? 'save' : 'edit'}</i>
          </button>
          <button
            className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"
            onClick={() => {}}
          >
            <i className="material-icons">delete</i>
          </button>
          <button
            className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"
            onClick={() => {}}
          >
            <i className="material-icons">more_vert</i>
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
    const { modules, authorId } = this.props.course;
    const { id } = this.props.elements[0];

    return (
      <div className="mdl-grid">
        {typeof id !== "undefined" && id === authorId ? (
          <div className="mdl-cell mdl-cell--12-col mdl-cell--8-col-desktop mdl-cell--2-offset-desktop">
            <ModuleCreate {...this.props} />
          </div>
        ) : null}
        <div className="mdl-cell mdl-cell--12-col mdl-cell--8-col-desktop mdl-cell--2-offset-desktop">
          {modules.map(m => (<Module {...m} {...this.props.elements[0]} key={m.moduleId} />))}
        </div>
      </div>
    );
  }
}

export default Modules;
