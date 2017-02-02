
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import Component from 'react/lib/ReactComponent';

import { convertToRaw } from 'draft-js';
import { Editor, createEditorState } from 'medium-draft';

import Edit from '../Edit';

import ModuleName from './ModuleName';

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
      edit: false,
    };
    this.onClick = this.onClick.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    this.setState({ edit: true });
  }
  onSave(e) {
    e.preventDefault();
    const { moduleId } = this.props;
    const { id, token } = this.props.user;
    const { courseId } = this.props.course;
    const { editorState } = this.state;
    this.props.updateModule({
      id,
      token,
      courseId,
      moduleId,
      moduleData: convertToRaw(editorState.getCurrentContent()),
    });
    this.setState({ edit: true });
  }

  render() {
    const { moduleName, moduleId, index, course, user } = this.props;
    const { isSignedIn, id, token } = user;

    const { editorState, display, edit } = this.state;

    return (
      <div
        className="mdl-card mdl-shadow--4dp"
        style={style.module}
      >
        <div
          className="mdl-card__title"
          onClick={() => this.setState({ display: display === 'none' ? 'block' : 'none' })}
        >
          <h2
            className="mdl-card__title-text"
          >
            {index}. {moduleName}
            {isSignedIn === true && id === course.authorId ? (
              <ModuleName
                id={id}
                token={token}
                courseId={course.courseId}
                moduleId={moduleId}
                moduleName={moduleName}
                updateModule={this.props.updateModule}
              />
            ) : null}
          </h2>
        </div>
        <div
          className="mdl-card__supporting-text"
          style={{ display }}
        >
          <div style={{ position: 'relative' }}>
            <div>
              <Editor
                editorState={editorState}
                onChange={e => this.setState({ editorState: e })}
                editorEnabled={edit}
              />
            </div>
            {isSignedIn === true && id === course.authorId ? (
              <div style={{ position: 'absolute', right: '0px', top: '0px' }}>
                {edit ? (
                  <button
                    className="mdl-button mdl-js-button mdl-button--icon"
                    onClick={this.onSave}
                  >
                    <i className="material-icons">save</i>
                  </button>
                ) : (
                  <button
                    className="mdl-button mdl-js-button mdl-button--icon"
                    onClick={this.onClick}
                  >
                    <i className="material-icons">edit</i>
                  </button>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

Module.propTypes = {
  index: PropTypes.number.isRequired,
  moduleId: PropTypes.number.isRequired,
  moduleName: PropTypes.string.isRequired,
  moduleData: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  updateModule: PropTypes.func.isRequired,
};

export default Module;
