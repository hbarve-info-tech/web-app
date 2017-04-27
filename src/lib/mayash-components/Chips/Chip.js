import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const Chip = ({
  children,
  deletable = false,
  className,
  ...restProps,
}) => {
  const chipClass = classNames('mdl-chip', {
    'mdl-chip--deletable': deletable,
  }, className);

  return (
    <span
      className={chipClass}
      {...restProps}
    >
      {children}
    </span>
  );
};

Chip.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  deletable: PropTypes.bool,
};

export default Chip;
