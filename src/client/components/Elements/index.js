
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../../actions';

import ProfileInfo from '../ProfileInfo';
import Timeline from '../Timeline';

class ElementPage extends Component {
  componentDidMount() {
    const { token } = this.props.user;
    const { username } = this.props.routeParams;
    const element = this.props.elements.array.find(e => e.username === username);
    if (element.isFetched) {
      this.props.fetchArticles({ id: element.id, token });
    }
  }
  
  render() {
    const { username } = this.props.routeParams;
    const element = this.props.elements.array.find(e => e.username === username);
    const posts = this.props.articles.array.filter(a => a.authorId === element.id);
    
    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--2-col mdl-cell--2-col-tablet mdl-cell--4-col-phone">
          <ProfileInfo
            name={element.name}
            username={element.username}
            profilePic={element.profilePic}
            classroom={element.classroom || false}
          />
        </div>
        <div className="mdl-cell mdl-cell--8-col mdl-cell--5-col-tablet mdl-cell--4-col-phone">
          <Timeline
            posts={posts}
            timelineType="article"
          />
        </div>
      </div>
    );
  }
}

ElementPage.propTypes = {
  routeParams: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    token: PropTypes.string.isRequired,
  }).isRequired,
  elements: PropTypes.shape({
    array: PropTypes.arrayOf(PropTypes.object.isRequired),
  }).isRequired,
  articles: PropTypes.shape({
    array: PropTypes.array.isRequired,
  }).isRequired,
  fetchArticles: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ElementPage);
