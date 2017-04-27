import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const ListItemIcon = ({ children, className, ...restProps, }) => (
  <i
    className={classNames('mdl-list__item-icon material-icons', className)}
    {...restProps}
  >
    {children}
  </i>
);
ListItemIcon.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ListItemIcon;
