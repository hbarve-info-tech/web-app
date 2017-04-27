import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const MiniFooterSection = ({
                                    sectionType,
                                    children,
                                    className,
                                    ...restProps,
                                  }) => (
  <div
    className={classNames(`mdl-mini-footer__${sectionType}-section`, className)}
    {...restProps}
  >
    {children}
  </div>
);
MiniFooterSection.propTypes = {
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

export default MiniFooterSection;
