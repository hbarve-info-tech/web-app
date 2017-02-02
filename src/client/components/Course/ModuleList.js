
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';

import ModuleCreate from './ModuleCreate';
import Module from './Module';

import style from './style';

const ModuleList = ({ user, course, createModule, updateModule }) => (
  <div style={style.moduleList}>
    {user.isSignedIn === true && user.id === course.authorId ? (
      <ModuleCreate
        user={user}
        course={course}
        createModule={createModule}
      />
    ) : null}
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
  createModule: PropTypes.func.isRequired,
  updateModule: PropTypes.func.isRequired,
};

export default ModuleList;
