
TsCompiler = class TsCompiler  {
  constructor() {
    this.init();
  }

  processFilesForTarget(files) {
    let dFiles = files.filter(file => this.isDeclarationFile(file));
    dFiles.forEach(file => file.addAsset({
      data: file.getContentsAsString(),
      path: file.getPathInPackage()
    }));

    let tsFiles = files.filter(file => !this.isDeclarationFile(file));
    TypeScript.transpileFiles(tsFiles, {
      ...this.tsconfig,
      filePath: file => file.getPathInPackage(),
      moduleName: file => this.getAbsoluteImportPath(file, true)
    }, (file, diagnostics, result) => {

      this.processDiagnostics(file, diagnostics);

      file.addJavaScript(result);
    });
  }
}

utils.classMixin(TsCompiler, TsBasicCompiler);
