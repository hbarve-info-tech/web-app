import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const ListItemAvatar = ({ children, className, ...restProps, }) => (
  <i
    className={classNames('mdl-list__item-avatar material-icons', className)}
    {...restProps}
  >
    {children}
  </i>
);
ListItemAvatar.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ListItemAvatar;
