
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';

import style from './style';

const Error = ({
  statusCode = 404,
  error = 'Not Found',
  message = 'Not Found',
}) => (
  <div
    className="mdl-card mdl-shadow--4dp"
    style={style.errorPage}
  >
    <div
      className="mdl-card__title"
      style={style.title}
    >
      <h2 className="mdl-card__title-text">
        <strong>{statusCode}:</strong>{` ${error}`}
      </h2>
    </div>
    <div className="mdl-card__supporting-text">
      {message}
    </div>
  </div>
);

Error.propTypes = {
  statusCode: PropTypes.number.isRequired,
  error: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Error;
