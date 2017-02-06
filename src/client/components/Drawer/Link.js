
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import { browserHistory } from 'react-router';

const Link = ({ urlName, url, style, className }) => (
  <a
    className={className}
    href={url}
    onClick={(e) => {
      e.preventDefault();
      browserHistory.push(url);
    }}
    style={style}
  >
    {urlName}
  </a>
);

Link.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape({}),
  url: PropTypes.string.isRequired,
  urlName: PropTypes.string.isRequired,
};

export default Link;
