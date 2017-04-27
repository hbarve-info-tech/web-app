import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

const LayoutTab = ({ text, id, isActive, className, ...restProps, }) => (
  <a
    href={`#${id}`}
    className={classNames('mdl-layout__tab', {
      'is-active': isActive,
    }, className)}
    {...restProps}
  >
    {text}
  </a>
);

export const LayoutTabBar = ({ tabs, ripple, className, ...restProps, }) => {
  return (
    <div
      className={classNames('mdl-layout__tab-bar', {
        'mdl-js-ripple-effect': ripple
      }, className)}
      {...restProps}
    >
      {tabs.map(tab => (
        <LayoutTab {...tab} key={tab.id} />
      ))}
    </div>
  );
};
LayoutTabBar.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      isActive: PropTypes.bool,
    }),
  ).isRequired,
  ripple: PropTypes.bool,
};

export default LayoutTabBar;
