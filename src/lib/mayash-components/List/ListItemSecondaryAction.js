import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const ListItemSecondaryAction = ({ children, className, ...restProps }) => (
  <span
    className={classNames(`mdl-list__item-secondary-action`, className)}
    {...restProps}
  >
    {children}
  </span>
);
ListItemSecondaryAction.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]).isRequired,
  className: PropTypes.string,
};

export default ListItemSecondaryAction;
