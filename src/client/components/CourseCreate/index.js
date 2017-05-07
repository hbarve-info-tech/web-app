
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Editor, EditorState, convertToRaw } from 'draft-js';

import actions from '../../actions';

import style from './style';

const convertToString = state => state.blocks.map(block => block.text).join(' ').trim();

class CreateCourse extends Component {
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
    const { title, description, data } = this.state;

    const params = {
      id,
      token,
      title: convertToString(convertToRaw(title.getCurrentContent())),
    };
    this.props.createCourse(params);
  };

  componentWillReceiveProps({ create }) {
    const { course } = create;
    if (course.isCreating === true) {
      this.setState({message: 'Creating Course...'});
    }
    if (course.isCreated === true) {
      this.setState({message: 'Successfully Created.'});
      setTimeout(() => {
        this.props.resetCreate('course');
        this.setState({
          valid: false,
          message: '',
          title: EditorState.createEmpty(),
          titleLength: 0,
        });
      }, 1000);
    }
  }

  render() {
    const { title, titleLength, valid, message } = this.state;

    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--8-col mdl-cell--2-offset-desktop mdl-cell--8-desktop">
          <div className="mdl-card mdl-shadow--4dp" style={style}>
            <div className="mdl-card__supporting-text">
              <Editor
                editorState={title}
                onChange={this.onChange}
                placeholder="Course title goes here..."
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
        </div>
      </div>
    );
  };
}

CreateCourse.propTypes = {
  elements: PropTypes.array.isRequired,
  create: PropTypes.object,
  createCourse: PropTypes.func,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateCourse);
