import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const ListItem = ({
  children,
  twoLine = false,
  threeLine = false,
  className,
  ...restProps,
}) => (
  <li
    className={classNames('mdl-list__item', {
      'mdl-list__item--two-line': twoLine,
      'mdl-list__item--three-line': threeLine
    }, className)}
    {...restProps}
  >
    {children}
  </li>
);
ListItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]).isRequired,
  className: PropTypes.string,
};

export default ListItem;
