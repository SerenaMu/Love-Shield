class plane {
  constructor(options) {
    this.dom = options.dom;
    for (let key in options) {
      this[key] = options[key];
    }
  }
}
