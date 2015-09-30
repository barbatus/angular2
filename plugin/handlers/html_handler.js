var $ = Npm.require('cheerio');

class HtmlCompiler extends NgCompiler {
  processFilesForTarget(files) {
    super.processFilesForTarget(files);

    var extensionFiles = [];
    var templateFiles = [];

    files.forEach((file) => {
      var $contents = $(file.getContentsAsString());
      var isExtension = $contents.closest('head,body').length;
      var isTemplate = $contents.closest(':not(head,body)').length;

      if (isExtension && isTemplate)
        throw Error(file.getPackagePrefixedPath('log') +
          ' can\'t contain <head> or <body> tags with other tags in top level of template');

      if (isExtension)
        extensionFiles.push(file);
      else
        templateFiles.push(file);
    });

    // Pops the default layout file if a costume layout was found
    if (extensionFiles.length > 1)
      extensionFiles.some((file, i) =>
        file.getPackageName() == 'barbatus:angular2' && extensionFiles.splice(i, 1)
      );

    new HtmlExtensionCompiler().processFilesForTarget(extensionFiles);
    new NgTemplateCompiler().processFilesForTarget(templateFiles);
  }
}

class HtmlExtensionCompiler extends NgCachingCompiler {
  constructor() {
    super('html-extension-compiler');
  }

  compileResultSize(result) {
    return result.head.length + result.body.length;
  }

  compileOneFile(file) {
    var $contents = $(file.getContentsAsString());
    var $head = $contents.closest('head');
    var $body = $contents.closest('body');

    return {
      head: $head.html() || '',
      body: $body.html() || ''
    };
  }

  addCompileResult(file, result) {
    file.addHtml({
      data: result.head,
      section: 'head'
    });

    file.addHtml({
      data: result.body,
      section: 'body'
    });
  }
}

class NgTemplateCompiler extends NgCachingCompiler {
  constructor() {
    super('ng-template-compiler');
  }

  compileResultSize(result) {
    return result.length;
  }

  compileOneFile(file) {
    return file.getContentsAsString();
  }

  addCompileResult(file, result) {
    file.addAsset({
      data: result,
      path: file.getPackagePrefixedPath()
    });
  }
}

Plugin.registerCompiler({
  extensions: ['html'],
}, () => new HtmlCompiler());