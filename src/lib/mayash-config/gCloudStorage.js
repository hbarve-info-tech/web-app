
import { storage } from 'google-cloud';
import { gcloud } from './index';

export const BUCKET_NAME = 'mayash';
const { projectId } = gcloud;

export default storage({ projectId });
