
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../../actions';

import style from './style';

const signInFunc = () => window.location.href = '/signin';

const HeaderRow = ({ elements, signOut }) => {
  const user = elements[0];

  return (
    <div className="mdl-layout__header-row">
    <span className="mdl-layout-title">
      <a href="/" style={style.headerTitle}>
        Mayash &beta;eta
      </a>
    </span>

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
          onClick={user.isSignedIn === true ? signOut : signInFunc}
        >
          {user.isSignedIn === true ? 'Sign Out' : 'Sign In'}
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = state => state;
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HeaderRow);
