## Angular2 package for Meteor

Meteor package that wraps [Angular2 NPM](https://www.npmjs.com/package/angular2) and exposes Angular2 to the outside world as a System.js module.

Current version of Angular2 - **alpha-42**.

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
Package's TypeScript plugin asserts TypeScript diagnostics information (e.g. syntactic errors) to the console by default.
To get rid of them will need to reference Angular2 and Meteor declaration files in your `.ts` files.

Luckily, package comes with these declation files included.
All you need to do is to add the next line at the top of each `.ts` file:
````ts
  /// <reference path="../.meteor/local/build/programs/server/assets/packages/barbatus_angular2/typings/all.d.ts" />'
````
This should fix compilation issues.
