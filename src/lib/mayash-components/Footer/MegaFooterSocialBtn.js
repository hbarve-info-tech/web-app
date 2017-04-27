import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const MegaFooterSocialBtn = ({
  children,
  className,
  ...restProps,
}) => (
  <button
    className={classNames('mdl-mega-footer__social-btn', className)}
    {...restProps}
  >
    {children}
  </button>
);

MegaFooterSocialBtn.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  className: PropTypes.string,
};

export default MegaFooterSocialBtn;
