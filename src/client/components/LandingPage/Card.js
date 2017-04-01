
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';

import style from './style';

const Card = ({ title, description, url, imageUrl }) => (
  <div className="mdl-card mdl-shadow--4dp" style={style.card}>
    <div className="mdl-card__media" style={style.card.media}>
      <img
        src={imageUrl}
        alt={title}
        style={style.card.media.image}
      />
    </div>
    <div className="mdl-card__title" style={style.card.title}>
      <h2 className="mdl-card__title-text" style={style.card.title.heading}>
        {title}
      </h2>
    </div>
    <div className="mdl-card__supporting-text" style={style.card.description}>
      {description}
    </div>
    <div className="mdl-card__actions mdl-card--border">
      <a
        href={url}
        className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
      >
        Learn More
      </a>
    </div>
  </div>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default Card;
