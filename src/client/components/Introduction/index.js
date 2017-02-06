
import React from 'react';

import style from './style';

const Introduction = () => (
  <div style={style}>
    <div className="mdl-card mdl-shadow--4dp" style={style.introduction}>
      <div className="mdl-card__media">
        <img
          src="https://storage.googleapis.com/mayash/website/mayash-title-2.png"
          alt=""
          style={{ width: '100%', minHeight: '100px' }}
        />
      </div>
      <div className="mdl-card__title">
        <h2 className="mdl-card__title-text" style={style.introduction.title.heading}>
          Introduction
        </h2>
      </div>
      <div className="mdl-card__supporting-text">
        <p>
          <strong>Mayash</strong> is the platform which caters to the educational
          system. It emphasis on improving the education system of the society.
          The founder has formed this group to make this world/country/society a
          better place to live. It is a leading service provider of various
          educational courses.
        </p>
        <p>
          The purpose of making this is to develop the education system within
          the country, making people aware about the situation going in and around
          the world motivating them to light for the justice and providing them the
          knowledge as well as various information easily in a systematic manner.
        </p>
        <p>
          The various sectors which we are covering includes the following:
        </p>
        <ol>
          <li>Education transformation.</li>
          <li>Governance.</li>
          <li>Media</li>
          <li>Organising Internet.</li>
        </ol>
      </div>
    </div>
  </div>
);

export default Introduction;
