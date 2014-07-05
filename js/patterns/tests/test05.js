/**
 * Test 05 - Closure
 */

var Person = require('./person');

var person = Person('Test');

(function() {
  //  called
  console.log('Called 01');
})();

(function(p) {
  console.log('Called 02');
  console.log(p.name());
})(person);

