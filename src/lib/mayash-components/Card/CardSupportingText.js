import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const CardSupportingText = ({ children, className, ...restProps }) => (
  <div
    className={classNames('mdl-card__supporting-text', className)}
    {...restProps}
  >
    {children}
  </div>
);

CardSupportingText.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]).isRequired,
  className: PropTypes.string,
};

export default CardSupportingText;
