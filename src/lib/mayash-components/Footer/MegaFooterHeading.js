import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const MegaFooterHeading = ({ children, className, ...restProps }) => (
  <h1
    className={classNames('mdl-mega-footer__heading', className)}
    {...restProps}
  >
    {children}
  </h1>
);

MegaFooterHeading.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]),
  className: PropTypes.string,
};

export default MegaFooterHeading;
