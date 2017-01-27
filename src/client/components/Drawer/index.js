
import React from 'react';
import { connect } from 'react-redux';

const Drawer = () => (
  <div className="mdl-layout__drawer">
    <span className="mdl-layout-title">Mayash</span>
    <nav className="mdl-navigation">
      <a className="mdl-navigation__link" href="">Introduction</a>
      <a className="mdl-navigation__link" href="">About us</a>
      <a className="mdl-navigation__link" href="">Product & Services</a>
      <a className="mdl-navigation__link" href="">Team</a>
      <a className="mdl-navigation__link" href="">Sponsors</a>
      <a className="mdl-navigation__link" href="">Customer Reviews</a>
    </nav>
  </div>
);

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Drawer);
