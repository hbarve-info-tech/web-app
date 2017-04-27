import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const CardMenu = ({ children, className, ...restProps }) => (
  <div
    className={classNames('mdl-card__menu', className)}
    {...restProps}
  >
    {children}
  </div>
);

CardMenu.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]).isRequired,
};

export default CardMenu;
