
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import { browserHistory } from 'react-router';

import style from './style';

const Post = ({ post, postType }) => {
  let postId;
  let postTitle;
  let postDescription;

  if (postType === 'emptyPost') {
    return (
      <div
        className="mdl-card mdl-shadow--4dp"
        style={style.postEmpty}
      >
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">There is no posts.</h2>
        </div>
      </div>
    );
  }
  else if (postType === 'article') {
    postId = post.articleId;
    postTitle = post.articleName;
    postDescription = post.description;
  }
  else if (postType === 'course') {
    postId = post.courseId;
    postTitle = post.courseName;
    postDescription = post.description;
  }

  return (
    <div
      className="mdl-card mdl-shadow--4dp"
      style={style.post}
    >
      <div className="mdl-card__media">
        <img
          src="https://getmdl.io/assets/demos/welcome_card.jpg"
          alt=""
          style={{ width: '100%', minHeight: '100px', maxHeight: '200px' }}
        />
      </div>
      <a
        className="mdl-card__title"
        style={style.postTitle}
        onClick={() => browserHistory.push(`/${postType}s/${postId}`)}
      >
        <h2 className="mdl-card__title-text">{postTitle}</h2>
      </a>
      <div className="mdl-card__supporting-text">
        {postDescription}
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    articleId: PropTypes.number,
    articleName: PropTypes.string,
    articleData: PropTypes.shape({}),
    description: PropTypes.string,
  }),
  postType: PropTypes.string.isRequired,
};

export default Post;
