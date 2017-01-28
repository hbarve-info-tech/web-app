
import React from 'react';

import style from './style';

export default () => (
  <div style={style.landingPage}>

    <div className="mdl-card mdl-shadow--4dp" style={style.card}>
      <div className="mdl-card__media" style={style.card.media}>
        <img
          src="https://storage.googleapis.com/mayash/website/mayash-title-2.png"
          alt=""
          style={style.card.media.image}
        />
      </div>
      <div className="mdl-card__title" style={style.card.title}>
        <h2 className="mdl-card__title-text" style={style.card.title.heading}>
          Introduction
        </h2>
      </div>
      <div className="mdl-card__supporting-text" style={style.card.description}>
        <strong>Mayash</strong> is a team of IITians committed to solve the challenges of the
        society. As there are so many challenges are out there, quality in education is one
        of the core problem.
      </div>
    </div>

    <div className="mdl-card mdl-shadow--4dp" style={style.card}>
      <div className="mdl-card__media" style={style.card.media}>
        <img
          src="https://storage.googleapis.com/mayash/website/Mayash%20Motivation%20(1).jpg"
          alt=""
          style={style.card.media.image}
        />
      </div>
      <div className="mdl-card__title" style={style.card.title}>
        <h2 className="mdl-card__title-text">Motivation</h2>
      </div>
      <div className="mdl-card__supporting-text" style={style.card.description}>
        Bharath as 'The land of knowledge' has known for centuries but in last few centuries we
        have gone through lot of suffering and changes which has pulled us backward. We
        are committed to return that glories
      </div>
    </div>

    <div className="mdl-card mdl-shadow--4dp" style={style.card}>
      <div className="mdl-card__media" style={style.card.media}>
        <img
          src="https://storage.googleapis.com/mayash/website/Mayash-product-and-services.jpg"
          alt=""
          style={style.card.media.image}
        />
      </div>
      <div className="mdl-card__title" style={style.card.title}>
        <h2 className="mdl-card__title-text">Products And Services</h2>
      </div>
      <div className="mdl-card__supporting-text" style={style.card.description}>
        As there are so many product and services related to education. Our efforts
        are to provide world-class education at your door-step.
      </div>
    </div>

    <div className="mdl-card mdl-shadow--4dp" style={style.card}>
      <div className="mdl-card__media" style={style.card.media}>
        <img
          src="https://storage.googleapis.com/mayash/website/mayash-sponsors.jpg"
          alt=""
          style={style.card.media.image}
        />
      </div>
      <div className="mdl-card__title" style={style.card.title}>
        <h2 className="mdl-card__title-text">Sponsors</h2>
      </div>
      <div className="mdl-card__supporting-text" style={style.card.description}>
        We are very thankful for all your support.
      </div>
    </div>

    <div className="mdl-card mdl-shadow--4dp" style={style.card}>
      <div className="mdl-card__media" style={style.card.media}>
        <img
          src="https://storage.googleapis.com/mayash/website/mayash-team.jpg"
          alt=""
          style={style.card.media.image}
        />
      </div>
      <div className="mdl-card__title" style={style.card.title}>
        <h2 className="mdl-card__title-text">Team</h2>
      </div>
      <div className="mdl-card__supporting-text" style={style.card.description}>
        Team.
      </div>
    </div>

    <div className="mdl-card mdl-shadow--4dp" style={style.card}>
      <div className="mdl-card__media" style={style.card.media}>
        <img
          src="https://storage.googleapis.com/mayash/website/mayash-customer-reviews.jpg"
          alt=""
          style={style.card.media.image}
        />
      </div>
      <div className="mdl-card__title" style={style.card.title}>
        <h2 className="mdl-card__title-text">Customer Reviews</h2>
      </div>
      <div className="mdl-card__supporting-text" style={style.card.description}>
        Team.
      </div>
    </div>

  </div>
);
