'use strict';

var ts = Npm.require('typescript');

class DiagnosticMessage {
  constructor(filePath, message, line, column) {
    this.filePath = filePath;
    this.message = message;
    this.line = line;
    this.column = column;
  }

  get formattedMsg() {
    return `${this.filePath} (${this.line}, ${this.column}): ${this.message}`;
  }
}

class CompilerDiagnostics {
  constructor(
      syntactic: Array<DiagnosticMessage>,
      semantic: Array<DiagnosticMessage>
    ) {
    this.syntactic = syntactic;
    this.semantic = semantic;
  }

  logSyntactic() {
    this.syntactic.forEach(diagnostic => {
      console.log(diagnostic.formattedMsg);
    });
  }

  logSemantic() {
    this.semantic.forEach(diagnostic => {
      console.log(diagnostic.formattedMsg);
    });
  }
}

TypeScript = class TypeScript {

  static transpileFiles(files, options, onFileReadyCallback) {

    ts.Debug.assert(Match.test(options.filePath, Function),
      '[TypeScript.transpileFiles]: options.filePath should be a function');

    ts.Debug.assert(Match.test(options.moduleName, Match.Optional(Function)),
      '[TypeScript.transpileFiles]: options.moduleName should be a function');

    TypeScript._transpileFiles(files, options, onFileReadyCallback);
  }

  static transpile(fileContent, options) {

    ts.Debug.assert(Match.test(options.filePath, String),
      '[TypeScript.transpile]: options.filePath should be a string');

    return TypeScript._transpile(fileContent, options);
  }

  static getCompilerOptions(customOptions) {
    let compilerOptions = ts.getDefaultCompilerOptions();

    _.extend(compilerOptions, customOptions);

    // Support decorators by default.
    compilerOptions.experimentalDecorators = true;

    compilerOptions.isolatedModules = true;

    return compilerOptions;
  }

  static normalizeName(fileName) {
    var resultName = fileName;
    if (ts.fileExtensionIs(resultName, '.map')) {
      resultName = resultName.replace('.map', '');
    }
    return ts.removeFileExtension(
      ts.normalizeSlashes(resultName));
  }

  static isDeclarationFile(fileName) {
    return fileName.match(/^.*\.d\.ts$/);
  }

  static _transpileFiles(files, options, onFileReadyCallback) {
    let compilerOptions = TypeScript.getCompilerOptions(options);

    let defaultHost = ts.createCompilerHost(compilerOptions);

    let fileMap = ts.createFileMap(TypeScript.normalizeName);
    files.forEach(file => 
      fileMap.set(options.filePath(file), file));

    let fileResultMap = ts.createFileMap(TypeScript.normalizeName);

    let customHost = {
      getSourceFile: (fileName, target) => {
        let sourceFile = defaultHost.getSourceFile(fileName, target);
        let file = fileMap.get(fileName);
        if (!file) return  sourceFile;

        sourceFile.moduleName = options.moduleName &&
          options.moduleName(file);
        return sourceFile;
      }
    };

    let compilerHost = _.extend({}, defaultHost, customHost);
    let fileNames = files.map(file => options.filePath(file));
    let program = ts.createProgram(fileNames, compilerOptions, compilerHost);

    // Emit
    program.emit(undefined, (fileName, outputText, writeByteOrderMark) => {
      let file = fileMap.get(fileName);
      if (!file) return;

      let fileResult = fileResultMap.get(fileName) || {};

      if (ts.fileExtensionIs(fileName, '.map')) {
        fileResult.sourceMapPath = fileName;
        fileResult.sourceMap = outputText;
      } else {
        fileResult.path = fileName;
        fileResult.data = outputText;
      }

      let isFileReady = fileResult.data &&
        (!compilerOptions.sourceMap || fileResult.sourceMap);

      if (isFileReady) {
        fileResultMap.remove(fileName);
        let diagnostics = TypeScript._readDiagnostics(program,
          options.filePath(file));
        onFileReadyCallback(file, diagnostics, fileResult);
        return;
      }

      fileResultMap.set(fileName, fileResult);
    });
  }

  static _transpile(fileContent, options) {
    let compilerOptions = TypeScript.getCompilerOptions(options);

    let sourceFile = ts.createSourceFile(options.filePath,
      fileContent, compilerOptions.target);
    if (options.moduleName) {
      sourceFile.moduleName = options.moduleName;
    }

    let defaultHost = ts.createCompilerHost(compilerOptions);

    let customHost = {
      getSourceFile: (fileName, target) => {
        // We already have content of the target file,
        // skip reading it one more time.
        if (fileName === ts.normalizeSlashes(options.filePath)) {
          return sourceFile;
        }
        return defaultHost.getSourceFile(fileName, target);
      }
    };

    let compilerHost = _.extend({}, defaultHost, customHost);
    let program = ts.createProgram([options.filePath],
      compilerOptions, compilerHost);

    let data, sourceMap;
    program.emit(sourceFile, (fileName, outputText, writeByteOrderMark) => {
      if (TypeScript.normalizeName(fileName) !==
          TypeScript.normalizeName(options.filePath)) return;

      if (ts.fileExtensionIs(fileName, '.map')) {
        sourceMap = outputText;
      } else {
        data = outputText;
      }
    });

    let diagnostics = this._readDiagnostics(program, options.filePath);

    return { data, sourceMap, diagnostics };
  }

  static _readDiagnostics(program, filePath: String): CompilerDiagnostics {
    let sourceFile;
    if (filePath) {
      sourceFile = program.getSourceFile(filePath);
    }

    let syntactic = TypeScript._flattenDiagnostics(
      program.getSyntacticDiagnostics(sourceFile));
    let semantic =  TypeScript._flattenDiagnostics(
      program.getSemanticDiagnostics(sourceFile));
    let diagnostics = new CompilerDiagnostics(syntactic, semantic);

    return diagnostics;
  }

  static _flattenDiagnostics(tsDiagnostics: Array<ts.Diagnostic>) {
    let diagnostics: FlattenDiagnostic[] = [];

    tsDiagnostics.forEach((diagnostic) => {
      if (!diagnostic.file) return;

      let pos = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
      let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
      let line = pos.line + 1;
      let column = pos.character + 1;

      diagnostics.push(
        new DiagnosticMessage(diagnostic.file.fileName, message, line, column));
    });

    return diagnostics;
  }
}
