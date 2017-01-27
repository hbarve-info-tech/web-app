
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import Component from 'react/lib/ReactComponent';

class Edit extends Component {
  constructor(props) {
    super(props);
    const { keyValue } = this.props;
    this.state = {
      value: keyValue,
    };

    this.onClick = this.onClick.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    const { keyName } = this.props;
    this.refs[`${keyName}-dialog`].showModal();
  }
  onCancel(e) {
    e.preventDefault();
    const { keyName } = this.props;
    this.refs[`${keyName}-dialog`].close();
  }
  onSave(e) {
    e.preventDefault();
    const { value } = this.state;
    const { id, token, articleId, courseId, moduleId, type, keyName } = this.props;
    const payload = {};
    payload.id = id;
    payload.token = token;

    if (type === 'article') {
      payload.articleId = articleId;
    }
    else if (type === 'course') {
      payload.courseId = courseId;
    }
    else if (type === 'module') {
      payload.courseId = courseId;
      payload.moduleId = moduleId;
    }

    payload[keyName] = value;
    this.props.update(payload);

    this.refs[`${keyName}-dialog`].close();
  }

  render() {
    const { keyName, keyType, id, authorId } = this.props;
    const { value } = this.state;

    return (
      <div style={{ position: 'relative' }}>
        <div>{value}</div>
        {id === authorId ? (
          <div style={{ position: 'absolute', top: '0px', right: '0px' }}>
            <button
              className="mdl-button mdl-js-button mdl-button--icon"
              onClick={this.onClick}
            >
              <i className="material-icons">edit</i>
            </button>
          </div>
        ) : null}
        <dialog
          className="mdl-dialog"
          ref={`${keyName}-dialog`}
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
                id={`${keyName}-input`}
                type={keyType}
                value={value}
                onChange={e => this.setState({ value: e.target.value })}
              />
              <label
                className="mdl-textfield__label"
                htmlFor={`${keyName}-input`}
              >
                {keyName}
              </label>
            </div>
          </div>
          <div className="mdl-dialog__actions">
            <button
              type="button"
              className="mdl-button"
              onClick={this.onSave}
            >
              Save
            </button>
            <button
              type="button"
              className="mdl-button close"
              onClick={this.onCancel}
            >
              Cancel
            </button>
          </div>
        </dialog>
      </div>
    );
  }
}

Edit.propTypes = {
  keyName: PropTypes.string.isRequired,
  keyType: PropTypes.oneOf([
    'text',
    'textarea',
  ]).isRequired,
  keyValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
  update: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  authorId: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  type: PropTypes.oneOfType([
    'article',
    'course',
    'module',
  ]).isRequired,
  articleId: PropTypes.number,
  courseId: PropTypes.number,
  moduleId: PropTypes.number,
};

export default Edit;
