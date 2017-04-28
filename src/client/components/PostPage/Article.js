
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../../actions';

import Post from './Post';
import Error from '../Error';

class PostPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // const { postId } = this.props.routeParams;
    // const post = this.props.posts.find(p => p.postId === parseInt(postId, 10));
    // const user = this.props.elements[0];

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
            <a href="#scroll-tab-1" className="mdl-layout__tab is-active">Article</a>
            <a href="#scroll-tab-2" className="mdl-layout__tab">Comments</a>
          </div>
        </header>
        <main className="mdl-layout__content">
          <section className="mdl-layout__tab-panel is-active" id="scroll-tab-1">
            <div className="page-content">Tab 1</div>
          </section>
          <section className="mdl-layout__tab-panel" id="scroll-tab-2">
            <div className="page-content">Tab2</div>
          </section>
        </main>
      </div>
    );
  }
}

PostPage.propTypes = {
  // routeParams: PropTypes.shape({
  //   postId: PropTypes.string.isRequired,
  // }).isRequired,
  // elements: PropTypes.array.isRequired,
  // posts: PropTypes.array.isRequired,
  // updatePost: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
