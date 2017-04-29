
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';

import {
  Editor,
  EditorState,
} from 'draft-js';

class CoursePage extends Component {
  constructor(props) {
    super(props);
    const { course } = props;
    this.state = {
      course,
      syllabus: typeof course.syllabus === 'undefined' ? EditorState.createEmpty() : EditorState.createWithContent(course.syllabus),
      edit: false,
    };
  }

  render() {
    const { course, syllabus, edit } = this.state;

    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--8-col">
          <div className="mdl-card mdl-shadow--4dp" style={{width: '100%', minHeight: '50px'}}>
            <div className="mdl-card__title">
              <div className="mdl-card__title-text">Syllabus</div>
            </div>
            <div className="mdl-card__supporting-text">
              <Editor
                editorState={syllabus}
                onChange={(syllabus) => this.setState({syllabus})}
                placeholder="Syllabus Content Goes Here..."
              />
            </div>
            <div className="mdl-card__menu">
              <button
                className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"
                onClick={() => this.setState({ edit: !edit })}
              >
                <i className="material-icons">{edit ? 'save' : 'edit'}</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default CoursePage;
