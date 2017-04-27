import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const NavigationLink = ({
  href = '#',
  onClick = (e) => e.preventDefault(),
  text = 'link'
}) => (
  <a
    className={classNames('mdl-navigation__link')}
    href={href}
    onClick={onClick}
  >
    {text}
  </a>
);
NavigationLink.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  href: PropTypes.string.isRequired,
};

export default NavigationLink;
