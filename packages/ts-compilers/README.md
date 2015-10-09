## TypeScript compilers for Meteor.

Package exposes two TypeScript compilers: one basic compiler and one caching compiler to be used in
a Meteor compiler plugin.

This TypeScript package is used as a TypeScript provider.

### Getting Started
Register a TS plugin with one of two provided compilers as follows: 
````ts
Plugin.registerCompiler({
  extensions: ['ts'],
}, () => new TsCachingCompiler());
````

### Compilers
#### TsCompiler
Compiler to compile all provided .ts-files at once using
`TypeScript.transpileFiles` method. One of the its benefits can be improved speed
at least on the initial running -- since all files are provided all together
TypeScript compiles them more effiently using internal cache.

#### TsCachingCompiler
Extends `MultiFileCachingCompiler`. Compile files one by one but uses
cache to skip pristine files. Uses `TypeScript.transpile` method.

#### .tsconfig
Compilers can be configured via `.tsconfig` in the app root folder.
Format of the `.tsconfig` is pretty much the same as [here](https://github.com/Microsoft/TypeScript/wiki/tsconfig.json),
except whole config structure is treated as `compilerOptions` part.
Most compiler options stay intact except few cases. You can read about them
[here](https://github.com/barbatus/angular2/tree/master/packages/typescript).
Only one additional options has been added -- `alwaysThrow`.
When set compiler will always throw exceptions whenever any of the errors
occur whether it's syntactic or symantic. Otherwise, throws only on
syntactic errors like module resolution errors, unknown variable is used etc.
