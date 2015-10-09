## TypeScript compilers for Meteor.

Package exposes two TypeScript compilers: one basic compiler `TsCompiler` and one caching compiler `TsCachingCompiler` to be used in a Meteor compiler plugin.

[This](https://github.com/barbatus/angular2/tree/master/packages/typescript) TypeScript package is used as a TypeScript provider.

### Getting Started
Register a TS plugin with one of two provided compilers as follows: 
````ts
Plugin.registerCompiler({
  extensions: ['ts'],
}, () => new TsCachingCompiler());
````
And you are ready to go.

### Compilers
#### TsCompiler
To be used for compilation of all provided `.ts`-files at once using
`TypeScript.transpileFiles` method internally.

One of the its benefits can be improved speed
at least on the initial Meteor run. Since all files are provided in a batch,
TypeScript compiles them more effiently using internal cache.

#### TsCachingCompiler
Extends Meteor's `MultiFileCachingCompiler`. `TsCachingCompiler` compiles files one by one using
file hashes to avoid tranforming pristine files. `TypeScript.transpile` is used internally to transpile file contents.

#### .tsconfig
Compilers can be configured via `.tsconfig` in the app root folder.
Format of the `.tsconfig` is pretty much the same as [here](https://github.com/Microsoft/TypeScript/wiki/tsconfig.json),
except whole config structure is treated as `compilerOptions` part;
`files` part is omitted due to lack of necessity.

Most compiler options stay intact except few cases. You can read about them
[here](https://github.com/barbatus/angular2/tree/master/packages/typescript).

One additional options has been added — `alwaysThrow`.
When set, the compiler will always throw exceptions whenever syntactic or symantic error
occurs. Otherwise, it throws by default only on syntactic errors,
semantic ones (like module resolution errors, unknown variable is used etc) are printed to the terminal.

`noResolve` option is responsible for module resolutions same as the original one is used to.
Though, module resolution can greately slow down the compilation speed. Taking that into account, one can consider
switching in on, i.e. `noResolve: true`, during intensive period of app development having Meteor running at the same time.
TypeScript will skip resolving each module while continue cursing on syntactic errors. This can greately increase speed of the Meteor re-start on each file change.

At the end of the day, you can switch `noResolve` back to false, thus, checking all possible mistakes you could have made including missing modules errors or incorrect API usage etc. You can treat it partly as the schema one expects to use with non-script languages like Java etc. First, you make changes, only then compile to check if there is any mistakes.
