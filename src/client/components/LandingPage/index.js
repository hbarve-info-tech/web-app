
import React from 'react';

import style from './style';

export default () => (
  <div style={style.landingPage}>

    <div className="mdl-card mdl-shadow--4dp" style={style.introduction}>
      <div className="mdl-card__title" style={style.introduction.title}>
        <h2 className="mdl-card__title-text">Introduction</h2>
      </div>
      <div className="mdl-card__supporting-text">
        <strong>Mayash</strong> is a team of IITians committed to solve the challenges of the
        society. As there are so many challenges are out there, quality in education is one
        of the core problem.
        </div>
    </div>

    <div className="mdl-card mdl-shadow--4dp" style={style.motivation}>
      <div className="mdl-card__title" style={style.motivation.title}>
        <h2 className="mdl-card__title-text">Motivation</h2>
      </div>
      <div className="mdl-card__supporting-text">
        Bharath as 'The land of knowledge' has known for centuries but in last few centuries we
        have gone through lot of suffering and changes which has pulled us backward. We
        are committed to return that glories
      </div>
    </div>

    <div className="mdl-card mdl-shadow--4dp" style={style.productAndServices}>
      <div className="mdl-card__title" style={style.productAndServices.title}>
        <h2 className="mdl-card__title-text">Products And Services</h2>
      </div>
      <div className="mdl-card__supporting-text">
        As there are so many product and services related to education. Our efforts
        are to provide world-class education at your door-step.
      </div>
    </div>

    <div className="mdl-card mdl-shadow--4dp" style={style.sponsors}>
      <div className="mdl-card__title" style={style.sponsors.title}>
        <h2 className="mdl-card__title-text">Sponsors</h2>
      </div>
      <div className="mdl-card__supporting-text">
        We are very thankful for all your support.
      </div>
    </div>

    <div className="mdl-card mdl-shadow--4dp" style={style.team}>
      <div className="mdl-card__title" style={style.team.title}>
        <h2 className="mdl-card__title-text">Team</h2>
      </div>
      <div className="mdl-card__supporting-text" />
    </div>

    <div className="mdl-card mdl-shadow--4dp" style={style.customerReviews}>
      <div className="mdl-card__title" style={style.customerReviews.title}>
        <h2 className="mdl-card__title-text">Customer Reviews</h2>
      </div>
      <div className="mdl-card__supporting-text" />
    </div>

  </div>
);
