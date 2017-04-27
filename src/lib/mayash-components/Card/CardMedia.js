import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const CardMedia = ({ children, className, ...restProps }) => (
  <div
    className={classNames('mdl-card__media', className)}
    {...restProps}
  >
    {children}
  </div>
);

CardMedia.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default CardMedia;
