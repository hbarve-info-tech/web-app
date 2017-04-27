import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const ListItemSubTitle = ({ children, className, ...restProps }) => (
  <span
    className={classNames('mdl-list__item-sub-title', className)}
    {...restProps}
  >
    {children}
  </span>
);
ListItemSubTitle.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ListItemSubTitle;
