
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const LayoutIcon = ({ children, className, ...restProps, }) => {
  return (
    <div
      className={classNames('mdl-layout-icon', className)}
      {...restProps}
    >
      {children}
    </div>
  );
};
LayoutIcon.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};

export default LayoutIcon;
