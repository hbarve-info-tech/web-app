
import React from 'react';

import style from './style';

const EmptyPost = () => {
  return (
    <div
      className="mdl-card mdl-shadow--4dp"
      style={style.postEmpty}
    >
      <div className="mdl-card__title">
        <h2 className="mdl-card__title-text">There is no posts.</h2>
      </div>
    </div>
  );
};

export default EmptyPost;
