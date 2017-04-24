
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import { browserHistory } from 'react-router';

import style from './style';

const Post = ({ postId, authorId, title, description, data, type }) => {
  return (
    <div
      className="mdl-card mdl-shadow--4dp"
      style={style.post}
    >
      <a
        className="mdl-card__title"
        style={style.postTitle}
        onClick={() => browserHistory.push(`/posts/${postId}`)}
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

Post.propTypes = {
  authorId: PropTypes.number,
  postId: PropTypes.number,
  title: PropTypes.string,
  data: PropTypes.shape({}),
  description: PropTypes.string,
  type: PropTypes.oneOf([
    'post',
    'course',
  ]),
};

export default Post;
