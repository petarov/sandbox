/**
 * Test 02
 */
var fs = require('fs');

var Person = function(Name, Vorname) {
    this.name = Name || 'Default';
    this.vorname = Vorname || 'Default'
    this.getId = function() {
        return 123;
    };
};

var Customer = function(Name, Vorname) {
    // var args = Array.prototype.slice.call(arguments, 0);
    // console.log(args);
    console.log('--- List Customer props ---');
    for (var i in this) {
        console.log(i);
    }
    console.log('----------------------------');
    // console.log(Customer.prototype.constructor.toString());
    // console.log(this.constructor.toString());
    
    // call the constructor with arguments passed
    // this.constructor.call(this, Name, Vorname);

    // only difference with call, is that the arguments will be directly applied
    // whereas call excepts you to set arguments explicitly
    this.constructor.apply(this, arguments);
};

Customer.prototype = new Person();
// It does not matter whehter you explicitly specify constructor
// It will point to Person, anyway.
// Customer.prototype.constructor = Person;
Customer.prototype.show = function() {
    return this.name + ' ' + this.vorname + ' ' + this.getId();
};

var customer = new Customer('Petrov', 'Petar');

console.log(customer.show());
console.log(customer instanceof Person);
console.log(customer instanceof Customer)