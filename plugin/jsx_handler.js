var handler = function(compileStep) {
  var source = compileStep.read().toString('utf8');
  var outputFile = compileStep.inputPath + '.js';

  var path = compileStep.inputPath.split('.jsx');
  var moduleId = path[0];

  if (compileStep.packageName) {
    moduleId = '{' + compileStep.packageName + '}/' + moduleId;
  }

  var extraWhitelist = [
    'es6.modules',
    'es7.decorators'
  ];

  try {
    var result = Babel.transformMeteor(source, {
      sourceMap: true,
      filename: compileStep.pathForSourceMap,
      sourceMapName: compileStep.pathForSourceMap,
      extraWhitelist: extraWhitelist,
      modules: 'system',
      moduleIds: true,
      moduleId: moduleId
    });
  } catch (e) {
    if (e.loc) {
      compileStep.error({
        message: e.message,
        sourcePath: compileStep.inputPath,
        line: e.loc.line,
        column: e.loc.column
      });
      return;
    }
    throw e;
  }

  compileStep.addJavaScript({
    path: outputFile,
    sourcePath: compileStep.inputPath,
    data: result.code,
    sourceMap: JSON.stringify(result.map)
  });
};

Plugin.registerSourceHandler('jsx', handler);
