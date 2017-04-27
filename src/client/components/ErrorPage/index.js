
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';

import style from './style';

const ErrorPage = ({
  statusCode = 404,
  error = 'Not Found',
  message = 'Not Found',
}) => (
  <div className="mdl-grid mdl-shadow--4dp">
    <div className="mdl-cell mdl-cell--12-col mdl-cell--2-offset-desktop mdl-cell--8-col-desktop mdl-cell--8-col-tablet mdl-cell--0-offset-phone mdl-cell--4-col-phone">
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
    </div>
  </div>
);


ErrorPage.propTypes = {
  statusCode: PropTypes.number.isRequired,
  error: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default ErrorPage;
