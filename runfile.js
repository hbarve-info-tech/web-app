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
  'build:webpack': () => {
    run('cross-env NODE_ENV="production" webpack --config=webpack/production.js');
  },
  'build:client': () => {
    run('cross-env babel src/client -d dist/client');
  },
  'build:server': () => {
    run('cross-env babel src/server -d dist/server');
  },
  build: () => {
    task['build:clean']();
    task['build:server']();
    task['build:client']();
  },
  'dev:redux': () => {
    run('cross-env babel-node redux/index.js');
  },
  'dev:client': () => {
    run('cross-env NODE_ENV="development" babel-node webpack/devServer.js');
  },
  'dev:server': () => {
    run('cross-env NODE_ENV="development" TOKEN_KEY="test-token" nodemon src/server/index.js --exec babel-node');
  },
  dev: () => {
    run('cross-env NODE_ENV="development" TOKEN_KEY="test-token" babel-node src/server/index.js');
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
    task.test();
    task.build();
    run('gcloud app deploy app.yaml');
  },
  start: () => {
    run('cross-env NODE_ENV="production" node dist/server/index.js');
  },
};

export default task;
