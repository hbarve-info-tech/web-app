
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';

import HeaderRow from '../Header/HeaderRow';
import ProfileInfo from '../ProfileInfo';
import PostTimeline from '../PostTimeline';
import CourseTimeline from '../CourseTimeline';

class ElementPage extends Component {
  componentDidMount() {
    const { token } = this.props.elements[0];
    const { id, classroom } = this.props.element;

    this.props.getPosts({id, token});
    if (classroom === true) {
      this.props.getClassroomCourses({ id, token });
    }
  }

  render() {
    const { element } = this.props;
    const posts = this.props.posts.filter(a => a.authorId === element.id);
    const courses = this.props.courses.filter(a => a.circleId === element.id);

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--no-drawer-button">
        <header className="mdl-layout__header">
          <HeaderRow/>

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