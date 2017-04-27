import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const LayoutHeader = ({
  children,
  className = '',
  scroll = false,
  transparent = false,
  seamed = false, // Uses a header without a shadow
  ...restProps,
}) => {
  return (
    <header
      className={classNames(
        'mdl-layout__header', {
          'mdl-layout__header--scroll': scroll,
          'mdl-layout__header--transparent': transparent,
          'mdl-layout__header--seamed': seamed
        },
        className
      )}
      {...restProps}
    >
      {children}
    </header>
  );
};

LayoutHeader.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
};

export default LayoutHeader;
