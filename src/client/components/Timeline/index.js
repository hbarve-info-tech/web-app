
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';

import Post from '../Post';

import style from './style';

const Timeline = ({ posts, timelineType }) => {
  const postType = timelineType;

  return (
    <div style={style.timeline}>
      {posts.length ? posts.map(post => (
        <Post
          post={post}
          postType={postType}
          key={postType === 'article' ? post.articleId : post.courseId}
        />
      )) : <Post postType="emptyPost" /> }
    </div>
  );
};

Timeline.propTypes = {
  posts: PropTypes.array.isRequired,
  timelineType: PropTypes.string.isRequired,
};

export default Timeline;
