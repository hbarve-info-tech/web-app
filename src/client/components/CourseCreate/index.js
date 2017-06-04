
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';

import { Editor, EditorState, convertToRaw } from 'draft-js';
import {
  convertToString,
} from '../../../lib/mayash-editor';

import actions from '../../actions';

import style from './style';


class CreateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: false,

      statusCode: 0,
      error: '',
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
    const { title } = this.state;
    const { createCourse } = this.props;

    const body = {
      title: convertToString(convertToRaw(title.getCurrentContent())),
    };

    this.setState({message: 'Creating Course...'});

    fetch(`/api/elements/${id}/courses`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(json => {
        if (json.statusCode === 201) {
          this.setState({message: 'Successfully Created.'});
          createCourse({ ...body, ...json.payload });

          setTimeout(() => {
            this.setState({
              valid: false,
              message: '',
              title: EditorState.createEmpty(),
              titleLength: 0,
            });
          }, 1000);
        }
        else if (json.statusCode >= 400) {
          this.setState({ message: json.error || json.message });
        }
      });
  };

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
            <div className="mdl-card__actions mdl-card--border" style={{display: 'flex'}}>
              <button
                className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored"
                onClick={this.onSubmit}
                disabled={!valid}
              >
                Create
              </button>
              <p>{titleLength}/148</p>
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
