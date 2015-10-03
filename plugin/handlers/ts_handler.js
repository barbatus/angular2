
Plugin.registerCompiler({
  extensions: ['ts'],
}, () => new TsCachingCompiler());
