import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const ChipText = ({
  children,
  className,
  ...restProps,
}) => (
  <span
    className={classNames('mdl-chip__text', className)}
    {...restProps}
  >
    {children}
  </span>
);
ChipText.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.oneOfType([
    PropTypes.string,
  ]),
};

export default ChipText;
