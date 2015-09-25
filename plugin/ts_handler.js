var ts = Npm.require('typescript');

var processFiles = function(files) {
  files.forEach(processFile);
};

var processFile = function(file) {
  var source = file.getContentsAsString();
  var inputFile = file.getPathInPackage();
  var moduleId = inputFile.split('.ts')[0];
  var outputFile = moduleId + '.js';

  if (inputFile.indexOf('.d.ts') != -1) {
    file.addAsset({
      path: inputFile,
      data: source
    });
    return;
  }

  var options = {
    module : ts.ModuleKind.System,
    target: ts.ScriptTarget.ES5,
    experimentalDecorators: true,
    diagnostics: true
  };
  var diagnostics = [];
  // This returns only Syntactic diagnostics which is usually empty.
  var result = ts.transpile(source, options, inputFile, diagnostics, moduleId);

  // Outputs extended diagnostics.
  logErrors(inputFile, options);

  file.addJavaScript({
    path : outputFile,
    data : result
  });
};

var logErrors = function(inputPath, compilerOptions) {
  var program = ts.createProgram([inputPath], compilerOptions);

  var sourceFile = program.getSourceFile(inputPath);
  var syntacticDiagnostics = program.getSyntacticDiagnostics(sourceFile, null);
  var semanticDiagnostics = program.getSemanticDiagnostics(sourceFile, null);
  var diagnostics = syntacticDiagnostics.concat(semanticDiagnostics);
  for (var i = 0; i < diagnostics.length; i++) {
    var diagnostic = diagnostics[i];
    if (!diagnostic.file) continue;

    var pos = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
    var errorMessage = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
    var line = pos.line + 1;
    var character = pos.character + 1;
    var message = diagnostic.file.fileName + ' (' + line + ', ' + character + '): ' +
      errorMessage;
    console.warn(message);
  }
};

Plugin.registerCompiler({
  extensions: ['ts'],
  filenames: []

}, function() {
  return { processFilesForTarget: processFiles };
});