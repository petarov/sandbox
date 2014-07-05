/**
 * Test 06 - Arguments
 */

var foo = function() {
  // first argument is our callback function
  var callback = arguments[0];
  // slice first argument out
  // Note: 'arguments' isn't really a javascript Array ...at least not in ECMA <= 6 :)
  var args = Array.prototype.slice.call(arguments, 1);
  callback instanceof Function && callback(args);
};

foo(function(args) {
  console.log('Sliced arguments:', args);
}, 'Arg1', 'Arg2', 'Arg3', 'Arg4');
