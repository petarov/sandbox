/**
 * Test 04
 */
var fs = require('fs')
  , Person = require('./person');


var p1 = Person('Max');
console.log(p1, p1.name());

p1.name('Richie B.');
console.log(p1, p1.name());