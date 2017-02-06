
import React from 'react';

import style from './style';

const Introduction = () => (
  <div style={style}>
    <div className="mdl-card mdl-shadow--4dp" style={style.introduction}>
      <div className="mdl-card__media">
        <img
          src="https://storage.googleapis.com/mayash/website/mayash-motivation.jpg"
          alt=""
          style={{ width: '100%', minHeight: '100px' }}
        />
      </div>
      <div className="mdl-card__title">
        <h2 className="mdl-card__title-text" style={style.introduction.title.heading}>
          Motivation
        </h2>
      </div>
      <div className="mdl-card__supporting-text">
        To-Do
      </div>
    </div>
  </div>
);

export default Introduction;
