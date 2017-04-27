import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const ChipAction = ({
  children,
  className,
  ...restProps,
}) => (
  <a
    className={classNames('mdl-chip__action', className)}
    {...restProps}
    onClick={e => e.preventDefault()}
  >
    {children}
  </a>
);

ChipAction.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ChipAction;
