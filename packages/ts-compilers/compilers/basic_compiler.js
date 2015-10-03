
var path = Plugin.path;
var fs = Plugin.fs;
var ts = Npm.require('typescript');

TsBasicCompiler = class TsBasicCompiler {
  init() {
    this._customConfig = this._readConfig();

    this._defaultConfig = {
      module : ts.ModuleKind.System,
      target: ts.ScriptTarget.ES5,
      sourceMap: true,
      noResolve: false,
      diagnostics: true
    };
  }

  get tsconfig() {
    return _.extend({},
      this._defaultConfig, this._customConfig);
  }

  _readConfig() {
    let tsconfigFs = path.resolve('./.tsconfig');
    if (fs.existsSync(tsconfigFs)) {
      try {
        let tsconfig = JSON.parse(
          fs.readFileSync(tsconfigFs, 'utf8'));
        return tsconfig;
      } catch(err) {
        throw new Error('Format of the tsconfig is invalid');
      }
    }
    return null;
  }

  processDiagnostics(file, diagnostics) {
    diagnostics.syntactic.forEach(diagnostic => {
      file.error({
        message: diagnostic.message,
        // Path with package name prefix to 
        // show package where this error happened.
        sourcePath: this.getPackagePrefixedPath(file),
        line: diagnostic.line,
        column: ediagnostic.column
      });
    });

    if (this.tsconfig.alwaysThrow) {
      diagnostics.semantic.forEach(diagnostic => {
        file.error({
          message: diagnostic.message,
          sourcePath: this.getPackagePrefixedPath(file),
          line: diagnostic.line,
          column: diagnostic.column
        });
      });
      return;
    }

    if (this.tsconfig.diagnostics) {
      diagnostics.logSemantic();
    }
  }

  isDeclarationFile(file) {
    return TypeScript.isDeclarationFile(
      file.getBasename());
  }

  getAbsoluteImportPath(file, noExtension) {
    let packageName = file.getPackageName();
    let packagePrefix = packageName ? '{' + packageName + '}/' : '';
    let resultPath = packagePrefix + file.getPathInPackage();

    return noExtension ? ts.removeFileExtension(resultPath) : resultPath;
  }

  getJsPathInPackage(file) {
    let path = file.getPathInPackage();
    return ts.removeFileExtension(path) + '.js';
  }
};
