
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';

class CourseName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseName: props.courseName,
    };

    this.onClick = this.onClick.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    this.refs['courseName-dialog'].showModal();
  }
  onCancel(e) {
    e.preventDefault();
    this.refs['courseName-dialog'].close();
  }
  onSave(e) {
    e.preventDefault();
    const { courseName } = this.state;
    const { id, token, courseId } = this.props;
    const payload = { id, token, courseId, courseName };

    this.props.updateCourse(payload);

    this.refs['courseName-dialog'].close();
  }

  render() {
    const { courseName } = this.state;

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
          ref="courseName-dialog"
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
                id="courseName-input"
                type="text"
                value={courseName}
                onChange={e => this.setState({ courseName: e.target.value })}
              />
              <label
                className="mdl-textfield__label"
                htmlFor="courseName-input"
              >
                Course Name
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

CourseName.propTypes = {
  id: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  courseId: PropTypes.number.isRequired,
  courseName: PropTypes.string.isRequired,
  updateCourse: PropTypes.func.isRequired,
};

export default CourseName;
