// 10 - Language-level support for modules for component definition.
const Math = require('./10-1-math').Math;
const Vector = require('./10-1-math').Vector;

console.log(`SUM: ${Math.sum(10, 2)}`);
console.log(`DIST: ${Math.dist(892, 50, 932, 72)}`);

// vectors
let v1 = new Vector(10, 5, -2);
console.log(`V1: ${v1.x} ${v1.y} ${v1.z}`);
console.log(`V1 MAG: ${v1.magnitude()}`);
v1.normalize();
console.log(`V1 NORM: ${v1.x} ${v1.y} ${v1.z}`);

let v2 = new Vector(99, 73, -51);
console.log(`V2: ${v2.x} ${v2.y} ${v2.z}`);
console.log(`V2 MAG: ${v2.magnitude()}`);
v2.normalize();
console.log(`V2 NORM: ${v2.x} ${v2.y} ${v2.z}`);

// eof
