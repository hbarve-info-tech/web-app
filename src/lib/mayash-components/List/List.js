import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const List = ({ children, className, ...restProps }) => (
  <ul
    className={classNames('mdl-list', className)}
    {...restProps}
  >
    {children}
  </ul>
);
List.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]),
  className: PropTypes.string,
};

export default List;
