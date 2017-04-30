
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';

import {
  Editor,
  EditorState,
  ContentState,
} from 'draft-js';

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
  }

  render() {
    const { course, edit } = this.state;
    const user = this.props.elements[0];

    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--8-col mdl-cell--2-offset-desktop mdl-cell--8-desktop">
          <div className="mdl-card mdl-shadow--4dp">
            <div className="mdl-card__title">
              <h2 className="mdl-card__title-text">
                <Editor
                  editorState={this.state.title}
                  onChange={(title) => this.setState({title})}
                  readOnly={!edit}
                  placeholder={'Course Name'}
                />
              </h2>
            </div>
            <div className="mdl-card__supporting-text">
              <Editor
                editorState={this.state.description}
                onChange={(description) => this.setState({description})}
                readOnly={!edit}
                placeholder={'Short Description'}
              />
            </div>
            <div className="mdl-card__menu">
              {course.authorId === user.id ? (
                <button
                  className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"
                  onClick={() => this.setState({ edit: !edit })}
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
