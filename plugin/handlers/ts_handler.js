'use strict';

Plugin.registerCompiler({
  extensions: ['ts'],
}, () => new TsCachingCompiler());
