
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
      return (<Status/>);
    }

    if (post.postType === 'article') {
      return (<Article/>);
    }

    if (post.postType === 'question') {
      return (<Question/>);
    }

    if (post.postType === 'report') {
      return (<Report/>);
    }
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
