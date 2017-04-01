
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import { connect } from 'react-redux';

import Link from './Link';
import Links from './Links';

const LandingPageLinks = [
  { urlName: 'Introduction', url: '/introduction', className: 'mdl-navigation__link' },
  { urlName: 'Motivation', url: '/motivation', className: 'mdl-navigation__link' },
  { urlName: 'About Us', url: '/about-us', className: 'mdl-navigation__link' },
  { urlName: 'Product & Services', url: '/product-and-services', className: 'mdl-navigation__link' },
  { urlName: 'Sponsors', url: '/sponsors', className: 'mdl-navigation__link' },
  { urlName: 'Customer Reviews', url: '/customer-reviews', className: 'mdl-navigation__link' },
  { urlName: 'Team', url: '/team', className: 'mdl-navigation__link' },
  { urlName: 'Contact Us', url: '/contact-us', className: 'mdl-navigation__link' },
];

const Drawer = ({ user }) => (
  <div className="mdl-layout__drawer">
    <span className="mdl-layout-title">
      <Link
        url={'/'}
        urlName={'Mayash'}
        style={{ color: 'black', textDecoration: 'none' }}
      />
    </span>
    {!user.isSignedIn ? <Links links={LandingPageLinks} /> : null}
  </div>
);

Drawer.propTypes = {
  user: PropTypes.shape({
    isSignedIn: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps)(Drawer);
