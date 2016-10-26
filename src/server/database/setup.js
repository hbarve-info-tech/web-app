'use strict';
export const ELEMENTS = 'elements';
export const ARTICLES = 'articles';
export const COURSES  = 'courses';
export const MODULES  = 'modules';

import { datastore } from "google-cloud";
import { gcloud }    from "../config";
const { projectId } = gcloud;

export default datastore({projectId});
