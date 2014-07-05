/**
 * Test 04 - Person
 */

var Person = function(name) {
  var self = this;
  self.name = name;
  return {
      // getter/setter
      name: function(n) {
        if (typeof n === 'string') {
          self.name = n;
        }
        return self.name;
      }
    };
};

/*
  Export
*/
module.exports = Person;