import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const ListItemPrimaryContent = ({ children, className, ...restProps, }) => (
  <span
    className={classNames(`mdl-list__item-primary-content`, className)}
    {...restProps}
  >
    {children}
  </span>
);
ListItemPrimaryContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]).isRequired,
  className: PropTypes.string
};

export default ListItemPrimaryContent;
