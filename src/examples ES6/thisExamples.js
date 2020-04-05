class MyClass {
  logNames() {
    const jsFL = ["Angular", "React", "VueJS"];
    jsFL.forEach(function(name) {
      // Expression de fonction classique
      this.logger(name);
    });
  }
  logger(value) {
    console.log(value);
  }
}
const c = new MyClass();
c.logNames();
