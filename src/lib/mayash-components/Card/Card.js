import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const Card = ({
  children,
  className,
  shadowDepth = 0,
  ...restProps,
}) => {
  const cardClass = classNames('mdl-card', className, {
    [`mdl-shadow--${shadowDepth}dp`]: shadowDepth !== 0,
  });

  return (
    <div
      className={cardClass}
      {...restProps}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]).isRequired,
  className: PropTypes.string,
  shadowDepth: PropTypes.oneOf([0, 2, 3, 4, 6, 8, 16]),
};

export default Card;
