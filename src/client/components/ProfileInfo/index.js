
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import { browserHistory } from 'react-router';

import style from './style';

const ProfileInfo = ({
  username,
  name,
  profilePic,
  classroom = false,
}) => (
  <div
    className="mdl-card mdl-shadow--4dp"
    style={style.profileInfo}
  >
    <div className="mdl-card__media">
      <img
        src={profilePic}
        alt=""
        style={style.image}
      />
    </div>
    <div
      className="mdl-card__title mdl-card--expand"
      style={style.title}
    >
      <h2
        className="mdl-card__title-text"
        style={style.titleText}
      >
        {name}
      </h2>
      <h2 className="mdl-card__subtitle-text">
        <a
          href={`/${username}`}
          style={{ color: 'black', textDecoration: 'none' }}
        >
          @{username}
        </a>
      </h2>
    </div>
    { classroom ? (
      <div className="mdl-card__actions mdl-card--border">
        <a
          className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
          href={`/${username}/classroom`}
          onClick={() => browserHistory.push(`/${username}/classroom`)}
        >
          Classroom
        </a>
      </div>
      ) : null }
  </div>
);

ProfileInfo.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profilePic: PropTypes.string.isRequired,
  classroom: PropTypes.bool.isRequired,
};

export default ProfileInfo;
