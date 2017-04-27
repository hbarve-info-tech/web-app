import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const LayoutPageContent = ({ children, className, ...restProps, }) => {
  return (
    <div
      className={classNames('page-content', className)}
      {...restProps}
    >
      {children}
    </div>
  );
};

LayoutPageContent.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
};

export default LayoutPageContent;
