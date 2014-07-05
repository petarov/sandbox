/**
 * Test 03
 */
var fs = require('fs');

/*
  New implicitly created object that uses
  private vars to initialize its properties
*/
var Person = function(name) {
  var vorname = name || 'Default';

  return {
    'vorname': vorname,
    name: function() {
      return vorname + '_' + vorname;
    }
  };
};

/*
  New object by copying only a set
  of required properties from parent
*/
var Employee = function(name) {
  var p = Person(name);
  return {
    'vorname': p.vorname,
    name: function() {
      return 'There isn\'t any!';
    }
  };
};

/*
  New object by copying all public properties
  from parent object
*/
var Customer = function(name) {
  var obj = {}; // new empty object
  var p = Person(name);
  for(var i in p) {
    // console.log(i);
    obj[i] = p[i];
  }
  return obj;
};

var p1 = Person();
console.log(p1, p1.name());

var p2 = Person('Texas');
console.log(p2, p2.name());

var e1 = Employee('Elon');
console.log(e1, e1.name());

var c1 = Customer('Customer');
console.log(c1, c1.name());


