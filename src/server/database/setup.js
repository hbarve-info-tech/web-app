'use strict';
import { datastore } from "google-cloud";
import { gcloud } from "../config";
const { projectId } = gcloud;

export default datastore({projectId});
