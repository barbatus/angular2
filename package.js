Package.describe({
  name: 'barbatus:angular2',
  version: '0.3.0',
  summary: 'Angular2 Npm package for Meteor',
  git: 'https://github.com/barbatus/angular2',
  documentation: null
});

Package.registerBuildPlugin({
  name: 'NgHtmlBuilder',
  sources: ['plugin/ng_html_handler.js']
});

Package.registerBuildPlugin({
  name: 'ES6Builder',
  use: ['babel-compiler@5.8.3_1'],
  sources: ['plugin/jsx_handler.js']
});

Npm.depends({
  'reflect-metadata': '0.1.0',
  'zone.js': '0.5.0',
  'es6-shim': '0.33.0',
  'angular2': '2.0.0-alpha.35',
  'exposify': '0.4.3',
  'externalify': '0.1.0'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');

  api.use([
    'cosmos:browserify@0.5.0',
    'systemjs:systemjs@0.18.4'
  ], 'client');

  api.imply('babel-runtime@0.1.3');
  api.imply('systemjs:systemjs@0.18.4');

  api.addFiles([
    'client.browserify.js',
    'main.jsx',
    'angular2.js'
  ], 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('barbatus:angular2');
});
