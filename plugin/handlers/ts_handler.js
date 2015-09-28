var ts = Npm.require('typescript');

class TsCompiler extends NgCompiler {
  constructor() {
    super();

    this.compilerOptions = {
      module : ts.ModuleKind.System,
      target: ts.ScriptTarget.ES5,
      experimentalDecorators: true,
      diagnostics: true
    };
  }

  processFilesForTarget(files) {
    super.processFilesForTarget(files);

    files.forEach((file) => {
      result = this.compileOneFile(file);
      this.addCompileResult(file, result);
    });
  }

  compileOneFile(file) {
    var contents = file.getContentsAsString();

    if (this.isDeclerationFile(file))
      return {
        type: 'd',
        data: contents,
        path: file.getPackagePrefixedPath()
      };

    var diagnostics = [];
    var path = file.getPathInPackage();
    var moduleName = file.getModuleName();
    var result = ts.transpile(contents, this.compilerOptions, path, diagnostics, moduleName);
    this.diagnose(file);

    return {
      type: 'ts',
      data: result,
      path: moduleName + '.js'
    };
  }

  diagnose(file) {
    var path = file.getPathInPackage();
    var program = ts.createProgram([path], this.compilerOptions);
    var sourceFile = program.getSourceFile(path);
    var syntacticDiagnostics = program.getSyntacticDiagnostics(sourceFile, null);
    var semanticDiagnostics = program.getSemanticDiagnostics(sourceFile, null);
    var diagnostics = syntacticDiagnostics.concat(semanticDiagnostics);

    diagnostics.forEach((diagnostic) => {
      if (!diagnostic.file) return;

      var pos = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
      var message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
      var sourcePath = file.getPackagePrefixedPath('log');
      var line = pos.line + 1;
      var column = pos.character + 1;

      file.error({message, sourcePath, line, column});
    });
  }

  addCompileResult(file, result) {
    var type = result.type;
    delete result.type;

    switch (type) {
      case 'd': return file.addAsset(result);
      case 'ts': return file.addJavaScript(result);
    }
  }

  isDeclerationFile(file) {
    return file.getPathInPackage().match(/^.*\.d\.ts$/);
  }
}

Plugin.registerCompiler({
  extensions: ['ts'],
}, () => new TsCompiler());