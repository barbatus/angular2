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
  var $script = $('<script>').text(minifyJs(script));
  
  if (!$head.length)
    $head = $('<head>');

  if (!$body.length)
    $body = $('<body>').append($contents.filter(':not(head)'));

  $head.prepend($script);

  file.addHtml({
    data: minifyHtml($head.html()),
    path: file.getDirname() + '/head.html',
    section: 'head'
  });

  file.addHtml({
    data: minifyHtml($body.html()),
    path: file.getDirname() + '/body.html',
    section: 'body'
  });
};

var processTemplate = function(file) {
  file.addAsset({
    path: file.getPathInPackage(),
    data: minifyHtml(file.getContentsAsString())
  });
};

var script = function() {
  System.import('client/app');
};

var minifyHtml = function(html) {
  // Try parsing the html to make sure it is valid before minification
  HTMLTools.parseFragment(html);
  // TODO: For now there are no proper minifiers for angular2 templates,
  // a parsing error will be thrown on a minification attemp since templates are illigal.
  // Wait for a proper angular2 minifier.
  return html;
};

var minifyJs = function(js) {
  return uglify.minify('(' + js.toString() + ')()', {
    fromString: true
  }).code;
};

Plugin.registerCompiler({
  extensions: ['html'],
  filenames: []

}, function() {
  return { processFilesForTarget: processFiles };
});