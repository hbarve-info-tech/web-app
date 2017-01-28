
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';

import Module from './Module';

import style from './style';

const ModuleList = ({ user, course, updateModule }) => (
  <div style={style.moduleList}>
    {course.modules.map((module, index) => (
      <Module
        key={module.moduleId}
        {...module}
        index={index + 1}
        user={user}
        course={course}
        updateModule={updateModule}
      />
    ))}
  </div>
);

ModuleList.propTypes = {
  user: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  updateModule: PropTypes.func.isRequired,
};

export default ModuleList;
