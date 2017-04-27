import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

const MenuItem = ({ children, onClick }) => (
  <li
    className={classNames('mdl-menu__item')}
    onClick={onClick}
  >
    {children}
  </li>
);
MenuItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export const Menu = ({
  id,
  ripple,
  items,
  align,
  valign,
  className,
  ...restProps,
}) => {
  const menuClass = classNames('mdl-menu mdl-js-menu', {
    'mdl-js-ripple-effect': ripple,
    [`mdl-menu--${valign}-${align}`]: true,
  }, className);

  return (
    <ul
      className={menuClass}
      htmlFor={id}
      {...restProps}
    >
      {items.map(item => (
        <MenuItem
          key={item.name}
          onClick={item.onClick}
        >
          {item.name}
        </MenuItem>
      ))}
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
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  valign: PropTypes.oneOf(['bottom', 'top']),
  items: PropTypes.array.isRequired,
};

export default Menu;
