'use strict';

Plugin.registerCompiler({
  extensions: ['ts'],
}, () => new TsCachingCompiler());

Plugin.registerCompiler({
  extensions: ['jsx'],
}, () => new JsxCompiler());
