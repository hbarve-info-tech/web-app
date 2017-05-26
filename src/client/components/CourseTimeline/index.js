
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import { browserHistory } from 'react-router';

const CoursePost = ({ courseId, authorId, title, description }) => {
  return (
    <div
      className="mdl-card mdl-shadow--4dp"
      style={{minHeight: '50px', width: '100%', marginBottom: '10px'}}
    >
      <div
        className="mdl-card__title"
        onClick={() => {
          window.open(`/courses/${courseId}`)
        }}
      >
        <div className="mdl-card__title-text">{title}</div>
      </div>
      {typeof description !== "undefined" ? (
        <div className="mdl-card__supporting-text">
          {description}
        </div>
      ) : null}
      <div className="mdl-card__menu">
        <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
          <i className="material-icons">delete</i>
        </button>
        <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
          <i className="material-icons">share</i>
        </button>
        <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
          <i className="material-icons">more_vert</i>
        </button>
      </div>
    </div>
  );
}

export const CourseTimeline = ({ courses }) => {
  return (
    <div className="mdl-grid">
      <div className="mdl-cell mdl-cell--8-col mdl-cell--2-offset-desktop">
        {courses.map(course => <CoursePost {...course} key={course.courseId} />)}
      </div>
    </div>
  );
};

CourseTimeline.propType = {
  courses: PropTypes.array,
};

export default CourseTimeline;