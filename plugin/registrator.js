'use strict';

Plugin.registerCompiler({
  extensions: ['ts'],
}, () => new TsCompiler());

Plugin.registerCompiler({
  extensions: ['jsx'],
}, () => new JsxCompiler());
