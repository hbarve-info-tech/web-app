import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const LayoutContent = ({ children, className, ...restProps, }) => {
  return (
    <main
      className={classNames('mdl-layout__content', className)}
      {...restProps}
    >
      {children}
    </main>
  );
};

LayoutContent.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
};

export default LayoutContent;
