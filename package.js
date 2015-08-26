Package.describe({
  name: 'barbatus:angular2',
  version: '0.2.0',
  summary: 'Angular2 Npm package for Meteor',
  git: 'https://github.com/barbatus/angular2',
  documentation: 'README.md'
});

Package.registerBuildPlugin({
  name: 'ng-templates',
  sources: [
    'plugin/handler.js'
  ]
});

Npm.depends({
  'reflect-metadata': '0.1.0',
  'zone.js': '0.5.0',
  'es6-shim': '0.33.0',
  'angular2': '2.0.0-alpha.35',
  'exposify': '0.4.3',
  'externalify': '0.1.0',
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');

  api.use([
    'cosmos:browserify@0.5.0'
  ], 'client');

  api.use([
    'universe:modules@0.4.1'
  ]);

  api.imply([
    'universe:modules@0.4.1'
  ]);

  api.addFiles([
    'client.browserify.js',
    'main.import.js',
    'angular2.js'
  ], 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('barbatus:angular2');
});
