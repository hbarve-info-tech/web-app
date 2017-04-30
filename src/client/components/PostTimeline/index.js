
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';

export const PostTimeline = ({ posts }) => {
  return (
    <div className="mdl-grid">
      <div className="mdl-cell mdl-cell--8-col mdl-cell--2-offset-desktop">

        {posts.map(post => (
          <div
            className="mdl-card mdl-shadow--4dp"
            style={{minHeight: '50px', width: '100%', marginBottom: '10px'}}
            key={post.postId}
            onClick={() => {
              window.open(`/posts/${post.postId}`);
            }}
          >
            <div className="mdl-card__title">
              <div className="mdl-card__title-text">{post.title}</div>
            </div>
            {post.description ? (
              <div className="mdl-card__supporting-text">
                {post.description}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

PostTimeline.propType = {
  posts: PropTypes.array,
};

export default PostTimeline;