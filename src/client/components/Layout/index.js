
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from '../Header';
import Drawer from '../Drawer';
import Footer from '../Footer';

import actions from '../../actions';

const IsClient = typeof document === 'object';

if (IsClient) {
  require('./Layout.scss');
}

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
    const { children, user } = this.props;

    return (
      <div
        className="mayash-layout mdl-layout mdl-js-layout mdl-layout--fixed-header"
      >
        <Header />
        <Drawer />
        <main
          className="mdl-layout__content"
        >
          <div className="page-content">
            {children}
          </div>

          {/* Add spacer to push Footer down when not enough content*/}
          <div className="mdl-layout-spacer" />
          {user.isSignedIn === false ? <Footer /> : null}
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
};

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
