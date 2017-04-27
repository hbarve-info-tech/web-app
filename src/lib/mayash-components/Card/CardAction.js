import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const CardAction = ({ children, className, ...restProps }) => (
  <div
    className={classNames('mdl-card__actions', className)}
    {...restProps}
  >
    {children}
  </div>
);

CardAction.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]).isRequired,
  className: PropTypes.string,
};

export default CardAction;
