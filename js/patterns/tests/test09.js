/**
 * Test 09 - Async Flow Control
 */

var Flow = function() {
  // *hack* to convert arguments to Array
  this.args = Array.prototype.slice.call(arguments);
  // bind next to 'this' scope
  var next = function() {
    if (this.args.length > 0) {
      this.args.shift();
      this.args[0].apply(next, Array.prototype.slice.call(arguments));
    }
  }.bind(this);
  // call first passed fn with 'next' as parameter
  this.args[0].apply(next);
};

var async1 = function(error, data, callback) {
  callback(null, data + ' async1');
};

var stepInto = function() {
  this(null, 'd1');
};
var doIt = function(error, data) {
  async1(error, data, this);
};
var nextDoIt = function(error, data) {
  var transformed = data + '_' + data;
  async1(error, transformed, this);
};
var done = function(error, data) {
  console.log(data);
};

new Flow(stepInto, doIt, nextDoIt, done);

// utility lib - https://github.com/caolan/async