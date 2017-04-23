
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
    const { username } = this.props.routeParams;
    const element = this.props.elements.find(e => e.username === username);
    const { token } = this.props.elements[0];

    if (element.isFetched) {
      this.props.getPosts({ id: element.id, token });
    }
  }
  
  render() {
    const { username } = this.props.routeParams;
    const element = this.props.elements.find(e => e.username === username);

    if (element.statusCode === 404) {
      return (
        <div>
          Not Found...
        </div>
      );
    }

    const posts = this.props.posts.filter(a => a.authorId === element.id);
    
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
          <Timeline posts={posts} type="post"/>
        </div>
      </div>
    );
  }
}

ElementPage.propTypes = {
  routeParams: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  elements: PropTypes.array.isRequired,
  posts: PropTypes.array.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ElementPage);
