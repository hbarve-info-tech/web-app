"use strict";
import React, { Component, PropTypes }  from "react";
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import actions from '../actions';

import Post    from "../components/Post";

class Timeline extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  };

  configureTimeline() {
    if(this.props.articles.isFetched === false) {
      this.props.fetchArticles();
    }
  }

  componentWillMount() {
    this.configureTimeline();
  }

  componentWillReceiveProps(nextProps) {
    // this.configureTimeline(nextProps.tab);
  }

  render() {
    return (
      <div>
        {this.props.articles.array.map((post, index) => {
          return (
            <Post
              postType='articles'
              user    ={this.props.user}
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
