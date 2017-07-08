// 15 - Symbols are a new primitive type. Symbols enable access control for 
// object state. Symbols allow properties to be keyed by either string 
// (as in ES5) or symbol.

let key1 = Symbol('key');
let key2 = Symbol('key');
let key3 = Symbol.for('key3');

console.log(`S1: ${key1.toString()}`);
console.log(`S2: ${key2.toString()}`);
console.log(`S1 == S2: ${key1 === key2}`);
console.log(`S1-Type: ${typeof key1}`);

console.log(`SYMBOL: ${Symbol.keyFor(key3)}`);

// eof