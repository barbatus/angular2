
utils = {
  classMixin(target, source) {
    target = target.prototype; source = source.prototype;

    Object.getOwnPropertyNames(source).forEach(name => {
      if (name !== 'constructor') {
        Object.defineProperty(target, name,
          Object.getOwnPropertyDescriptor(source, name));
      }
    });
  }
};
