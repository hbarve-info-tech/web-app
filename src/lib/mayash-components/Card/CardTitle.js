import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const CardTitle = ({ children, className, ...restProps }) => (
  <div
    className={classNames('mdl-card__title', className)}
    {...restProps}
  >
    {children}
  </div>
);

CardTitle.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
};

export default CardTitle;
