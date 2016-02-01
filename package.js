Package.describe({
  name: 'barbatus:angular2',
  version: '0.8.3',
  summary: 'Angular2 Npm packaged for Meteor',
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
    'barbatus:ts-compilers@0.2.7'
  ]
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.1');

  api.use([
    'isobuild:compiler-plugin@1.0.0'
  ], 'server');

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
    'dist/angular2_deps.js',
    'node_modules/zone.js/dist/zone.js',
    'node_modules/angular2/bundles/angular2.js',
    'node_modules/angular2/bundles/http.js',
    'node_modules/angular2/bundles/router.js',
    'node_modules/rxjs/bundles/Rx.js'
  ], 'client');

  api.addFiles([
    'system_config.js'
  ]);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('barbatus:angular2');
});
