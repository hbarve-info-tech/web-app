import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const DialogContent = ({
  children,
  className,
  ...restProps,
}) => (
  <div
    className={classNames('mdl-dialog__content', className)}
    {...restProps}
  >
    {children}
  </div>
);

DialogContent.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
};

export default DialogContent;
