
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';

import ModuleCreate from './ModuleCreate';
import Module from './Module';

import style from './style';

const Modules = ({ user, course, createModule, updateModule }) => (
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

Modules.propTypes = {
  user: PropTypes.object,
  course: PropTypes.object,
  // createModule: PropTypes.func.isRequired,
  // updateModule: PropTypes.func.isRequired,
};

export default Modules;
