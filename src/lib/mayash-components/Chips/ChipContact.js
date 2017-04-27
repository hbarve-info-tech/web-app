import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import classNames from 'classnames';

export const ChipContact = ({
  src,
  alt,
  className,
  ...restProps,
}) => (
  <img
    src={src}
    alt={alt}
    className={classNames(className)}
    {...restProps}
  />
);

ChipContact.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ChipContact;
