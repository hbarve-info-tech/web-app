
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';

import CourseName from './CourseName';
import CourseDescription from './CourseDescription';

import style from './style';

const CourseInfo = ({ user, course, updateCourse }) => {
  const { id, isSignedIn, token } = user;
  const { courseId, authorId, courseName, description } = course;

  return (
    <div
      className="mdl-card mdl-shadow--4dp"
      style={style.courseInfo}
    >
      <div className="mdl-card__media">
        <img
          src="https://getmdl.io/assets/demos/welcome_card.jpg"
          alt=""
          style={{ width: '100%' }}
        />
      </div>
      <div className="mdl-card__title" style={{ position: 'relative' }}>
        <h2 className="mdl-card__title-text">
          {courseName}
        </h2>
        {isSignedIn === true && id === authorId ? (
          <CourseName
            id={id}
            token={token}
            courseId={courseId}
            courseName={courseName}
            updateCourse={updateCourse}
          />
        ) : null}
      </div>
      <div className="mdl-card__supporting-text" style={{ position: 'relative' }}>
        {description || 'No description available.'}
        {isSignedIn === true && id === authorId ? (
          <CourseDescription
            id={id}
            token={token}
            courseId={courseId}
            description={description}
            updateCourse={updateCourse}
          />
        ) : null}
      </div>
    </div>
  );
};

CourseInfo.propTypes = {
  course: PropTypes.shape({
    courseName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    standard: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.object.isRequired,
  updateCourse: PropTypes.func.isRequired,
};

export default CourseInfo;
