import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const TabPanel = ({ children, isActive = false, id, className, ...restProps }) => (
  <div
    className={classNames('mdl-tabs__panel', { 'is-active': isActive }, className)}
    id={id}
    {...restProps}
  >
    {children}
  </div>
);

TabPanel.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element
  ]),
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  isActive: PropTypes.bool
};

export default TabPanel;
