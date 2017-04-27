import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const LayoutTitle = ({
  children,
  className,
  ...restProps,
}) => (
  <span
    className={classNames('mdl-layout-title', className)}
    {...restProps}
  >
    {children}
  </span>
);

LayoutTitle.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
};

export default LayoutTitle;
