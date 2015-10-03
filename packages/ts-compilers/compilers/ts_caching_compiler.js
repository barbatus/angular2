
TsCachingCompiler =
class TsCachingCompiler extends MultiFileCachingCompiler {
  constructor() {
    super({
      compilerName: 'ts-caching-compier',
      defaultCacheSize: 1024 * 1024 * 10
    });

    this.init();
  }

  getCacheKey(file) {
    return file.getSourceHash();
  }

  compileResultSize(result) {
    return result.data.length;
  }

  compileOneFile(file, allFiles) {
    if (this.isDeclarationFile(file)) {
      let compileResult = {
        type: 'd',
        data: file.getContentsAsString(),
        path: file.getPathInPackage()
      };

      return {
        compileResult: compileResult,
        referencedImportPaths: []
      }
    }

    let result = TypeScript.transpile(file.getContentsAsString(), {
      ...this.tsconfig,
      filePath: file.getPathInPackage(),
      moduleName: this.getAbsoluteImportPath(file, true)
    });

    this.processDiagnostics(file, result.diagnostics);

    let compileResult = {
      type: 'ts',
      data: result.data,
      sourceMap: result.sourceMap,
      path: this.getJsPathInPackage(file)
    };

    return {
      compileResult: compileResult,
      referencedImportPaths: []
    }
  }

  addCompileResult(file, result) {
    var type = result.type;

    switch (type) {
      case 'd': return file.addAsset(result);
      case 'ts': return file.addJavaScript(result);
    }
  }
}

utils.classMixin(TsCachingCompiler, TsBasicCompiler);
