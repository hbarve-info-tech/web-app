
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import Component from 'react/lib/ReactComponent';

import style from './style';

class ModuleCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleName: '',
    };

    this.onClick = this.onClick.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }
  onClick(e) {
    e.preventDefault();
    this.refs['moduleCreate-dialog'].showModal();
  }
  onCancel(e) {
    e.preventDefault();
    this.refs['moduleCreate-dialog'].close();
  }
  onCreate(e) {
    e.preventDefault();
    const { moduleName } = this.state;
    const { user, course, createModule } = this.props;
    const { id, token } = user;
    const { courseId } = course;
    const payload = { id, token, courseId, moduleName };

    createModule(payload);

    this.refs['moduleCreate-dialog'].close();
  }

  render() {
    const { moduleName } = this.state;

    return (
      <div
        className="mdl-card mdl-shadow--4dp"
        style={style.moduleCreate}
      >
        <div className="mdl-card__actions" style={{ textAlign: 'center' }}>
          <a
            className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
            onClick={this.onClick}
          >
            Add Module
          </a>
        </div>
        <dialog
          className="mdl-dialog"
          ref="moduleCreate-dialog"
          style={{ width: '70%' }}
        >
          <div className="mdl-dialog__content">
            <div
              className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
              style={{ width: '100%' }}
            >
              <input
                className="mdl-textfield__input"
                style={{ width: '100%' }}
                id="moduleCreate-input"
                type="text"
                value={moduleName}
                onChange={e => this.setState({ moduleName: e.target.value })}
              />
              <label
                className="mdl-textfield__label"
                htmlFor="moduleCreate-input"
              >
                New Module Name
              </label>
            </div>
          </div>
          <div className="mdl-dialog__actions">
            <button type="button" className="mdl-button" onClick={this.onCreate}>Create</button>
            <button type="button" className="mdl-button" onClick={this.onCancel}>Cancel</button>
          </div>
        </dialog>
      </div>
    );
  }
}

ModuleCreate.propTypes = {
  user: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  createModule: PropTypes.func.isRequired,
};

export default ModuleCreate;
