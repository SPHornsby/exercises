
const requireSH = (moduleName) => {
  /**
  * When invoked, this function should hand back a reference
  * to the module being required. If the module being required does
  * not exist, an error should be thrown.
  */
    if ( functions[moduleName] == undefined) {
      throw new Error(`No function named '${moduleName}' exists`)
    }
    return functions[moduleName]
}

module.exports = requireSH


