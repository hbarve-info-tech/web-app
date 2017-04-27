import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const ListItemSecondaryInfo = ({ children, className, ...restProps }) => (
  <span
    className={classNames(`mdl-list__item-secondary-info`, className)}
    {...restProps}
  >
    {children}
  </span>
);
ListItemSecondaryInfo.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]).isRequired,
  className: PropTypes.string,
};

export default ListItemSecondaryInfo;
