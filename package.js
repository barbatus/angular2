Package.describe({
  name: 'barbatus:angular2',
  version: '0.6.6',
  summary: 'Angular2 Npm package for Meteor',
  git: 'https://github.com/barbatus/angular2',
  documentation: 'README.md'
});

Package.registerBuildPlugin({
  name: 'Compilers',
  sources: [
    'plugin/registrator.js'
  ],
  use: [
    'ecmascript@0.1.4',
    'barbatus:ng2-compilers@0.1.0',
    'barbatus:ts-compilers@0.1.8'
  ]
});

var client = 'client';
var server = 'server';
var both = ['client', 'server'];

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.1');

  api.use([
    'isobuild:compiler-plugin@1.0.0'
  ], server);

  api.use([
    'underscore@1.0.4',
    'systemjs:systemjs@0.18.4',
    'promise@0.4.8'
  ]);

  api.imply([
    'babel-runtime',
    'systemjs:systemjs',
    'promise'
  ]);

  api.addFiles([
    'system_config.js'
  ]);

  api.addFiles([
    'typings/angular2/angular2.d.ts',
    'typings/angular2/router.d.ts',
    'typings/meteor/meteor.d.ts',
    'typings/angular2.d.ts'
  ], server);

  api.addFiles([
    'dist/angular2.js'
  ], client);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('barbatus:angular2');
});
