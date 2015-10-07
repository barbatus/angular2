Package.describe({
  name: 'barbatus:angular2',
  version: '0.5.6_1',
  summary: 'Angular2 Npm package for Meteor',
  git: 'https://github.com/barbatus/angular2',
  documentation: 'README.md'
});

Package.registerBuildPlugin({
  name: 'HTMLBuilder',
  sources: [
    'plugin/utils.js',
    'plugin/mixins/file_mixin.js',
    'plugin/compilers/ng_compiler.js',
    'plugin/compilers/ng_caching_compiler.js',
    'plugin/handlers/html_handler.js'
  ],
  use: [
    'caching-compiler@1.0.0',
    'ecmascript@0.1.4'
  ],
  npmDependencies : {
    'cheerio': '0.19.0'
  }
});

Package.registerBuildPlugin({
  name: 'JSXBuilder',
  sources: [
    'plugin/utils.js',
    'plugin/mixins/file_mixin.js',
    'plugin/compilers/ng_caching_compiler.js',
    'plugin/handlers/jsx_handler.js'
  ],
  use: [
    'babel-compiler@5.8.3_1',
    'caching-compiler@1.0.0',
    'ecmascript@0.1.4'
  ]
});

Package.registerBuildPlugin({
  name: 'TSBuilder',
  sources: [
    'plugin/handlers/ts_handler.js'
  ],
  use: [
    'barbatus:ts-compilers@0.1.1_1',
    'ecmascript@0.1.4'
  ]
});

Npm.depends({
  'reflect-metadata': '0.1.0',
  'zone.js': '0.5.0',
  'es6-shim': '0.33.0',
  'angular2': '2.0.0-alpha.37',
  'exposify': '0.4.3',
  'externalify': '0.1.0'
});

var client = 'client';
var server = 'server';
var both = ['client', 'server'];

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.1');

  api.use([
    'isobuild:compiler-plugin@1.0.0',
    'promise@0.4.8'
  ], server);

  api.use([
    'cosmos:browserify@0.8.0',
    'underscore@1.0.4',   
    'systemjs:systemjs@0.18.4'
  ], both);

  api.imply([
    'babel-runtime@0.1.3',
    'cosmos:browserify@0.8.0',
    'systemjs:systemjs@0.18.4'
  ]);
  api.imply('promise@0.4.8', server);

  api.addFiles([
    'system_config.js'
  ], both);

  // Adds Angular2 and Meteor declaration files.
  api.addFiles([
    'typings/angular2/angular2.d.ts',
    'typings/angular2/router.d.ts',
    'typings/es6-promise/es6-promise.d.ts',
    'typings/rx/rx-lite.d.ts',
    'typings/rx/rx.d.ts',
    'typings/meteor/meteor.d.ts',
    'typings/all.d.ts'
  ], server);

  api.addFiles([
    'default_layout.html',
    'client.browserify.js',
    'main.jsx',
    'angular2.js'
  ], client);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('barbatus:angular2');
});
