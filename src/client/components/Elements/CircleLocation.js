
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';

import HeaderRow from '../Header/HeaderRow';
import ProfileInfo from '../ProfileInfo';
import PostTimeline from '../PostTimeline';

class ElementPage extends Component {
  componentDidMount() {
    const { token } = this.props.elements[0];
    const { id } = this.props.element;

    this.props.getPosts({id, token});
  }

  render() {
    const { username } = this.props.routeParams;
    const element = this.props.elements.find(e => e.username === username);
    const posts = this.props.posts.filter(a => a.authorId === element.id);

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--no-drawer-button">
        <header className="mdl-layout__header">
          <HeaderRow/>

          <div className="mdl-layout__tab-bar mdl-js-ripple-effect">
            <a href="#scroll-tab-1" className="mdl-layout__tab is-active">Profile</a>
            <a href="#scroll-tab-2" className="mdl-layout__tab">Posts</a>
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
        </main>
      </div>
    );
  }
}

export default ElementPage;