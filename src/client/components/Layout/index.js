//
// import React from 'react';
// import Component from 'react/lib/ReactComponent';
// import PropTypes from 'react/lib/ReactPropTypes';
// import { browserHistory } from 'react-router';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
//
// import actions from '../../actions';
//
// class Layout extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//
//   componentDidMount() {
//     const { id, token, isFetched, isSignedIn } = this.props.elements[0];
//     if (isSignedIn && !isFetched) {
//       // this.props.getElement({ id, token });
//     }
//   }
//
//   render() {
//     const { children } = this.props;
//
//     return (
//       <div>
//         {children}
//       </div>
//     );
//   }
// }
//
// Layout.propTypes = {
//   children: PropTypes.element.isRequired,
//   elements: PropTypes.array.isRequired,
//   location: PropTypes.shape({
//     pathname: PropTypes.string.isRequired,
//   }).isRequired,
// };
//
// const mapStateToProps = state => state;
// const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
//
// export default connect(mapStateToProps, mapDispatchToProps)(Layout);


/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { deepOrange500 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {green100, green500, green700} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: green500,
    primary2Color: green700,
    primary3Color: green100,
  },
}, {
  avatar: {
    borderColor: null,
  },
  userAgent: 'all',
});

class Layout extends Component {

  render() {

    return (
      <MuiThemeProvider>
        {this.props.children}
      </MuiThemeProvider>
    );
  }
}

export default Layout;
