import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const LayoutHeaderRow = ({
  children,
  className = '',
  ...restProps,
}) => {
  return (
    <div
      className={classNames('mdl-layout__header-row', className)}
      {...restProps}
    >
      {children}
    </div>
  );
};

LayoutHeaderRow.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
};

export default LayoutHeaderRow;
