
const define = require('./define')
const requireSH = require('./require')

define('sum', (a, b) => a + b)
const sumResult = requireSH('sum')(2, 2) // 4

define('product', (a,b) => a * b)
const productResult =  requireSH('product')(33,66) // 2178

define('capitalize', (string) => {
  if (typeof string !== 'string') return null
  return string[0].toUpperCase() + string.substring(1)
})
const capitalized = requireSH('capitalize')('lower') // 'Lower'

console.log(sumResult)
console.log(productResult)
console.log(capitalized)
