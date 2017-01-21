
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';

import Post from '../Post';

const IsClient = typeof document === 'object';

if (IsClient) {
  require('./Timeline.scss');
}

const Timeline = ({ posts, timelineType }) => {
  const postType = timelineType;

  return (
    <div className="timeline">
      {posts.length ? posts.map(post => (
        <Post
          post={post}
          postType={postType}
          key={postType === 'article' ? post.articleId : post.courseId}
        />
      )) : <Post /> }
    </div>
  );
};

Timeline.propTypes = {
  posts: PropTypes.array.isRequired,
  timelineType: PropTypes.string.isRequired,
};

export default Timeline;
