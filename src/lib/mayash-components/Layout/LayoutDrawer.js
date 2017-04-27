import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const LayoutDrawer = ({ children, className, ...restProps, }) => {
  return (
    <div
      className={classNames('mdl-layout__drawer', className)}
      {...restProps}
    >
      {children}
    </div>
  );
};

LayoutDrawer.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
};

export default LayoutDrawer;
