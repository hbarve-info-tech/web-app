"use strict";
import React, { Component, PropTypes }  from "react";
import { Link } from 'react-router';
import _ from "lodash";

import Post    from "../components/Post";

export default class Timeline extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  };
  componentWillMount() {}
  componentWillReceiveProps(nextProps) {}

  render() {
    let { timelineType } = this.props;
    let { posts } = this.props;

    return (
      <div>
        {posts.map((post, index) => {
          return (
            <Post
              postType={timelineType === 'articles' ? 'article' : 'course'}
              post    ={post}
              key     ={index}
            />
          );
        })}
      </div>
    );
  };
}