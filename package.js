Package.describe({
  name: 'barbatus:angular2',
  version: '0.6.4_1',
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
    'barbatus:ts-compilers@0.1.7',
    'ecmascript@0.1.4'
  ]
});

var client = 'client';
var server = 'server';
var both = ['client', 'server'];

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.1');

  api.use([
    'isobuild:linter-plugin@1.0.0',
    'isobuild:compiler-plugin@1.0.0',
    'promise@0.4.8'
  ], server);

  api.use([
    'underscore@1.0.4',   
    'systemjs:systemjs@0.18.4'
  ], both);

  api.imply([
    'babel-runtime@0.1.3',
    'systemjs:systemjs@0.18.4'
  ]);
  api.imply('promise@0.4.8', server);

  api.addFiles([
    'system_config.js'
  ], both);

  api.addFiles([
    'typings/angular2/angular2.d.ts',
    'typings/angular2/router.d.ts',
    'typings/meteor/meteor.d.ts',
    'typings/angular2.d.ts'
  ], server);

  api.addFiles([
    'default_layout.html',
    'dist/angular2.js'
  ], client);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('barbatus:angular2');
});
