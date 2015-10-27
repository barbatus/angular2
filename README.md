## Angular2 package for Meteor

Meteor package that wraps [Angular2 NPM](https://www.npmjs.com/package/angular2) and exposes Angular2 to the outside world as a System.js module.

Current version of Angular2 - **alpha-44**.

Package has also built-in Babel and TypeScript languages support.

### Start importing Angular2 modules
After package installation, you can start importing Angular2 core's components into your Meteor app the same way as you would do it in any other TypeScript or Babel app:

For example, create `app.ts` file and add the next lines:
````ts
import {Component, bootstrap} from 'angular2/angular2';

@Component({
  name: 'demo'
})
class Demo {
}

bootstrap(Demo);
````

Besides core components, `angular2/router` is also available for importing.


### TypeScript
The package uses this TypeScript [compiler](https://github.com/barbatus/ts-compilers) package which can assert TypeScript diagnostics information (e.g. syntactic errors) to the console. At first, you will likely see in the console that names like "Meteor" or "Mongo" are underfined. To get rid of that issue, you will need to make use of Angular2 and Meteor declaration files in your `.ts` files.

Luckily, this package installs all required (Angular2 and Meteor) declaration files into the "typings" folder.
You will need only to add the following lines at the top of each `.ts` file that uses Angular2 or Meteor:
````ts
  /// <reference path="typings/angular2.d.ts" />
  /// <reference path="typings/meteor/meteor.d.ts" />'
````

This should fix compilation issues.
