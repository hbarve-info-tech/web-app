
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';

import HeaderRow from '../Header/HeaderRow';

import style from './style';

const ErrorPage = ({
  statusCode = 404,
  error = 'Not Found',
  message = 'Not Found',
}) => (
  <div>
    <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--no-drawer-button">
      <header className="mdl-layout__header">
        <HeaderRow/>
      </header>
      <main className="mdl-layout__content">
        <div className="page-content">
          <div className="mdl-grid">
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
        </div>
      </main>
    </div>
  </div>
);


ErrorPage.propTypes = {
  statusCode: PropTypes.number,
  error: PropTypes.string,
  message: PropTypes.string,
};

export default ErrorPage;
