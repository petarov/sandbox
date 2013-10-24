// Module Export

// Sometimes you don’t just want to use globals, but you want to declare them. We can easily do this by exporting them, 
// using the anonymous function’s return value. Doing so will complete the basic module pattern, so here’s a complete 
// example:


var MODULE = (function () {
    var my = {},
        privateVariable = 1;

    function privateMethod() {
        // ...
    }

    my.moduleProperty = 1;
    my.moduleMethod = function () {
        // ...
    };

    return my;
}());

console.log(__filename);
console.log(MODULE.moduleProperty);

module.exports = MODULE;