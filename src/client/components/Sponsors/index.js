
import React from 'react';

import style from './style';

const Sponsors = () => {
  return (
    <div style={style}>
      <div className="mdl-card mdl-shadow--4dp" style={style.introduction}>
        <div className="mdl-card__media">
          <img
            src="https://storage.googleapis.com/mayash/website/mayash-title-2.png"
            alt=""
            style={{
              width: '100%',
              minHeight: '250px',
            }}
          />
        </div>
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text" style={style.introduction.title.heading}>
            Sponsors
          </h2>
        </div>
        <div className="mdl-card__supporting-text">
          To-Do.
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
