var ts = Npm.require('typescript');

function logErrors(inputPath, compilerOptions) {
  var program = ts.createProgram([inputPath], compilerOptions);

  var syntacticDiagnostics = program.getSyntacticDiagnostics(null);
  var semanticDiagnostics = program.getSemanticDiagnostics(null);
  var diagnostics = syntacticDiagnostics.concat(semanticDiagnostics);
  for (var i = 0; i < diagnostics.length; i++) {
    var diagnostic = diagnostics[i];
    if (diagnostic.file) {
      var pos = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
      var errorMessage = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
      var line = pos.line + 1;
      var character = pos.character + 1;
      var message = diagnostic.file.fileName + ' (' + line + ', ' + character + '): ' +
        errorMessage;
      console.warn(message);
    }
  }
}

Plugin.registerSourceHandler('ts', function(compileStep) {
  var source = compileStep.read().toString('utf8');
  var outputFile = compileStep.inputPath;
  var inputFile = compileStep.inputPath;

  var path = inputFile.split('.ts');
  var moduleId = path[0];

  var options = {
    module : ts.ModuleKind.System,
    target: ts.ScriptTarget.ES5,
    experimentalDecorators: true,
    diagnostics: true
  };
  var result = ts.transpile(source, options, null, null, moduleId);

  logErrors(inputFile, options);

  compileStep.addJavaScript({
    path : outputFile,
    data : result,
    sourcePath: outputFile
  });
});
