
const requireSH = require('./require')

describe('Test Require function', function() {
  it('should return a globally defined function', function() {
    global.functions ={} 
    functions.sum = function(a,b) {return a+b}
    const sum = requireSH('sum')
    expect(typeof sum).toEqual('function')
  })

})