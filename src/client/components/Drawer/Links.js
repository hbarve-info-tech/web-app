
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';

import Link from './Link';

const Links = ({ links }) => (
  <nav className="mdl-navigation">
    {links.map(link => (
      <Link key={link.url} url={link.url} urlName={link.urlName} className={link.className} />
    ))}
  </nav>
);

Links.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Links;
