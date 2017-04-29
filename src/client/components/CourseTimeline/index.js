
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';

export const CourseTimeline = ({ courses }) => {
  return (
    <div className="mdl-grid">
      <div className="mdl-cell mdl-cell--8-col mdl-cell--2-offset-desktop">
        {courses.map(course => (
          <div
            className="mdl-card mdl-shadow--4dp"
            style={{minHeight: '50px', width: '100%', marginBottom: '10px'}}
            key={course.courseId}
          >
            <div className="mdl-card__title">
              <div className="mdl-card__title-text">{course.title}</div>
            </div>
            {course.description ? (
              <div className="mdl-card__supporting-text">
                {course.description}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

CourseTimeline.propType = {
  courses: PropTypes.array,
};

export default CourseTimeline;