
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';

import Post from '../Post';
import CoursePost from '../Post/CoursePost';
import LoadingPost from '../Post/LoadingPost';
import EmptyPost from '../Post/EmptyPost';

import style from './style';

const Timeline = ({ posts, courses, type }) => {
  if (type === 'course') {
    return (
      <div style={style.timeline}>
        {courses.length ? courses.map(course => (
          <CoursePost
            {...course}
            key={course.courseId}
          />
        )) : <EmptyPost /> }
      </div>
    );
  }

  return (
    <div style={style.timeline}>
      {posts.length ? posts.map(post => (
        <Post
          {...post}
          key={post.postId}
        />
      )) : <EmptyPost /> }
    </div>
  );
};

Timeline.propTypes = {
  posts: PropTypes.array,
  courses: PropTypes.array,
  type: PropTypes.oneOf([
    'post',
    'course'
  ]).isRequired,
};

export default Timeline;
