'use strict';

// Register a linter here.
// It runs before compilers and
// we need to create declaration files first.
// TypingsProcessor just copies declaration files
// from packages to the app typings folder. 
Plugin.registerLinter({
  extensions: ['d.ts'],
}, () => new TypingsProcessor());

Plugin.registerCompiler({
  extensions: ['ts'],
}, () => new TsCachingCompiler());
