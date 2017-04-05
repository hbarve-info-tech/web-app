/* eslint import/no-extraneous-dependencies: 0 */
import { run, ask } from 'runjs';

const task = {
  clean: () => {
    run('rm -rf node_modules');
    run('rm -rf dist');
  },
  'build:clean': () => {
    run('rm -rf dist');
    run('mkdir dist');
  },
  build: () => {
    run('cross-env babel src -d dist');
  },
  dev: () => {
    run('NODE_ENV="development" TOKEN_KEY="test-token" nodemon src/server.js --exec babel-node');
  },
  eslint: (path = 'src') => {
    run(`eslint ${path}`);
  },
  'eslint:fix': (path = 'src') => {
    run(`eslint ${path} --fix`);
  },
  test: () => {
    task.eslint();
    run('');
  },
  deploy: () => {
    // task.test();
    task.build();
    run('gcloud app deploy app.yaml');
  },
  start: () => {
    run('node dist/server.js');
  },
};

export default task;
