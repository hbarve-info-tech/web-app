
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../../actions';

import ProfileInfo from '../ProfileInfo';
import Timeline from '../Timeline';
import ErrorPage from '../ErrorPage';

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
            <a href="#scroll-tab-4" className="mdl-layout__tab">Members</a>
          </div>
        </header>
        <main className="mdl-layout__content">
          <section className="mdl-layout__tab-panel is-active" id="scroll-tab-1">
            <div className="page-content">
              <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--3-col">
                  <div className="mdl-card">
                    <div className="mdl-card__media">
                      <img src={element.avatar} style={{width: '100%'}}/>
                    </div>
                    <div className="mdl-card__title">
                      <h2 className="mdl-card__title-text">{element.name}</h2>
                      <h5 className="mdl-card__subtitle-text">@{element.username}</h5>
                    </div>
                    <div className="mdl-card__supporting-text">
                      {element.description}
                    </div>
                    <div className="mdl-card__actions mdl-card--border">
                      <a className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect">
                        Follow
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mdl-cell mdl-cell--8-col">

                </div>
              </div>
            </div>
          </section>
          <section className="mdl-layout__tab-panel" id="scroll-tab-2">
            <div className="page-content">
              <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--8-col mdl-cell--2-offset-desktop">
                  {posts.map(post => (
                    <div
                      className="mdl-card mdl-shadow--4dp"
                      style={{minHeight: '50px', width: '100%', marginBottom: '10px'}}
                      key={post.postId}
                    >
                      <div className="mdl-card__title">
                        <div className="mdl-card__title-text">{post.title}</div>
                      </div>
                      {post.description ? (
                        <div className="mdl-card__supporting-text">
                          {post.description}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section className="mdl-layout__tab-panel" id="scroll-tab-3">
            <div className="page-content">
              <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--8-col mdl-cell--2-offset-desktop">
                  {courses.map(course => (
                    <div
                      className="mdl-card mdl-shadow--4dp"
                      style={{minHeight: '50px', width: '100%', marginBottom: '10px'}}
                      key={course.courseId}
                    >
                      <div className="mdl-card__title">
                        <div className="mdl-card__title-text">{course.title}</div>
                      </div>
                      {course.description ? (
                        <div className="mdl-card__supporting-text">
                          {course.description}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section className="mdl-layout__tab-panel" id="scroll-tab-4">
            <div className="page-content">Tab3</div>
          </section>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ElementPage);
