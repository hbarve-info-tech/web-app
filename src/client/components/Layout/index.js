
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from '../Header';
import Footer from '../Footer';

import actions from '../../actions';

import style from './style';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { id, token, isFetched, isSignedIn } = this.props.elements[0];
    if (isSignedIn && !isFetched) {
      // this.props.fetchUser({ id, token });
    }
  }

  render() {
    const { children, elements, location } = this.props;
    const user = elements[0];

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
  elements: PropTypes.array.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
