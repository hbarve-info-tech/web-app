
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

const Drawer = () => (
  <div className="mdl-layout__drawer">
    <span className="mdl-layout-title">
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          browserHistory.push('/');
        }}
        style={{ color: 'black', textDecoration: 'none' }}
      >
        Mayash
      </a>
    </span>
    <nav className="mdl-navigation">
      <a
        className="mdl-navigation__link"
        href="/introduction"
      >
        Introduction
      </a>
      <a className="mdl-navigation__link" href="/about-us">About us</a>
      <a className="mdl-navigation__link" href="/product-and-services">Product & Services</a>
      <a className="mdl-navigation__link" href="/team">Team</a>
      <a className="mdl-navigation__link" href="/sponsors">Sponsors</a>
      <a className="mdl-navigation__link" href="/customer-reviews">Customer Reviews</a>
      <a className="mdl-navigation__link" href="/contact-us">Contact Us</a>
    </nav>
  </div>
);

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Drawer);
