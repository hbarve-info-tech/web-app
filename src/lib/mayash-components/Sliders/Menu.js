import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

const MenuItem = ({ children }) => (
  <li className={classNames('mdl-menu__item')}>{children}</li>
);
MenuItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])
};

export const Menu = ({ id, ripple, items, align, valign, ...restProps }) => {
  const className = classNames('mdl-menu mdl-js-menu', {
    'mdl-js-ripple-effect': ripple,
    [`mdl-menu--${valign}-${align}`]: true,
  });

  return (
    <ul className={className} htmlFor={id} {...restProps}>
      {items.map(item => <MenuItem {...item}/>)}
    </ul>
  );
};
Menu.defaultProps = {
  align: 'left',
  valign: 'bottom'
};
Menu.propTypes = {
  align: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string,
  ripple: PropTypes.bool,
  target: PropTypes.string.isRequired,
  valign: PropTypes.oneOf(['bottom', 'top'])
};

export default Menu;
