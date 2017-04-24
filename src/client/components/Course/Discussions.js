
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';

import style from './style';

export const Discussions = ({ user, course }) => (
  <div style={style.moduleList}>

  </div>
);

Discussions.propTypes = {
  user: PropTypes.object,
  course: PropTypes.object,
};

export default Discussions;
