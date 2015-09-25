'user strict';

var bluebird = Npm.require('bluebird');
var Promise = bluebird.Promise;

// Sync import for System.js to be
// used on the server side to run modules
// in the Meteor environments. 
function syncImport(name) {
  var scheduledFuncs = [];
  var origScheduler = Promise.setScheduler(function(fn) {
    scheduledFuncs.push(fn);
  });
  var origPromise = global.Promise;

  try {
    global.Promise = Promise;
    var promise = System.import(name);
  
    for(var i = 0; i < scheduledFuncs.length; i++) {
      scheduledFuncs[i]();
    }

    return promise.value();
  } finally {
    Promise.setScheduler(origScheduler);
    global.Promise = origPromise;
  }
}

System.importSync = syncImport;
