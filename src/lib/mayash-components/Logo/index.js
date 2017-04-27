import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

const Logo = ({ children, className, ...restProps }) => (
  <div
    className={classNames('mdl-logo', className)}
    {...restProps}
  >
    {children}
  </div>
);
Logo.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]).isRequired,
  className: PropTypes.string,
};

export default Logo;
