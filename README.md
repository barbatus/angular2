## Angular2 package for Meteor

Angular2 packaged for Meteor as a System.js module.

Source code is taken from the official [Angular2 NPM](https://www.npmjs.com/package/angular2).

Current version of Angular2 in the package - **alpha-44**.

Also, this package provides Babel and TypeScript languages support for development with Angular2.

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
The package uses [this](https://github.com/barbatus/ts-compilers) TypeScript compiler package which can assert TypeScript diagnostics information (e.g. syntactic errors) to the console. At first, you will likely see in the console that names like "Meteor" or "Mongo" are underfined. To get rid of that issue, you will need to make use of Angular2 and Meteor declaration files in your `.ts` files.

Luckily, this package installs all required (Angular2 and Meteor) declaration files into the "typings" folder at the first run.
You will need only to add the following lines at the top of each `.ts` file that uses Angular2 or Meteor:
````ts
  /// <reference path="typings/angular2.d.ts" />
  /// <reference path="typings/meteor/meteor.d.ts" />'
````

This should fix compilation issues.
