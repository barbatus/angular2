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
Extends Meteor's [`MultiFileCachingCompiler`](https://atmospherejs.com/meteor/caching-compiler). `TsCachingCompiler` compiles files one by one using
file hashes to avoid tranforming pristine files. `TypeScript.transpile` is used internally to transpile file contents.

#### TypeScript Config
Compilers can be configured via `.tsconfig` in the app root folder.
Format of the `.tsconfig` is pretty much the same as [here](https://github.com/Microsoft/TypeScript/wiki/tsconfig.json),
except whole config structure is treated as `compilerOptions` part;
`files` part is omitted due to lack of necessity.

Most compiler options stay intact except few cases. You can read about them
[here](https://github.com/barbatus/angular2/tree/master/packages/typescript).

One additional options that has been added — `alwaysThrow`.
When set, the compiler will always throw exceptions whenever syntactic or symantic error
occurs. Otherwise, it throws by default only on syntactic errors,
semantic ones (like module resolution errors, unknown variable is used etc) are just printed to the terminal.

#### Compilation Speed-up
`noResolve` configuration option is responsible for module resolution process same as the original one is supposed to be.
One of the point to have is that module resolution can greately slow down the compilation speed. Taking this into account, one can consider switching it on, i.e. `noResolve: true`, during intensive period of app development and having Meteor running at the same time.
TypeScript will skip resolving each module while continue cursing on syntactic errors. This can greately increase speed of the Meteor re-start on each file change.

At the end of the day, you can switch `noResolve` back to false and re-start Meteor. Thus, you'll check all possible mistakes you could have made including missing modules errors or incorrect API usage etc. You can treat it partly as the schema one expects to use with non-script languages like Java etc. Usually there you make changes first, only then compile to check if there is any mistakes.

#### Example of usage
Please, check Angular2's demo called Parties [here](https://github.com/Urigo/Meteor-Angular2/tree/master/examples/parties). It's built fully in TypeScript and uses `.tsconfig` as well.
