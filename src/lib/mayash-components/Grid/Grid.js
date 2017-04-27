import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const Grid = ({ children, className, ...restProps }) => (
  <div
    className={classNames('mdl-grid', className)}
    {...restProps}
  >
    {children}
  </div>
);

Grid.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]).isRequired,
  className: PropTypes.string,
};

export default Grid;
