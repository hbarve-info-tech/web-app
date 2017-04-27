import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const ListItemTextBody = ({ children, className, ...restProps }) => (
  <span
    className={classNames('mdl-list__item-text-body', className)}
    {...restProps}
  >
    {children}
  </span>
);
ListItemTextBody.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ListItemTextBody;
