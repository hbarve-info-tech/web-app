
import { datastore } from 'google-cloud';
import { gcloud } from '../config';

const { NODE_ENV } = process.env;

const { projectId } = gcloud;

export const ELEMENTS = 'elements';
export const POSTS = 'posts';
export const ARTICLES = 'articles';
export const COURSES = 'courses';
export const MODULES = 'modules';
export const CIRCLE_MEMBERS = 'circleMembers';
export const CIRCLE_COURSES = 'circleCourses';
export const IMAGES = 'images';

const options = {
  projectId,
};

if (NODE_ENV === 'development') {
  options.apiEndpoint = 'http://localhost:8081';
}

export default datastore(options);
