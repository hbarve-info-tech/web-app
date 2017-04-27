import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

import Tab from './Tab';

export const TabBar = ({ tabs = [], className, ...restProps }) => (
  <div
    className={classNames('mdl-tabs__tab-bar', className)}
    {...restProps}
  >
    {tabs.map(tab => <Tab {...tab} key={tab.href}>{tab.text}</Tab>)}
  </div>
);

TabBar.propTypes = {
  tabs: PropTypes.array.isRequired,
  className: PropTypes.string,
};

export default TabBar;
