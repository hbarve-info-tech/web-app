
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../../actions';

import HeaderRow from '../Header/HeaderRow';
import ProfileInfo from '../ProfileInfo';
import CreatePost from '../Create/CreatePost';
import PostTimeline from '../PostTimeline';
import CourseTimeline from '../CourseTimeline';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { id, token } = this.props.elements[0];
    this.props.getPosts({ id, token });
  }

  render() {
    const { elements } = this.props;
    const user = elements[0];
    const posts = this.props.posts.filter(a => a.authorId === elements[0].id);
    const courses = this.props.courses.filter(a => a.authorId === elements[0].id);

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--no-drawer-button">
        <header className="mdl-layout__header">
          <HeaderRow/>

          <div className="mdl-layout__tab-bar mdl-js-ripple-effect">
            <a href="#profile" className="mdl-layout__tab is-active">Profile</a>
            <a href="#posts" className="mdl-layout__tab">Posts</a>
            {user.classroom === true ? (<a href="#courses" className="mdl-layout__tab">Courses</a>) : null}
            <a href="#settings" className="mdl-layout__tab">Settings</a>
          </div>
        </header>
        <main className="mdl-layout__content">
          <section className="mdl-layout__tab-panel is-active" id="profile">
            <div className="page-content">
              <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--3-col">
                  <ProfileInfo {...user} />
                </div>
                <div className="mdl-cell mdl-cell--8-col">

                </div>
              </div>
            </div>
          </section>
          <section className="mdl-layout__tab-panel" id="posts">
            <div className="page-content">
              <PostTimeline posts={posts} />
            </div>
          </section>
          {user.classroom === true ? (
            <section className="mdl-layout__tab-panel" id="courses">
              <div className="page-content">
                <CourseTimeline courses={courses} />
              </div>
            </section>
          ) : null}
          <section className="mdl-layout__tab-panel" id="settings">
            <div className="page-content">
              <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--12-col">
                  <div className="mdl-card mdl-shadow--4dp" style={{width: '100%'}}>
                    <div className="mdl-card__title">
                      <div className="mdl-card__title-text">
                        Settings
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

Home.propTypes = {
  elements: PropTypes.array,
  posts: PropTypes.array,
  create: PropTypes.object,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
