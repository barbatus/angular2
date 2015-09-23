var $ = Npm.require('cheerio');
var uglify = Npm.require('uglify-js');

var processFiles = function(files) {
  files.forEach(function(file) {
    if (file.getBasename() == 'index.html')
      processIndex(file);
    else
      processTemplate(file);
  });
};

var processIndex = function(file) {
  var $contents = $(file.getContentsAsString());
  var $head = $contents.closest('head');
  var $body = $contents.closest('body');
  var $script = $('<script>').text(scriptContent);
  
  if (!$head.length)
    $head = $('<head>');

  if (!$body.length)
    $body = $('<body>').append($contents.filter(':not(head)'));

  $head.prepend($script);

  file.addHtml({
    data: $head.html(),
    path: file.getDirname() + '/head.html',
    section: 'head'
  });

  file.addHtml({
    data: $body.html(),
    path: file.getDirname() + '/body.html',
    section: 'body'
  });
};

var processTemplate = function(file) {
  file.addAsset({
    path: file.getPathInPackage(),
    data: file.getContentsAsString()
  });
};

var scriptContent = (function() {
  var script = function() {
    System.import('client/app');
  };

  return uglify.minify('(' + script.toString() + ')()', { fromString: true }).code;
})();

Plugin.registerCompiler({
  extensions: ['html'],
  filenames: []

}, function() {
  return { processFilesForTarget: processFiles };
});