import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const Cell = ({
  children,

  cell = 0,
  phoneCell = 0,
  tabletCell = 0,
  desktopCell = 0,

  offset = 0,
  phoneOffset = 0,
  tabletOffset = 0,
  desktopOffset = 0,

  order = 0,
  phoneOrder = 0,
  tabletOrder = 0,
  desktopOrder = 0,

  phoneHide = false,
  tabletHide = false,
  desktopHide = false,

  stretch = false,
  align = 'none',

  className,
  ...restProps,
}) => {
  const cellClass = classNames('mdl-cell', {
    [`mdl-cell--${cell}-col`]: cell > 0 && cell < 13,
    [`mdl-cell--${phoneCell}-col-phone`]: phoneCell > 0 && phoneCell < 13,
    [`mdl-cell--${tabletCell}-col-tablet`]: tabletCell > 0 && tabletCell < 13,
    [`mdl-cell--${desktopCell}-col-desktop`]: desktopCell > 0 && desktopCell < 13,
    [`mdl-cell--${offset}-offset`]: offset > 0 && offset < 13,
    [`mdl-cell--${phoneOffset}-offset-phone`]: phoneOffset > 0 && phoneOffset < 13,
    [`mdl-cell--${tabletOffset}-offset-tablet`]: tabletOffset > 0 && tabletOffset < 13,
    [`mdl-cell--${desktopOffset}-offset-desktop`]: desktopOffset > 0 && desktopOffset < 13,
    [`mdl-cell--order-${order}`]: order > 0 && order < 13,
    [`mdl-cell--order-${phoneOrder}`]: phoneOrder > 0 && phoneOrder < 13,
    [`mdl-cell--order-${tabletOrder}`]: tabletOrder > 0 && tabletOrder < 13,
    [`mdl-cell--order-${desktopOrder}`]: desktopOrder > 0 && desktopOrder < 13,
    [`mdl-cell--hide-phone`]: phoneHide,
    [`mdl-cell--hide-tablet`]: tabletHide,
    [`mdl-cell--hide-desktop`]: desktopHide,
    ['mdl-cell--stretch']: stretch,
    [`mdl-cell--${align}`]: align !== 'none'
  }, className);

  return (
    <div className={cellClass} {...restProps}>
      {children}
    </div>
  );
};

Cell.propTypes = {
  cell: PropTypes.number.isRequired,
  phoneCell: PropTypes.number,
  tabletCell: PropTypes.number,
  desktopCell: PropTypes.number,
  offset: PropTypes.number,
  phoneOffset: PropTypes.number,
  tabletOffset: PropTypes.number,
  desktopOffset: PropTypes.number,
  order: PropTypes.number,
  phoneOrder: PropTypes.number,
  tabletOrder: PropTypes.number,
  desktopOrder: PropTypes.number,
  phoneHide: PropTypes.bool,
  tabletHide: PropTypes.bool,
  desktopHide: PropTypes.bool,
  stretch: PropTypes.bool,
  align: PropTypes.oneOf(['none', 'top', 'middle', 'bottom']),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]).isRequired,
};

export default Cell;
