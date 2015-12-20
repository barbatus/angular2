require('es6-shim');
require('reflect-metadata');
// Requiring original zone.js file is
// more reliable than package itself.
// TODO: investigate why meteorhacks:zones@1.6.0
// doesn't work.
require('zone.js/dist/zone.js');
require('rxjs');

var Angular2 = {
  core: require('angular2/core'),
  common: require('angular2/common'),
  bootstrap: require('angular2/bootstrap'),
  router: require('angular2/router'),
  browser: [
    require('angular2/platform/browser')
  ],
  // Requires below are for the dev purposes mostly.
  change_detection: [
    require('angular2/src/core/change_detection/change_detection'),
    require('angular2/src/core/change_detection/differs/default_iterable_differ'),
    require('angular2/src/core/change_detection/differs/iterable_differs')],
  facade: [
    require('angular2/src/facade/async'),
    require('angular2/src/facade/lang'),
    require('angular2/src/facade/browser'),
    require('angular2/src/facade/math'),
    require('angular2/src/facade/collection')
  ],
  dom: [
    require('angular2/src/platform/dom/dom_adapter')
  ],
  decorators: require('angular2/src/core/util/decorators')
};

// Registers System.js module.
function register(module, exportFn) {
  var modules = _.isArray(module) ? module : [module]; 
  return {
    setters: [],
    execute: function() {
      for (var i = 0; i < modules.length; i++) {
        var module = modules[i];
        for (var exportName in module) {
          exportFn(exportName, module[exportName]);
        }
      }
    }
  };
}

System.register('angular2/core', [], function(exportFn) {
  return register(Angular2.core, exportFn);
});

System.register('angular2/common', [], function(exportFn) {
  return register(Angular2.common, exportFn);
});

System.register('angular2/bootstrap', [], function(exportFn) {
  return register(Angular2.bootstrap, exportFn);
});

System.register('angular2/platform/browser', [], function(exportFn) {
  return register(Angular2.browser, exportFn);
});

System.register('angular2/router', [], function(exportFn) {
  return register(Angular2.router, exportFn);
});



System.register('angular2/decorators', [], function(exportFn) {
  return register([Angular2.decorators], exportFn);
});

System.register('angular2/change_detection', [], function(exportFn) {
  return register(_.flatten(Angular2.change_detection), exportFn);
});

System.register('angular2/facade', [], function(exportFn) {
  return register(Angular2.facade, exportFn);
});

System.register('angular2/platform/dom', [], function(exportFn) {
  return register(Angular2.dom, exportFn);
});
