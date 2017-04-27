import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const Icon = ({ children, className, ...restProps }) => (
  <i
    className={classNames('material-icons', className)}
    {...restProps}
  >
    {children}
  </i>
);

Icon.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Icon;
