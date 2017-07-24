
const define = (name, fx) => {
  /**
  * When invoked, this function stores a reference
  * to the module being defined. If the module being defined does
  * not exist, an error should be thrown.
  */
  functions = global.functions ? global.functions : {}
  functions[name] = fx
  return;
}

module.exports  = define