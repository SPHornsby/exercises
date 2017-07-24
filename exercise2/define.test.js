
const define = require('./define')
global.functions = {}
describe('Test Define function', function() {
  it('should define a globally defined function', function() {
    define('sum', (a, b) => a + b)
    expect(typeof global.functions['sum']).toEqual('function')
  })
})