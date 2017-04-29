
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';

class CoursePage extends Component {
  constructor(props) {
    super(props);
    const { course } = props;
    this.state = {
      course,
      edit: false,
    };
  }

  render() {
    const { course, edit } = this.state;

    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--8-col">
          <div className="mdl-card mdl-shadow--4dp" style={{width: '100%', minHeight: '50px'}}>
            <div className="mdl-card__title">
              <div className="mdl-card__title-text">{course.title}</div>
            </div>
            <div className="mdl-card__supporting-text">
              {course.description}
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
