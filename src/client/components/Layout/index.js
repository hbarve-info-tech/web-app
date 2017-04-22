
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from '../Header';
import Drawer from '../Drawer';
import Footer from '../Footer';
import PostCreate from '../PostCreate';

import actions from '../../actions';

import style from './style';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { id, token, isFetched, isSignedIn } = this.props.user;
    if (isSignedIn && !isFetched) {
      this.props.fetchUser({ id, token });
    }
  }

  render() {
    const { children, user, location } = this.props;

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--no-drawer-button">
        <Header />
        <main
          className="mdl-layout__content"
        >
          <div className="page-content">
            {children}
          </div>

          {/* Add spacer to push Footer down when not enough content*/}
          <div className="mdl-layout-spacer" />
          {user.isSignedIn === false && location.pathname === '/' ? <Footer /> : null}
        </main>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
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
  fetchUser: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
