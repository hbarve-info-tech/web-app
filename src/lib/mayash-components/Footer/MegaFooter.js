import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const MegaFooter = ({ children, className, ...restProps}) => (
  <footer
    className={classNames('mdl-mega-footer', className)}
    {...restProps}
  >
    {children}
  </footer>
);

MegaFooter.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]),
};

export default MegaFooter;
