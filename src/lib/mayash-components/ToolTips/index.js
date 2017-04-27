import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const ToolTips = ({
  children,
  id,
  large = false,
  className,
  ...restProps,
}) => (
  <div
    className={classNames('mdl-tooltip', {
      'mdl-tooltip--large': large
    }, className)}
    htmlFor={id}
    {...restProps}
  >
    {children}
  </div>
);
ToolTips.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  large: PropTypes.bool,
};

export default ToolTips;
