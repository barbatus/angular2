## TypeScript packaged for Meteor.
TypeScript API that is adapted to be used in Meteor packages.

### Getting Started
Install package `meteor add barbatus:typescript` and start using TypeScript right away, e.g.:
````js
    let result = TypeScript.transpile(fileContent, {
        filePath: some_path // file path relative to the app root.
        moduleName: some_module, // set module name if you want to use ES6 modules.
        ...compilerOptions
    })
````
Package's API strives to be similar to the Babel package's one.

### API
#### TypeScript.transpileFiles(files, options, fileReadyCallback)
**files** param is expected to be Meteor's file objects in a compiler plugin.
Method eventually uses only `getContentsAsString` inside,
access to other file characteristics can be defined in the **options**.

**options** should have the following structure:
````
{
    ...compilerOptions,
    filePath: (file) => file.getPathInPackage()
    moduleName: (file) => getModuleName(file)
}
````
`filePath` field is expected to be a function that gets in a file object and return its file path.
Field is *required*.

_moduleName_ field. If you want to use modules, you set the _module_ field of the **compilerOptions** (e.g., `compilerOptions.module = ts.ModuleKind.System`) and define a _moduleName_ function that gets in a file and retuns some module name.

**fileReadyCallback** -- callback that is being executed each time file compilation is completed.

Callback's params are defined as follows:
````js
    TypeScript.transpileFiles(files, options,
        (file, referencedFiles, diagnostics, resultData) => {

        })
````

_file_ -- file that has been compiled.

_referencedFiles_ -- paths of the TypeScript modules and declaration files that current file uses.
Param is useful for Meteor compilers because allows to watch for changes in the file's dependencies and re-compile file when used API has been potentially changed.

_diagnostics_ -- an array if diagnostic messages of the file compilation.
Structure of each diagnostic message is described below.

#### TypeScript.transpile(fileContent, options);
Same as `transpileFiles` but only for one file's string content. String content can be taken by file API's method
`file.getContentsAsString()`.

### Compiler Options

### Diagnostics
