'use strict';
export const BUCKET_NAME = 'mayash';

import { storage } from "google-cloud";
import { gcloud }  from "../config";
const { projectId } = gcloud;

export default storage({projectId});
