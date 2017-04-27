import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const Tab = ({
  children,
  href = '',
  isActive = false,
  onClick = e => e.preventDefault(),
  className,
  style,
  ...restProps
}) => (
  <a
    href={`#${href}`}
    className={classNames('mdl-tabs__tab', {
      'is-active': isActive,
    }, className)}
    onClick={onClick}
    style={style}
  >
    {children}
  </a>
);

Tab.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Tab;
