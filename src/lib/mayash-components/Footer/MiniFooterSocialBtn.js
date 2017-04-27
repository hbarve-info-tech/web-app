import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const MiniFooterSocialBtn = ({
  children,
  className,
  ...restProps,
}) => (
  <button
    className={classNames('mdl-mini-footer__social-btn', className)}
    {...restProps}
  >
    {children}
  </button>
);

MiniFooterSocialBtn.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  className: PropTypes.string,
};

export default MiniFooterSocialBtn;
