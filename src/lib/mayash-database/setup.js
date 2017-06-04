
import { datastore } from 'google-cloud';
import { gcloud } from '../mayash-api-common';

const { NODE_ENV } = process.env;

const { projectId } = gcloud;

const options = {
  projectId,
};

if (NODE_ENV === 'development') {
  options.apiEndpoint = 'http://localhost:8081';
}

/**
 * These are database tables name in google's datastore.
 */
export const ELEMENTS = 'elements';
export const POSTS = 'posts';
export const COURSES = 'courses';
export const MODULES = 'modules';
export const CIRCLE_MEMBERS = 'circleMembers';
export const CIRCLE_COURSES = 'circleCourses';
export const PHOTOS = 'photos';


export default datastore(options);
