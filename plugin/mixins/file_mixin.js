FileMixin = {
  getPackagePrefixedPath(extension) {
    return this.getPackagePrefix(extension) + '/' + this.getPathInPackage();
  },

  getPackagePrefixedModule(extension) {
    return this.getPackagePrefix(extension) + '/' + this.getModuleName();
  },

  getPackagePrefix(extension) {
    var packageName = this.getPackageName();
    if (!packageName) return '';

    switch (extension || this.getExtension()) {
      case 'html': return packageName.replace(':', '-');
      case 'jsx': return '{' + packageName + '}';
      case 'log': return '{' + packageName + '}';
      default: return '';
    }
  },

  getModuleName() {
    return this.getPathInPackage().match(/^(.*?)\.[^\/]*$/)[1];
  }
};