
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import { browserHistory } from 'react-router';

const IsClient = typeof document === 'object';

if (IsClient) {
  require('./Post.scss');
}

const Post = ({ post, postType }) => {
  let postId;
  let postTitle;
  let postDescription;

  if (postType === 'article') {
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
    <div className="mdl-card mdl-shadow--4dp post">
      <div className="mdl-card__title">
        <h2 className="mdl-card__title-text">{postTitle}</h2>
      </div>
      <div className="mdl-card__supporting-text">
        {postDescription}
      </div>
      <div className="mdl-card__menu">
        <button
          className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"
          onClick={() => browserHistory.push(`/${postType}s/${postId}`)}
        >
          <i className="material-icons">edit</i>
        </button>
        <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
          <i className="material-icons">share</i>
        </button>
      </div>
    </div>
  );
};

Post.postTypes = {
  post: PropTypes.shape({
    articleId: PropTypes.number,
    articleName: PropTypes.string,
    articleData: PropTypes.number,
  }),
  postType: PropTypes.string.isRequired,
};

export default Post;
