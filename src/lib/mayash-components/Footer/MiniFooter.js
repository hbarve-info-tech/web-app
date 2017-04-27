import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const MiniFooter = ({ children, className, ...restProps}) => (
  <footer
    className={classNames('mdl-mini-footer', className)}
    {...restProps}
  >
    {children}
  </footer>
);
MiniFooter.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]),
  className: PropTypes.string,
};

export default MiniFooter;
