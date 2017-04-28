
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../../actions';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { id, token, isFetched, isSignedIn } = this.props.elements[0];
    if (isSignedIn && !isFetched) {
      // this.props.getElement({ id, token });
    }
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        <div style={{ position: 'fixed', zIndex: '1000', bottom: '0px', left: '0px'}}>
          <a href="/">Home </a>
          <a href="/signin">Sign In </a>
          <a href="/hbarve1">User </a>
          <a href="/courses/1234">Course </a>
          <a href="/posts/5654891867406336">Post </a>
          <a href="/hbarve1/classroom">classroom </a>
        </div>
        {children}
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
//
// const Layout1 = ({ children }) => (<div>{children}</div>);
//
// export default Layout1;
