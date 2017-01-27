
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../../actions';

import ProfileInfo from '../ProfileInfo';
import PostCreate from '../PostCreate';
import Timeline from '../Timeline';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { id, token } = this.props.user;
    this.props.fetchArticles({ id, token });
  }

  render() {
    const { user } = this.props;
    const articles = this.props.articles.array;

    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--2-col mdl-cell--2-col-tablet mdl-cell--4-col-phone">
          <ProfileInfo
            name={user.name}
            username={user.username}
            profilePic={user.profilePic}
            classroom={user.classroom}
          />
        </div>
        <div className="mdl-cell mdl-cell--8-col mdl-cell--5-col-tablet mdl-cell--4-col-phone">
          <Timeline
            posts={articles}
            timelineType="article"
          />
        </div>
        <PostCreate />
      </div>
    );
  }
}

Home.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    username: PropTypes.string,
    token: PropTypes.string,
    profilePic: PropTypes.string,
    isSigningIn: PropTypes.bool,
    isSignedIn: PropTypes.bool,
    isFetching: PropTypes.bool,
    isFetched: PropTypes.bool,
    isError: PropTypes.bool,
    error: PropTypes.string,
    message: PropTypes.string,
    lastUpdated: PropTypes.number,
  }).isRequired,
  fetchArticles: PropTypes.func.isRequired,
  articles: PropTypes.shape({
    array: PropTypes.array.isRequired,
  }).isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
