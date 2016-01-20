'use strict';

Plugin.registerCompiler({
  extensions: ['ts'],
  filenames: ['tsconfig.json']
}, () => new TsCompiler());

Plugin.registerCompiler({
  extensions: ['jsx'],
}, () => new JsxCompiler());
