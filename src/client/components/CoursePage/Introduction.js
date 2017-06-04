
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';

import {
  Editor,
  EditorState,
  ContentState,
  convertToRaw,
} from 'draft-js';

import {
  convertToString,
} from '../../../lib/mayash-editor';

class Introduction extends Component {
  constructor(props) {
    super(props);
    const { course } = props;
    const { title, description } = course;

    this.state = {
      course,
      edit : false,
      title : EditorState.createWithContent(ContentState.createFromText(title)),
      description : typeof description === 'undefined' ? EditorState.createEmpty() : EditorState.createWithContent(ContentState.createFromText(description)),
    };

    this.onEdit = this.onEdit.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onEdit() {
    const { edit } = this.state;
    this.setState({ edit: !edit });
  }

  onSave() {
    const { id, token } = this.props.elements[0];
    const { courseId, title, description } = this.props.course;
    const { title: titleState, description: descriptionState } = this.state;

    const payload = {};
    const newTitle = convertToString(convertToRaw(titleState.getCurrentContent()));
    const newDescription = convertToString(convertToRaw(descriptionState.getCurrentContent()));

    if (title !== newTitle) {
      payload.title = newTitle;
    }
    if (description !== newDescription) {
      payload.description = newDescription;
    }

    fetch(`/api/elements/${id}/courses/${courseId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
      });
  }

  render() {
    const { course, title, description, edit } = this.state;
    const user = this.props.elements[0];

    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--8-col mdl-cell--2-offset-desktop mdl-cell--8-desktop">
          <div className="mdl-card mdl-shadow--4dp">
            <div className="mdl-card__title">
              <h2 className="mdl-card__title-text">
                <Editor
                  editorState={title}
                  onChange={(title) => this.setState({title})}
                  readOnly={!edit}
                  placeholder={'Course Name'}
                />
              </h2>
            </div>
            <div className="mdl-card__supporting-text">
              <Editor
                editorState={description}
                onChange={(description) => this.setState({description})}
                readOnly={!edit}
                placeholder={'Short Description'}
              />
            </div>
            <div className="mdl-card__supporting-text">
              <b>Difficultly Level:</b> {this.state.course.level}
            </div>
            <div className="mdl-card__supporting-text">
              <b>Course Standard:</b> {this.state.course.standard}
            </div>
            <div className="mdl-card__menu">
              {course.authorId === user.id ? (
                <button
                  className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"
                  onClick={edit ? this.onSave : this.onEdit}
                >
                  <i className="material-icons">{edit ? 'save' : 'edit'}</i>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Introduction;
