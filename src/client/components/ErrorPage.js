"use strict";
import React from "react";

const ErrorPage = ({
  statusCode     =404,
  messageHeading ='Oops! Page not found.',
  message        = 'We could not find the page you were looking for. Meanwhile, you may return to dashboard.'
}) => {
  return (
    <section class="content">
      <div class="error-page">
        <div class="headline text-yellow">
          {statusCode}
        </div>
        <div>
          <h3>
            <i class="fa fa-warning text-yellow"/>
            {' ' + messageHeading}
          </h3>
          <p>{message}</p>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
