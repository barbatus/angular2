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

System.register('angular2/angular2', [], function(exportFn) {
  return register(Angular2.core, exportFn);
});

System.register('angular2/router', [], function(exportFn) {
  return register(Angular2.router, exportFn);
});

System.register('angular2/change_detection', [], function(exportFn) {
  return register(_.flatten([Angular2.change_detection, Angular2.differs]), exportFn);
});

System.register('angular2/forms', [], function(exportFn) {
  return register(Angular2.forms, exportFn);
});

System.register('angular2/di', [], function(exportFn) {
  return register(Angular2.di, exportFn);
});

System.register('angular2/directives', [], function(exportFn) {
  return register(Angular2.directives, exportFn);
});

System.register('angular2/pipes', [], function(exportFn) {
  return register(Angular2.pipes, exportFn);
});

System.register('angular2/render', [], function(exportFn) {
  return register(Angular2.render, exportFn);
});

System.register('angular2/facade', [], function(exportFn) {
  return register(Angular2.facade, exportFn);
});
