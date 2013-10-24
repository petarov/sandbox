// Augmentation

// One limitation of the module pattern so far is that the entire module must be
// in one file. Anyone who has worked in a large code-base understands the value
// of splitting among multiple files. Luckily, we have a nice solution to augment
// modules. First, we import the module, then we add properties, then we export
// it. Here’s an example, augmenting our MODULE from above:

var MODULE = require('./module.js');

var MODULE = (function (my) {
	my.anotherMethod = function () {
		// added method...
	};

	return my;
}(MODULE || {}));

console.log(__filename);
console.log(MODULE.moduleProperty);

module.exports = MODULE;

// We use the var keyword again for consistency, even though it’s not necessary.
// After this code has run, our module will have gained a new public method named
// MODULE.anotherMethod. This augmentation file will also maintain its own
// private internal state and imports.
