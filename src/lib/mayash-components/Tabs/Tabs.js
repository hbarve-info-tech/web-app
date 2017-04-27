import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const Tabs = ({ children, ripple = false, className, ...restProps }) => (
  <div
    className={classNames('mdl-tabs mdl-js-tabs', {
      'mdl-js-ripple-effect': ripple
    }, className)}
    {...restProps}
  >
    {children}
  </div>
);

Tabs.propTypes = {
  children: PropTypes.any.isRequired,
  ripple: PropTypes.bool,
  className: PropTypes.string,
};

export default Tabs;
