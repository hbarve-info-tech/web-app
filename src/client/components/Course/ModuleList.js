
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';

import Module from './Module';

import style from './style';

const ModuleList = ({ modules }) => (
  <div style={style.moduleList}>
    {modules.map((module, index) => <Module key={module.moduleId} {...module} index={index + 1} />)}
  </div>
);

ModuleList.propTypes = {
  modules: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default ModuleList;
