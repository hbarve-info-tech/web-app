/**
 * Created by himank on 6/8/16.
 */
"use strict";
import _ from "lodash";
import {
  COURSE_CREATE, COURSE_CREATE_START, COURSE_CREATE_ERROR, COURSE_CREATE_SUCCESS,
  COURSES_FETCH, COURSES_FETCH_START, COURSES_FETCH_ERROR, COURSES_FETCH_SUCCESS,
  COURSE_FETCH,  COURSE_FETCH_START,  COURSE_FETCH_ERROR,  COURSE_FETCH_SUCCESS,
  COURSE_UPDATE, COURSE_UPDATE_START, COURSE_UPDATE_ERROR, COURSE_UPDATE_SUCCESS,
  COURSE_DELETE, COURSE_DELETE_START, COURSE_DELETE_ERROR, COURSE_DELETE_SUCCESS,

  MODULE_CREATE, MODULE_CREATE_START, MODULE_CREATE_ERROR, MODULE_CREATE_SUCCESS,
  MODULES_FETCH, MODULES_FETCH_START, MODULES_FETCH_ERROR, MODULES_FETCH_SUCCESS,
  MODULE_FETCH,  MODULE_FETCH_START,  MODULE_FETCH_ERROR,  MODULE_FETCH_SUCCESS,
  MODULE_UPDATE, MODULE_UPDATE_START, MODULE_UPDATE_ERROR, MODULE_UPDATE_SUCCESS,
  MODULE_DELETE, MODULE_DELETE_START, MODULE_DELETE_ERROR, MODULE_DELETE_SUCCESS
} from '../actions/courses';

let initialModuleState  = {
  courseId  : '',
  moduleId  : '',
  moduleName: '',
  moduleData: '',

  isCreating  : false,
  isUpdating  : false,
  isFetching  : false,
  isDeleting  : false,

  isCreated   : false,
  isUpdated   : false,
  isFetched   : false,
  isDeleted   : false,

  statusCode  : 200,
  isError     : false,
  error       : '',
  message     : '',
  lastUpdated : Date.now()
};
let initialCourseState  = {
  courseId    : '',
  courseName  : '',
  description : '',
  level       : 1,
  standard    : 'graduation',
  modules     : [],

  isCreating  : false,
  isUpdating  : false,
  isFetching  : false,
  isDeleting  : false,

  isCreated   : false,
  isUpdated   : false,
  isFetched   : false,
  isDeleted   : false,

  statusCode  : 200,
  isError     : false,
  error       : '',
  message     : '',
  lastUpdated : Date.now()
};
let initialCoursesState = {
  array       : [],

  isCreating  : false,
  isUpdating  : false,
  isFetching  : false,
  isDeleting  : false,

  isCreated   : false,
  isUpdated   : false,
  isFetched   : false,
  isDeleted   : false,

  statusCode  : 200,
  isError     : false,
  error       : '',
  message     : '',

  lastUpdated : Date.now()
};

const moduleReducer = (state = initialModuleState, action) => {
  switch (action.type) {
    case MODULE_CREATE : {

      return Object.assign(
        {},
        state,
        action.payload,
        {
          isCreating  : false,
          isUpdating  : false,
          isFetching  : false,
          isDeleting  : false,

          isCreated   : false,
          isUpdated   : false,
          isFetched   : false,
          isDeleted   : false,

          isError     : false,
          error       : '',
          message     : '',
          lastUpdated : Date.now()
        }
      );
    }
    case MODULE_FETCH  : {

      return Object.assign(
        {},
        state,
        action.payload,
        {
          isCreating  : false,
          isUpdating  : false,
          isFetching  : false,
          isDeleting  : false,

          isCreated   : false,
          isUpdated   : false,
          isFetched   : false,
          isDeleted   : false,

          isError     : false,
          error       : '',
          message     : '',
          lastUpdated : Date.now()
        }
      );
    }
    case MODULE_UPDATE : {

      return Object.assign(
        {},
        state,
        action.payload,
        {
          isCreating  : false,
          isUpdating  : false,
          isFetching  : false,
          isDeleting  : false,

          isCreated   : false,
          isUpdated   : false,
          isFetched   : false,
          isDeleted   : false,

          isError     : false,
          error       : '',
          message     : '',
          lastUpdated : Date.now()
        }
      );
    }
    case MODULE_DELETE : {

      return state;
    }
  }
};

const courseReducer = (state = initialCourseState, action) => {
  switch (action.type) {
    case COURSE_CREATE : {

      return Object.assign(
        {},
        state,
        action.payload,
        {
          isFetching  : false,
          isFetched   : true,
          isError     : false,
          error       : '',
          message     : '',
          lastUpdated : Date.now()
        }
      );
    }
    case COURSE_FETCH_START : {

      return Object.assign(
        {},
        state,
        action.payload,
        {
          isFetching  : true,
          isFetched   : false,
          isError     : false,

          error       : '',
          message     : '',

          lastUpdated : Date.now()
        }
      );
    }
    case COURSE_FETCH_ERROR : {

      return Object.assign(
        {},
        state,
        {
          isFetching  : false,
          isFetched   : false,

          isError     : true,
          error       : action.error,
          message     : action.message,
          lastUpdated : Date.now()
        }
      );
    }
    case COURSE_FETCH_SUCCESS : {

      return Object.assign(
        {},
        state,
        action.payload,
        {
          isFetching  : false,
          isFetched   : true,
          isError     : false,

          error       : '',
          message     : '',

          lastUpdated : Date.now()
        }
      );
    }
    case COURSE_FETCH  : {

      return Object.assign(
        {},
        state,
        action.payload,
        {
          isFetching  : true,
          isFetched   : false,
          isError     : false,
          error       : '',
          message     : '',
          lastUpdated : Date.now()
        }
      );
    }
    case COURSE_UPDATE : {

      return Object.assign(
        {},
        state,
        action.payload,
        {
          isCreating  : false,
          isUpdating  : false,
          isFetching  : false,
          isDeleting  : false,

          isCreated   : false,
          isUpdated   : true,
          isFetched   : false,
          isDeleted   : false,

          isError     : false,
          error       : '',
          message     : '',
          lastUpdated : Date.now()
        }
      );
    }
    case COURSE_DELETE : {

      return state;
    }
  }
};

const coursesReducer = (state = initialCoursesState, action) => {
  switch (action.type) {
    case COURSE_CREATE_START: {

      return Object.assign(
        {},
        state,
        {
          isCreatingCourse: true,
          isFetching  : true,
          error       : '',
          message     : '',
          lastUpdated : Date.now()
        }
      );
    }
    case COURSE_CREATE_ERROR: {

      return Object.assign(
        {},
        state,
        {
          isCreatingCourse: false,
          isFetching  : false,
          isFetched   : true,
          error       : action.payload.error,
          message     : action.payload.message,
          lastUpdated : Date.now()
        }
      );
    }
    case COURSE_CREATE_SUCCESS: {
      let newCourse = courseReducer(undefined, {
        type   : COURSE_CREATE,
        payload: action.payload
      });

      let array = state.array;
      array.push(newCourse);

      for(let i = 0; i < array.length; i++) {
        for(let j = i + 1; j < array.length; j++) {
          if(array[i].courseId === array[j].courseId) {
            array[i] = Object.assign(
              {},
              array[i],
              array[j]
            );
            array.splice(j, 1);
          }
        }
      }

      return Object.assign(
        {},
        state,
        {
          array     : array,
          isFetching: false,
          isFetched : true,
          isError   : false,
          error     : ''
        }
      );
    }

    case COURSES_FETCH_START: {
      return Object.assign(
        {},
        state,
        {
          isFetching: true,
          isFetched : false,
          isError   : false,
          error     : '',
          lastUpdated : Date.now()
        }
      );
    }
    case COURSES_FETCH_ERROR: {
      return Object.assign(
        {},
        state,
        {
          isFetching: false,
          isFetched : true,
          isError   : true,
          error     : action.payload.error,
          message   : action.payload.message,
          lastUpdated : Date.now()
        }
      );
    }
    case COURSES_FETCH_SUCCESS: {
      let array = state.array;

      if(array.length === 0) {
        action.payload.map((fetchedCourse, index1) => {
          array.push(courseReducer(undefined, {
            type   : COURSE_CREATE,
            payload: fetchedCourse
          }));
        });
      }
      else {
        array = array.concat(action.payload);
      }

      for(let i = 0; i < array.length; i++) {
        for(let j = i + 1; j < array.length; j++) {
          if(array[i].courseId === array[j].courseId) {
            array[i] = Object.assign(
              {},
              array[i],
              array[j]
            );
            array.splice(j, 1);
          }
        }
      }

      return Object.assign(
        {},
        state,
        {
          array     : array,
          isFetching: false,
          isFetched : true,
          isError   : false,
          error     : '',
          message   : '',
          lastUpdated : Date.now()
        }
      );
    }

    case COURSE_FETCH_START: {
      let newCourse = courseReducer(undefined, {
        type   : COURSE_FETCH,
        payload: action.payload
      });

      let array = state.array;
      array.push(newCourse);

      return Object.assign(
        {},
        state,
        {
          array       : array,
          lastUpdated : Date.now()
        }
      );
    }
    case COURSE_FETCH_ERROR: {
      let course = courseReducer(undefined, {
        type   : COURSE_UPDATE,
        payload: action.payload
      });

      let array = state.array;
      array.push(course);

      return Object.assign(
        {},
        state,
        {
          array     : array,
          isFetching: true,
          isFetched : false,
          isError   : false,
          error     : ''
        }
      );
    }
    case COURSE_FETCH_SUCCESS: {

      let array = state.array;
      array.map((course, index) => {
        if(course.courseId == action.payload.courseId) {
          array[index] = courseReducer(course, {
            type   : COURSE_FETCH_SUCCESS,
            payload: action.payload
          });
        }
      });

      for(let i = 0; i < array.length; i++) {
        for(let j = i + 1; j < array.length; j++) {
          if(array[i].courseId === array[j].courseId) {
            array[i] = Object.assign(
              {},
              array[i],
              array[j]
            );
            array.splice(j, 1);
          }
        }
      }

      return Object.assign(
        {},
        state,
        {
          array       : array,
          lastUpdated : Date.now()
        }
      );
    }

    case COURSE_UPDATE_START: {
      return Object.assign(
        {},
        state,
        {
          array: state.array.map((course, index) => {
            if(course.courseId === action.payload.courseId) {
              return Object.assign(
                {},
                course,
                {
                  isUpdating: true,
                  lastUpdated : Date.now()
                }
              )
            }
            else {
              return course;
            }
          })
        }
      );
    }
    case COURSE_UPDATE_ERROR: {

      return state;
    }
    case COURSE_UPDATE_SUCCESS: {

      return Object.assign(
        {},
        state,
        {
          array: state.array.map((course, index) => {
            if(course.courseId === action.payload.courseId) {

              return courseReducer(course, {
                type   : COURSE_UPDATE,
                payload: action.payload
              });
            }
            else {
              return course;
            }
          })
        },
        {
          isCreating  : false,
          isUpdating  : false,
          isFetching  : false,
          isDeleting  : false,

          isCreated   : false,
          isUpdated   : false,
          isFetched   : false,
          isDeleted   : false,

          isError     : false,
          error       : '',
          message     : '',

          lastUpdated : Date.now()
        }
      );
    }

    case COURSE_DELETE_START: {

      return state;
    }
    case COURSE_DELETE_ERROR: {

      return state;
    }
    case COURSE_DELETE_SUCCESS: {

      return state;
    }


    case MODULE_CREATE_START  : {

      return Object.assign(
        {},
        state,
        {
          array: state.array.map((course, index) => {
            if(course.courseId === action.payload.courseId) {
              return Object.assign(
                {},
                course,
                {
                  isCreating  : true,
                  isUpdating  : false,
                  isFetching  : false,
                  isDeleting  : false,

                  isCreated   : false,
                  isUpdated   : false,
                  isFetched   : false,
                  isDeleted   : false,

                  isError     : false,
                  error       : '',
                  message     : '',
                  lastUpdated : Date.now()
                }
              )
            }
            else {
              return course;
            }
          })
        }
      );
    }
    case MODULE_CREATE_ERROR  : {

      return Object.assign(
        {},
        state,
        {
          array: state.array.map((course, index) => {
            if(course.courseId === action.payload.courseId) {
              return Object.assign(
                {},
                course,
                {
                  isCreating  : false,
                  isUpdating  : false,
                  isFetching  : false,
                  isDeleting  : false,

                  isCreated   : false,
                  isUpdated   : false,
                  isFetched   : false,
                  isDeleted   : false,

                  isError     : true,
                  error       : action.error,
                  message     : action.message,
                  lastUpdated : Date.now()
                }
              )
            }
            else {
              return course;
            }
          })
        }
      );
    }
    case MODULE_CREATE_SUCCESS: {

      return Object.assign(
        {},
        state,
        {
          array: state.array.map((course, index) => {
            if(course.courseId === action.payload.courseId) {
              let modules = course.modules;

              modules.push(moduleReducer(undefined, {
                type   : MODULE_CREATE,
                payload: action.payload
              }));

              return Object.assign(
                {},
                course,
                {
                  modules: modules
                },
                {
                  isCreating  : false,
                  isUpdating  : false,
                  isFetching  : false,
                  isDeleting  : false,

                  isCreated   : true,
                  isUpdated   : false,
                  isFetched   : false,
                  isDeleted   : false,

                  isError     : false,
                  error       : '',
                  message     : '',
                  lastUpdated : Date.now()
                }
              )
            }
            else {
              return course;
            }
          })
        }
      );
    }

    case MODULES_FETCH_START : {

      return Object.assign(
        {},
        state,
        {
          array: state.array.map((course, index) => {
            if(course.courseId === action.payload.courseId)   {

              return Object.assign(
                {},
                course,
                {
                  isCreating  : false,
                  isUpdating  : false,
                  isFetching  : true,
                  isDeleting  : false,

                  isCreated   : false,
                  isUpdated   : false,
                  isFetched   : false,
                  isDeleted   : false,

                  isError     : false,
                  error       : '',
                  message     : '',
                  lastUpdated : Date.now()
                }
              )
            }
            else {
              return course;
            }
          })
        }
      );
    }
    case MODULES_FETCH_ERROR : {
      return Object.assign(
        {},
        state,
        {
          array: state.array.map((course, index) => {
            if(course.courseId === action.payload.courseId)   {

              return Object.assign(
                {},
                course,
                {
                  isCreating  : false,
                  isUpdating  : false,
                  isFetching  : false,
                  isDeleting  : false,

                  isCreated   : false,
                  isUpdated   : false,
                  isFetched   : false,
                  isDeleted   : false,

                  isError     : true,
                  error       : action.error,
                  message     : action.message,
                  lastUpdated : Date.now()
                }
              );
            }
            else {
              return course;
            }
          })
        }
      );
    }
    case MODULES_FETCH_SUCCESS : {
      let course = _.find(state.array, (e) => e.courseId == action.payload.courseId);

      course.modules = action.payload.modules;


      return Object.assign(
        {},
        state,
        {array: state.array.map((e, index) => {
            if(e.courseId == action.payload.courseId)   {
              return course;
            }
            else {
              return e;
            }
          })}
      );
    }

    case MODULE_FETCH_START : {

      return Object.assign(
        {},
        state,
        {
          array: state.array.map((course, index) => {
            if(course.courseId === action.payload.courseId)   {

              return Object.assign(
                {},
                course,
                {
                  isCreating  : false,
                  isUpdating  : false,
                  isFetching  : true,
                  isDeleting  : false,

                  isCreated   : true,
                  isUpdated   : false,
                  isFetched   : false,
                  isDeleted   : false,

                  isError     : false,
                  error       : '',
                  message     : '',
                  lastUpdated : Date.now()
                }
              )
            }
            else {
              return course;
            }
          })
        }
      );
    }
    case MODULE_FETCH_ERROR : {
      return Object.assign(
        {},
        state,
        {
          array: state.array.map((course, index) => {
            if(course.courseId === action.payload.courseId)   {

              return Object.assign(
                {},
                course,
                {
                  isCreating  : false,
                  isUpdating  : false,
                  isFetching  : false,
                  isDeleting  : false,

                  isCreated   : false,
                  isUpdated   : false,
                  isFetched   : false,
                  isDeleted   : false,

                  isError     : true,
                  error       : action.error,
                  message     : action.message,
                  lastUpdated : Date.now()
                }
              );
            }
            else {
              return course;
            }
          })
        }
      );
    }
    case MODULE_FETCH_SUCCESS : {
      return Object.assign(
        {},
        state,
        {
          array: state.array.map((course, index) => {
            if(course.courseId === action.payload.courseId)   {
              let modules = course.modules;

              if(modules.length === 0) {
                action.payload.map((fetchedModule, index1) => {
                  modules.push(moduleReducer(undefined, {
                    type   : MODULE_FETCH,
                    payload: fetchedModule
                  }));
                });
              }
              else {
                modules = modules.concat(action.payload);

                for(let i = 0; i < modules.length; i++) {
                  for(let j = i + 1; j < modules.length; j++) {
                    if(modules[i].courseId === modules[j].courseId) {
                      modules.splice(j, 1);
                    }
                  }
                }
              }

              return Object.assign(
                {},
                course,
                {
                  modules: modules
                },
                {
                  isCreating  : false,
                  isUpdating  : false,
                  isFetching  : true,
                  isDeleting  : false,

                  isCreated   : false,
                  isUpdated   : false,
                  isFetched   : true,
                  isDeleted   : false,

                  isError     : false,
                  error       : '',
                  message     : '',
                  lastUpdated : Date.now()
                }
              )
            }
            else {
              return course;
            }
          })
        }
      );
    }

    case MODULE_UPDATE_START : {

      return Object.assign(
        {},
        state,
        {
          array: state.array.map((course, index) => {
            if(course.courseId === action.payload.courseId)   {
              return Object.assign(
                {},
                course,
                {
                  modules: course.modules.map((module, index2) => {
                    if(module.moduleId === action.payload.moduleId) {
                      return Object.assign(
                        {},
                        module,
                        {
                          isCreating  : false,
                          isUpdating  : true,
                          isFetching  : false,
                          isDeleting  : false,

                          isCreated   : false,
                          isUpdated   : false,
                          isFetched   : false,
                          isDeleted   : false,

                          isError     : false,
                          error       : '',
                          message     : '',
                          lastUpdated : Date.now()
                        }
                      );
                    }
                    else {
                      return module;
                    }
                  })
                }
              )
            }
            else {
              return course;
            }
          })
        }
      );
    }
    case MODULE_UPDATE_ERROR : {

      return Object.assign(
        {},
        state,
        {array: state.array.map((course, index) => {
            if(course.courseId === action.payload.courseId)   {
              return Object.assign(
                {},
                course,
                {modules: course.modules.map((module, index2) => {
                    if(module.moduleId === action.payload.moduleId) {
                      return Object.assign(
                        {},
                        module,
                        {
                          isCreating  : false,
                          isUpdating  : false,
                          isFetching  : false,
                          isDeleting  : false,

                          isCreated   : false,
                          isUpdated   : false,
                          isFetched   : false,
                          isDeleted   : false,

                          isError     : true,
                          error       : action.error,
                          message     : action.message,
                          lastUpdated : Date.now()
                        }
                      );
                    }
                    else {
                      return module;
                    }
                  })}
              )
            }
            else {
              return course;
            }
          })}
      );
    }
    case MODULE_UPDATE_SUCCESS : {

      return Object.assign(
        {},
        state,
        {array: state.array.map((course, index) => {
            if(course.courseId === action.payload.courseId)   {
              return Object.assign(
                {},
                course,
                {
                  modules: course.modules.map((module, index2) => {
                    if(module.moduleId === action.payload.moduleId) {
                      return Object.assign(
                        {},
                        module,
                        action.payload,
                        {
                          isCreating  : false,
                          isUpdating  : false,
                          isFetching  : false,
                          isDeleting  : false,

                          isCreated   : false,
                          isUpdated   : true,
                          isFetched   : false,
                          isDeleted   : false,

                          isError     : false,
                          error       : '',
                          message     : '',
                          lastUpdated : Date.now()
                        }
                      );
                    }
                    else {
                      return module;
                    }
                  })
                }
              )
            }
            else {
              return course;
            }
          })}
      );
    }

    case MODULE_DELETE_START : {

      return Object.assign(
        {},
        state,
        {
          array: state.array.map((course, index) => {
            if(course.courseId === action.payload.courseId)   {

              return Object.assign(
                {},
                course,
                {
                  isCreating  : false,
                  isUpdating  : false,
                  isFetching  : true,
                  isDeleting  : false,

                  isCreated   : true,
                  isUpdated   : false,
                  isFetched   : false,
                  isDeleted   : false,

                  isError     : false,
                  error       : '',
                  message     : '',
                  lastUpdated : Date.now()
                }
              )
            }
            else {
              return course;
            }
          })
        }
      );
    }
    case MODULE_DELETE_ERROR : {
      return Object.assign(
        {},
        state,
        {
          array: state.array.map((course, index) => {
            if(course.courseId === action.payload.courseId)   {

              return Object.assign(
                {},
                course,
                {
                  isCreating  : false,
                  isUpdating  : false,
                  isFetching  : false,
                  isDeleting  : false,

                  isCreated   : false,
                  isUpdated   : false,
                  isFetched   : false,
                  isDeleted   : false,

                  isError     : true,
                  error       : action.error,
                  message     : action.message,
                  lastUpdated : Date.now()
                }
              );
            }
            else {
              return course;
            }
          })
        }
      );
    }
    case MODULE_DELETE_SUCCESS : {
      return Object.assign(
        {},
        state,
        {
          array: state.array.map((course, index) => {
            if(course.courseId === action.payload.courseId)   {
              let modules = course.modules;

              if(modules.length === 0) {
                action.payload.map((fetchedModule, index1) => {
                  modules.push(moduleReducer(undefined, {
                    type   : MODULE_FETCH,
                    payload: fetchedModule
                  }));
                });
              }
              else {
                modules = modules.concat(action.payload);

                for(let i = 0; i < modules.length; i++) {
                  for(let j = i + 1; j < modules.length; j++) {
                    if(modules[i].courseId === modules[j].courseId) {
                      modules.splice(j, 1);
                    }
                  }
                }
              }

              return Object.assign(
                {},
                course,
                {
                  modules: modules
                },
                {
                  isCreating  : false,
                  isUpdating  : false,
                  isFetching  : true,
                  isDeleting  : false,

                  isCreated   : false,
                  isUpdated   : false,
                  isFetched   : true,
                  isDeleted   : false,

                  isError     : false,
                  error       : '',
                  message     : '',
                  lastUpdated : Date.now()
                }
              )
            }
            else {
              return course;
            }
          })
        }
      );
    }

    default:
      return state;
  }
};

export default coursesReducer;