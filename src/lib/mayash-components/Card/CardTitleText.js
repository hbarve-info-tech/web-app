import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const CardTitleText = ({ children, className, ...restProps }) => (
  <h2
    className={classNames('mdl-card__title-text', className)}
    {...restProps}
  >
    {children}
  </h2>
);

CardTitleText.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  className: PropTypes.string,
};

export default CardTitleText;
