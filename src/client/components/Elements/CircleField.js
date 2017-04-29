
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';

import ProfileInfo from '../ProfileInfo';
import PostTimeline from '../PostTimeline';
import CourseTimeline from '../CourseTimeline';

class ElementPage extends Component {

  render() {
    const { username } = this.props.routeParams;
    const element = this.props.elements.find(e => e.username === username);
    const posts = this.props.posts.filter(a => a.authorId === element.id);
    const courses = this.props.courses.filter(a => a.authorId === element.id);

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--no-drawer-button">
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">Mayash</span>

            <div className="mdl-layout-spacer" />

            <button
              id="sign-in-dropdown"
              className="mdl-button mdl-js-button mdl-button--icon"
            >
              <i className="material-icons">more_vert</i>
            </button>
            <ul
              className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
              htmlFor="sign-in-dropdown"
            >
              <li
                className="mdl-menu__item"
                onClick={this.props.signOut}
              >
                Sign Out
              </li>
            </ul>
          </div>

          <div className="mdl-layout__tab-bar mdl-js-ripple-effect">
            <a href="#scroll-tab-1" className="mdl-layout__tab is-active">Profile</a>
            <a href="#scroll-tab-2" className="mdl-layout__tab">Posts</a>
            <a href="#scroll-tab-3" className="mdl-layout__tab">Courses</a>
          </div>
        </header>
        <main className="mdl-layout__content">
          <section className="mdl-layout__tab-panel is-active" id="scroll-tab-1">
            <div className="page-content">
              <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--3-col">
                  <ProfileInfo {...element} />
                </div>
                <div className="mdl-cell mdl-cell--8-col">

                </div>
              </div>
            </div>
          </section>
          <section className="mdl-layout__tab-panel" id="scroll-tab-2">
            <div className="page-content">
              <PostTimeline posts={posts} />
            </div>
          </section>
          <section className="mdl-layout__tab-panel" id="scroll-tab-3">
            <div className="page-content">
              <CourseTimeline courses={courses} />
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default ElementPage;
