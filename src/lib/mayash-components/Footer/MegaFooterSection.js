import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const MegaFooterSection = ({
  sectionType,
  children,
  className,
  ...restProps
}) => (
  <div
    className={classNames(`mdl-mega-footer__${sectionType}-section`, className)}
    {...restProps}
  >
    {children}
  </div>
);

MegaFooterSection.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]),
  sectionType: PropTypes.oneOf([
    'top',
    'middle',
    'bottom',
    'left',
    'right',
    'drop-down'
  ]).isRequired,
  className: PropTypes.string,
};

export default MegaFooterSection;
