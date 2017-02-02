
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';

class ModuleName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleName: props.moduleName,
    };

    this.onClick = this.onClick.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    this.refs['moduleName-dialog'].showModal();
  }
  onCancel(e) {
    e.preventDefault();
    this.refs['moduleName-dialog'].close();
  }
  onSave(e) {
    e.preventDefault();
    const { moduleName } = this.state;
    const { id, token, courseId, moduleId } = this.props;
    const payload = { id, token, courseId, moduleId, moduleName };

    this.props.updateModule(payload);

    this.refs['moduleName-dialog'].close();
  }

  render() {
    const { moduleName } = this.state;

    return (
      <div>
        <button
          className="mdl-button mdl-js-button mdl-button--icon"
          onClick={this.onClick}
        >
          <i className="material-icons" style={{ fontSize: '17px' }}>edit</i>
        </button>
        <dialog
          className="mdl-dialog"
          ref="moduleName-dialog"
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
                id="moduleName-input"
                type="text"
                value={moduleName}
                onChange={e => this.setState({ moduleName: e.target.value })}
              />
              <label
                className="mdl-textfield__label"
                htmlFor="moduleName-input"
              >
                Module Name
              </label>
            </div>
          </div>
          <div className="mdl-dialog__actions">
            <button type="button" className="mdl-button" onClick={this.onSave}>Save</button>
            <button type="button" className="mdl-button" onClick={this.onCancel}>Cancel</button>
          </div>
        </dialog>
      </div>
    );
  }
}

ModuleName.propTypes = {
  id: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  courseId: PropTypes.number.isRequired,
  moduleId: PropTypes.number.isRequired,
  moduleName: PropTypes.string.isRequired,
  updateModule: PropTypes.func.isRequired,
};

export default ModuleName;
