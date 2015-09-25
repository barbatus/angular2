var processFiles = function(files) {
  files.forEach(processFile);
};

var processFile = function(file) {
  var source = file.getContentsAsString();
  var packageName = file.getPackageName();
  var inputFile = file.getPathInPackage();
  var moduleId = inputFile.split('.jsx')[0];
  var outputFile = moduleId + '.js';

  if (packageName) {
    moduleId = '{' + packageName + '}/' + moduleId;
  }

  var result;
  var extraWhitelist = [
    'es6.modules',
    'es7.decorators'
  ];

  try {
    result = Babel.transformMeteor(source, {
      sourceMap: true,
      filename: file.getDisplayPath(),
      sourceMapName: file.getDisplayPath(),
      extraWhitelist: extraWhitelist,
      modules: 'system',
      moduleIds: true,
      moduleId: moduleId
    });
  } catch (e) {
    if (e.loc) {
      file.error({
        message: e.message,
        sourcePath: inputFile,
        line: e.loc.line,
        column: e.loc.column
      });
      return;
    }
    throw e;
  }

  file.addJavaScript({
    path: outputFile,
    data: result.code
  });
};

Plugin.registerCompiler({
  extensions: ['jsx'],
  filenames: []

}, function() {
  return { processFilesForTarget: processFiles };
});