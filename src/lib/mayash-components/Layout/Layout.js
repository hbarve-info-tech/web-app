// TODO: add 'mdl-layout--large-screen-only' and 'mdl-layout--small-screen-only' in any descendant of mdl-layout.

import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const Layout = ({
  children,
  className,
  fixedHeader = false,
  fixedDrawer = false,
  fixedTabs = false,
  noDrawerButton = false,
  noDesktopDrawerButton = false,
  ...restProps,
}) => {
  const layoutClass = classNames(
    'mdl-layout',
    'mdl-js-layout', {
      'mdl-layout--fixed-drawer': fixedDrawer,
      'mdl-layout--fixed-header': fixedHeader,
      'mdl-layout--fixed-tabs': fixedTabs,
      'mdl-layout--no-drawer-button': noDrawerButton,
      'mdl-layout--no-desktop-drawer-button': noDesktopDrawerButton
    },
    className,
  );

  return (
    <div
      className={layoutClass}
      {...restProps}
    >
      {children}
    </div>
  );
};
Layout.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  fixedHeader: PropTypes.bool,
  fixedDrawer: PropTypes.bool,
  fixedTabs: PropTypes.bool,
  noDrawerButton: PropTypes.bool,
  noDesktopDrawerButton: PropTypes.bool,
};

export default Layout;
