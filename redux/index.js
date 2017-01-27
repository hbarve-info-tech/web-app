/* eslint import/no-extraneous-dependencies: "warn" */

import remotedev from 'remotedev-server';

// This server will help Remote-Redux to work.
remotedev({ hostname: 'localhost', port: 5002 });
