"use strict";
import React, { Component, PropTypes }  from "react";
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import _ from "lodash";

import actions from '../actions';

import Post    from "../components/Post";

class Timeline extends Component {
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

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    actions,
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
