import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

import NavigationLink from './NavigationLink';

export const Navigation = ({ className, links, ...restProps }) => (
  <nav
    className={classNames('mdl-navigation', className)}
    {...restProps}
  >
    {links.map((link, i) => (
      <NavigationLink
        {...link}
        key={link.href || i + 1}
      />
    ))}
  </nav>
);

Navigation.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      href: PropTypes.string.isRequired,
    }),
  ).isRequired,
  className: PropTypes.string,
};

export default Navigation;
