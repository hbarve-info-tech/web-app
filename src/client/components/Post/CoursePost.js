
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import { browserHistory } from 'react-router';

import style from './style';

const CoursePost = ({ courseId, authorId, title, description, data }) => {
  return (
    <div
      className="mdl-card mdl-shadow--4dp"
      style={style.post}
    >
      <a
        className="mdl-card__title"
        style={style.postTitle}
        onClick={() => browserHistory.push(`/courses/${courseId}`)}
      >
        <h2 className="mdl-card__title-text">{title}</h2>
      </a>
      {description ? (
        <div className="mdl-card__supporting-text">
          {description}
        </div>
      ) : null}
    </div>
  );
};

CoursePost.propTypes = {
  authorId: PropTypes.number,
  courseId: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default CoursePost;
