
import React from 'react';

import style from './style';

const Introduction = () => {
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
            Introduction
          </h2>
        </div>
        <div className="mdl-card__supporting-text">
          <p>
            <strong>Mayash</strong> is a team of IITians committed to solve the challenges of the
            society. As there are so many challenges are out there, quality education is one
            of the core problem.
          </p>
          <p>Our First services to solve education are as follows:</p>
          <ul>
            <li>Providing it for free or as cheap as possible.</li>
            <li>Courses will be available for all the fields of education.</li>
            <li>Courses will be language independent, this will provide freedom for both teacher
              and student by removing the barrier of language.</li>
            <li>Courses will be available for all age groups.</li>
            <li>Knowledgeable people can contribute here.</li>
            <li>Quality education will be made available to every corner of the country.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
