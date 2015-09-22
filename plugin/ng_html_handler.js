var processFiles = function(files) {
  files.forEach(processFile);
};

var processFile = function(file) {
  file.addHtml({
    path: file.getPathInPackage(),
    data: file.getContentsAsString(),
    section: 'body'
  });
};

Plugin.registerCompiler({
  extensions: ['ng.html'],
  filenames: []

}, function() {
  return { processFilesForTarget: processFiles };
});