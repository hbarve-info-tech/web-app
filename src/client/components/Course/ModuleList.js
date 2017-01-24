
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';

import Module from './Module';

const IsClient = typeof document === 'object';

if (IsClient) {
  require('medium-draft/lib/index.css');
  require('./ModuleList.scss');
}

const ModuleList = ({ modules }) => (
  <div className="course-module-list">
    {modules.map((module, index) => <Module key={module.moduleId} {...module} index={index + 1} />)}
  </div>
);

ModuleList.propTypes = {
  modules: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default ModuleList;
