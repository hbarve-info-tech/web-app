
import React from 'react';

import style from './style';

const HeaderRow = ({}) => (
  <div className="mdl-layout__header-row">
    <span className="mdl-layout-title">
      <a href="/" style={style.headerTitle}>
        Mayash
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
      <li className="mdl-menu__item">
        Sign Out
      </li>
    </ul>
  </div>
);

export default HeaderRow;
