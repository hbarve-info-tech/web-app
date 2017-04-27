import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const LayoutTabPanel = ({ id, isActive, children, className, ...restProps }) => (
  <section
    className={classNames('mdl-layout__tab-panel', {
      'is-active': isActive,
    }, className)}
    id={id}
    {...restProps}
  >
    {children}
  </section>
);

LayoutTabPanel.propTypes = {
  children: PropTypes.any.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  isActive: PropTypes.bool,
  className: PropTypes.string,
};

export default LayoutTabPanel;
