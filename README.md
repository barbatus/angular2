## Angular2 packaged for Meteor

Angular 2's modules are registered and distributed as System.js modules.

Source code is taken from the official [Angular2 NPM](https://www.npmjs.com/package/angular2).

Current version of Angular2 in the package - **beta-1**.

Also, this package adds Babel and TypeScript languages compilers to develop with Angular2.

### Start importing Angular2 modules
After package installation, you can start importing Angular 2 core's components into your Meteor app the same way as you would do it in any other TypeScript or Babel app:

For example, create `app.ts` file and add the next lines:
````ts
import {Component} from 'angular2/core';

import {bootstrap}  from 'angular2/platform/browser';

@Component({
  name: 'demo'
})
class Demo {
}

bootstrap(Demo);
````

Besides core components, `angular2/router` is also available for importing.


### TypeScript
The package uses [this](https://github.com/barbatus/ts-compilers) TypeScript compiler package which can assert TypeScript diagnostics information (e.g. syntactic errors) to the console. At first, you will likely see in the console that names like "Meteor" or "Mongo" are underfined.
To get rid of that issue, you will need to make use of Angular2 and Meteor definition files in your app.

The package installs Angular2 definition files since they are distributed via the Angular 2 NPM.

There are two ways to add typings to the app:

  - using special sugared syntax to reference definitions at the top of any ts-file:

````ts
/// <reference path="typings/angular2/angular2.d.ts" />
````

  - or adding typings to the `tsconfig.json` globally for all files:

````
{
  "files": ["typings/angular2/angular2.d.ts"]
}
````

This should fix compilation issues.
