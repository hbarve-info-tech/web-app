import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const ListItemSecondaryContent = ({ children, className, ...restProps }) => (
  <span
    className={classNames(`mdl-list__item-secondary-content`, className)}
    {...restProps}
  >
    {children}
  </span>
);
ListItemSecondaryContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]).isRequired,
  className: PropTypes.string,
};

export default ListItemSecondaryContent;
