Package.describe({
  name: 'barbatus:ts-compilers',
  version: '0.1.1',
  summary: 'TypeScript Compilers for Meteor',
  git: 'https://github.com/barbatus/ts-compilers',
  documentation: null
});

Npm.depends({
  'typescript': '1.6.2'
});

var server = 'server';

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.1');

  api.use([
    'caching-compiler@1.0.0',
    'ecmascript@0.1.4',
    'check@1.0.5',
    'underscore@1.0.4',
    'barbatus:typescript@0.1.0'
  ], server);

  api.addFiles([
    'compilers/utils.js',
    'compilers/basic_compiler.js',
    'compilers/ts_compiler.js',
    'compilers/ts_caching_compiler.js',
  ], server);

  api.export(['TsCompiler', 'TsCachingCompiler'], server);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('barbatus:typescript');
});