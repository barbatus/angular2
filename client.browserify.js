Dependencies = {
  Es6Shim: require('es6-shim'),
  ReflectMetadata: require('reflect-metadata'),
  ZoneJs: require('zone.js')
};

Angular2 = {
  core: require('angular2/core'),
  router: require('angular2/router'),
  change_detection: require('angular2/src/core/change_detection/change_detection'),
  differs: [
    require('angular2/src/core/change_detection/differs/default_iterable_differ'),
    require('angular2/src/core/change_detection/differs/iterable_differs')],
  facade: require('angular2/src/core/facade/async')
};
