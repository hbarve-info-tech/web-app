
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import { browserHistory } from 'react-router';

import style from './style';

const Avatar = ({ avatar }) => (
  <div className="mdl-card__media">
    <img
      src={avatar}
      alt={avatar}
      style={style.image}
    />
  </div>
);

const Name = ({ name }) => (
  <h2
    className="mdl-card__title-text"
    style={style.titleText}
  >
    {name}
  </h2>
);

const Username = ({ username }) => (
  <h2 className="mdl-card__subtitle-text">
    <a
      href={`/${username}`}
      style={{ color: 'black', textDecoration: 'none' }}
    >
      @{username}
    </a>
  </h2>
);

const Title = ({ name, username }) => (
  <div
    className="mdl-card__title mdl-card--expand"
    style={style.title}
  >
    <Name name={name} />
    <Username username={username} />
  </div>
);

const Description = ({ description }) => {
  if (typeof description === 'undefined' || description.length === 0) return null;

  return (
    <div className="mdl-card__supporting-text ">
      {description}
    </div>
  );
};
const Follow = ({ followers, following }) => (
  <div className="mdl-card__supporting-text">
    <span className="mdl-badge" data-badge={followers}>Followers</span>
    <span className="mdl-badge" data-badge={following}>Following</span>
  </div>
);

const ProfileInfo = ({
  username,
  name,
  avatar,
  classroom = false,
  description,
  followers = 0,
  following = 0,
}) => (
  <div className="mdl-card mdl-shadow--4dp" style={style.profileInfo}>
    <Avatar avatar={avatar} />
    <Title name={name} username={username} />
    <Description description={description} />
    <Follow followers={followers} following={following} />
  </div>
);

ProfileInfo.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  description: PropTypes.string,
  followers: PropTypes.number,
  following: PropTypes.number,
};

export default ProfileInfo;
