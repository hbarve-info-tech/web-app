
import React from 'react';

import style from './style';

const LoadingPost = () => {
  return (
    <div
      className="mdl-card mdl-shadow--4dp"
      style={style.postEmpty}
    >
      <div className="mdl-card__title">
        <h2 className="mdl-card__title-text">
          <div className="mdl-spinner mdl-js-spinner is-active" />
        </h2>
      </div>
    </div>
  );
};

export default LoadingPost;
