
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';

import Edit from '../Edit';

import style from './style';

const CourseInfo = ({ user, course, updateCourse }) => {
  const { id, token } = user;
  const { courseId, authorId, courseName, description, level, standard } = course;

  return (
    <div
      className="mdl-card mdl-shadow--4dp"
      style={style.courseInfo}
    >
      <div
        className="mdl-card__title"
        style={style.courseInfo.title}
      >
        <h2 className="mdl-card__title-text">
          <Edit
            keyName="courseName"
            keyType="text"
            keyValue={courseName}
            update={updateCourse}
            id={id}
            token={token}
            courseId={courseId}
            authorId={authorId}
            type="course"
          />
        </h2>
      </div>
      <div className="mdl-card__supporting-text">
        <Edit
          keyName="description"
          keyType="text"
          keyValue={description}
          update={updateCourse}
          id={id}
          token={token}
          courseId={courseId}
          authorId={authorId}
          type="course"
        />
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
