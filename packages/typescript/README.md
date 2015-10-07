## TypeScript packaged for Meteor.
TypeScript API that is adapted to be used in Meteor packages.

### Getting Started
Install package `meteor add barbatus:typescript` and start
start using TypeScript right away, e.g.:
````js
    let result = TypeScript.transpile(fileContent, {
        filePath: some_path // file path relative to the app root.
        moduleName: some_module, // module name if you want to use ES6 modules.
        ...compilerOptions
    })
````
Package's API strives to be similar to the Meteor's Babel package.

### API
TypeScript.transpileFiles(files, options, fileReadyCallback);
Files - file objects provided by Meteor in a compiler plugin.
fileReadyCallback - callback executed on each file compilation completed.
An example of usage:
````js
    TypeScript.transpileFiles(files, options,
        (file, resultData, referencedFiles, diagnostics) => {

        })
````

TypeScript.transpile(fileContent, options);
Same as above only for a file string content,
returned `file.getContentsAsString()`.
