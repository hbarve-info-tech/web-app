
import React from 'react';

import style from './style';

const AboutUs = () => {
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
            About Us
          </h2>
        </div>
        <div className="mdl-card__supporting-text">
          <p>
            <strong>IITs</strong> are considered as most reputed educational institute in
            <strong>India</strong> and all around the globe. Mayash is a platform for
            bringing all the knowledgeable brain in one platform where people can share what
            they have learned and learn what ever they want to learn.
          </p>
          <p><strong>Mayash</strong> is a team of experts developing and providing
            world class learning resources at your door step free of cost.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
