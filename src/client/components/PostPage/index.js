
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../../actions';

import Status from './Status';
import Article from './Article';
import Question from './Questions';
import Report from './Report';

import ErrorPage from '../ErrorPage';

class PostPage extends Component {
  render() {
    const { postId } = this.props.routeParams;
    const post = this.props.posts.find(p => p.postId === parseInt(postId, 10));

    if (!post || post.statusCode !== 200) {
      return (<ErrorPage {...post} />);
    }

    if (post.postType === 'status') {
      return (<Status post={post} {...this.props} />);
    }

    if (post.postType === 'article') {
      return (<Article post={post} {...this.props} />);
    }

    if (post.postType === 'question') {
      return (<Question post={post} {...this.props} />);
    }

    if (post.postType === 'report') {
      return (<Report post={post} {...this.props} />);
    }
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
