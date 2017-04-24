
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../../actions';

import Post from './Post';
import Error from '../Error';

class ArticlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { postId } = this.props.routeParams;
    const post = this.props.posts.find(a => a.postId === parseInt(postId, 10));

    if (post && post.statusCode !== 200) {
      return (
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--8-col mdl-cell--6-col-tablet mdl-cell--4-col-phone">
            <Error {...post} />
          </div>
          <div className="mdl-cell mdl-cell--4-col mdl-cell--2-col-tablet mdl-cell--4-col-phone" />
        </div>
      );
    }

    return (
      <div className="mdl-grid">
        <div
          className="mdl-cell mdl-cell--12-col mdl-cell--2-offset-desktop mdl-cell--8-col-desktop mdl-cell--8-col-tablet mdl-cell--0-offset-phone mdl-cell--4-col-phone"
        >
          <Post post={post} />
        </div>
      </div>
    );
  }
}

ArticlePage.propTypes = {
  routeParams: PropTypes.shape({
    postId: PropTypes.string.isRequired,
  }).isRequired,
  elements: PropTypes.array.isRequired,
  posts: PropTypes.array.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
