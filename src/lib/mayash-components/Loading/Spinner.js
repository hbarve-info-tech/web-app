import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const Spinner = ({ className, isActive, singleColor, ...restProps }) => (
  <div
    className={classNames('mdl-spinner mdl-js-spinner', {
      'is-active': isActive,
      'mdl-spinner--single-color': singleColor,
    }, className)}
    {...restProps}
  />
);

Spinner.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
  singleColor: PropTypes.bool
};

export default Spinner;
