
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';

import style from './style';

const CourseInfo = ({
  courseName,
  description,
  standard,
  level = false,
}) => (
  <div
    className="mdl-card mdl-shadow--4dp"
    style={style.courseInfo}
  >
    <div
      className="mdl-card__title"
      style={style.courseInfo.title}
    >
      <h2 className="mdl-card__title-text">{courseName}</h2>
    </div>
    <div className="mdl-card__supporting-text">
      <strong>Description: </strong>{description}
      <br />
      <strong>Standard: </strong>{standard}
      <br />
      <strong>Difficulty Level: </strong>{level}
    </div>
  </div>
);

CourseInfo.propTypes = {
  courseName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  standard: PropTypes.string.isRequired,
};

export default CourseInfo;
