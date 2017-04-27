import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const MegaFooterLinkList = ({ List, className, ...restProps }) => (
  <ul
    className={classNames('mdl-mega-footer__link-list', className)}
    {...restProps}
  >
    {List.map(link => (
      <li>
        <a
          href={link.href}
          key={link.href}
        >
          {link.name}
        </a>
      </li>
    ))}
  </ul>
);

MegaFooterLinkList.propTypes = {
  List: PropTypes.arrayOf([
    PropTypes.shape({
      href: PropTypes.string,
      name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
    }),
  ]),
  className: PropTypes.string,
};

export default MegaFooterLinkList;
