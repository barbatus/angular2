var Package = require('dgeni').Package;
var jsdocPackage = require('dgeni-packages/jsdoc');
var nunjucksPackage = require('dgeni-packages/nunjucks');
var typescriptPackage = require('../typescript-package');
var gitPackage = require('dgeni-packages/git');
var path = require('canonical-path');

// Define the dgeni package for generating the docs
module.exports = new Package('angular-v2-docs', [jsdocPackage, nunjucksPackage, typescriptPackage, gitPackage])

// Register the processors
.processor(require('./processors/createTypeDefinitionFile'))

.config(function(readFilesProcessor, inlineTagProcessor) {
  readFilesProcessor.basePath = path.resolve(__dirname, '../..');
  // Don't run unwanted processors
  readFilesProcessor.$enabled = false;
  inlineTagProcessor.$enabled = false;
})


// Configure the log service
.config(function(log) {
  log.level = 'info';
})


.config(function(renderDocsProcessor, versionInfo) {
  renderDocsProcessor.extraData.versionInfo = versionInfo;
})

.config(function(readFilesProcessor, inlineTagProcessor, readTypeScriptModules, createTypeDefinitionFile) {

  // Don't run unwanted processors
  readFilesProcessor.$enabled = false; // We are not using the normal file reading processor
  inlineTagProcessor.$enabled = false; // We are not actually processing the inline link tags

  // Configure file reading
  readFilesProcessor.basePath = path.resolve(__dirname, '../../..');
  readTypeScriptModules.sourceFiles = [
    'angular2/core.ts',
    'angular2/common.ts',
    'angular2/bootstrap.ts',
    'angular2/platform/browser.ts',
    'angular2/router.ts'
  ];
  readTypeScriptModules.basePath = path.resolve(path.resolve(__dirname, '../../..'));

  createTypeDefinitionFile.typeDefinitions = [
    {
      id: 'angular2/core',
      references: [
        '../es6-promise/es6-promise.d.ts',
        '../es6-shim/es6-shim.d.ts'
      ],
      modules: {
        'angular2/core': {namespace: 'core', id: 'angular2/core'}
      }
    },
    {
      id: 'angular2/bootstrap',
      references: ['./core.d.ts'],
      remapTypes: {
        Type: 'core.Type',
        ComponentRef: 'core.ComponentRef'
      },
      modules: {
        'angular2/bootstrap': {namespace: 'bootstrap', id: 'angular2/bootstrap'}
      }
    },
    {
      id: 'angular2/common',
      references: ['./core.d.ts'],
      remapTypes: {
        Type: 'core.Type',
        Renderer: 'core.Renderer',
        ElementRef: 'core.ElementRef',
        Observable: 'core.Observable',
        EventEmitter: 'core.EventEmitter',
        IterableDiffers: 'core.IterableDiffers',
        ViewContainerRef: 'core.ViewContainerRef',
        TemplateRef: 'core.TemplateRef',
        ChangeDetectorRef: 'core.ChangeDetectorRef',
        OpaqueToken: 'core.OpaqueToken',
        QueryList: 'core.QueryList',
        SimpleChange: 'core.SimpleChange',
        PipeTransform: 'core.PipeTransform',
        OnDestroy: 'core.OnDestroy',
        OnInit: 'core.OnInit',
        DoCheck: 'core.DoCheck',
        OnChanges: 'core.OnChanges',
        KeyValueDiffers: 'core.KeyValueDiffers'
      },
      modules: {
        'angular2/common': {namespace: 'common', id: 'angular2/common'},
      }
    },
    {
      id: 'angular2/platform/browser',
      references: ['../core.d.ts'],
      remapTypes: {
        Type: 'core.Type',
        OpaqueToken: 'core.OpaqueToken',
        ComponentRef: 'core.ComponentRef',
        DebugElement: 'core.DebugElement'
      },
      modules: {
        'angular2/platform/browser': {namespace: 'browser', id: 'angular2/platform/browser'}
      }
    },
    {
      id: 'angular2/router',
      references: ['./core.d.ts'],
      remapTypes: {
        Type: 'core.Type',
        InjectableReference: 'core.InjectableReference',
        ElementRef: 'core.ElementRef',
        DynamicComponentLoader: 'core.DynamicComponentLoader'
      },
      modules: {'angular2/router': {namespace: 'ngRouter', id: 'angular2/router'}}
    }
  ];
})


.config(function(parseTagsProcessor, getInjectables) {
  // We actually don't want to parse param docs in this package as we are getting the data out using TS
  parseTagsProcessor.tagDefinitions.forEach(function(tagDef) {
    if (tagDef.name === 'param') {
      tagDef.docProperty = 'paramData';
      tagDef.transforms = [];
    }
  });

})


// Configure file writing
.config(function(writeFilesProcessor) {
  writeFilesProcessor.outputFolder  = 'dist/docs';
})


// Configure rendering
.config(function(templateFinder, templateEngine) {

  // Nunjucks and Angular conflict in their template bindings so change Nunjucks
  templateEngine.config.tags = {
    variableStart: '{$',
    variableEnd: '$}'
  };

  templateFinder.templateFolders
      .unshift(path.resolve(__dirname, 'templates'));

  templateFinder.templatePatterns = [
    '${ doc.template }',
    '${ doc.id }.${ doc.docType }.template.html',
    '${ doc.id }.template.html',
    '${ doc.docType }.template.html',
    'common.template.html'
  ];
});
