import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const CardSubTitleText = ({ children, className, ...restProps }) => (
  <p
    className={classNames('mdl-card__subtitle-text', className)}
    {...restProps}
  >
    {children}
  </p>
);
CardSubTitleText.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  className: PropTypes.string,
};

export default CardSubTitleText;
