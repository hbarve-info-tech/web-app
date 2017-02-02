
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';

class CourseDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.description,
    };

    this.onClick = this.onClick.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    this.refs['CourseDescription-dialog'].showModal();
  }
  onCancel(e) {
    e.preventDefault();
    this.refs['CourseDescription-dialog'].close();
  }
  onSave(e) {
    e.preventDefault();
    const { description } = this.state;
    const { id, token, courseId } = this.props;
    const payload = { id, token, courseId, description };

    this.props.updateCourse(payload);

    this.refs['CourseDescription-dialog'].close();
  }

  render() {
    const { description } = this.state;

    return (
      <div>
        <button
          className="mdl-button mdl-js-button mdl-button--icon"
          style={{ position: 'absolute', top: '0px', right: '0px' }}
          onClick={this.onClick}
        >
          <i className="material-icons" style={{ fontSize: '17px' }}>edit</i>
        </button>
        <dialog
          className="mdl-dialog"
          ref="CourseDescription-dialog"
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
                id="CourseDescription-input"
                type="text"
                value={description}
                onChange={e => this.setState({ description: e.target.value })}
              />
              <label
                className="mdl-textfield__label"
                htmlFor="CourseDescription-input"
              >
                Course Description
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

CourseDescription.propTypes = {
  id: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  courseId: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  updateCourse: PropTypes.func.isRequired,
};

export default CourseDescription;
