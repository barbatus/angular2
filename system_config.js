'user strict';

var oldRegister = System.register;
var mainImported = false;
var mainRegex = /^.*\/main$/;
System.register = function(name, deps, declare) {
  oldRegister.call(this, name, deps, declare);

  if (mainRegex.test(name)) {
    if (mainImported) {
      console.error('[Angular2]: Server part should contain exactly one "main" file');
      return;
    }

    mainImported = true;
    Meteor.startup(function() {
      System.importSync(name);
    });
  }
};
