'use strict';

Plugin.registerCompiler({
  extensions: ['ts'],
  filenames: ['tsconfig.json']
}, () => new TypeScriptCompiler({
      // We define own helpers.
      noEmitHelpers: true
    }));

Plugin.registerCompiler({
  extensions: ['html'],
  archMatching: 'web'
}, () => new HtmlCompiler());
