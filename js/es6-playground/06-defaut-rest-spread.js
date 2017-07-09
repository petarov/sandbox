// 06 - Callee-evaluated default parameter values.

// Default params

function mul(a, b = 100) {
  return a * b;
}
console.log("MUL: ", mul(5));

function sum(a, b = getSum()) {
  return a + b;
}
var getSum = () => 100;
console.log("SUM: ", sum(5));

// Rest parameters

function rest1(x, ...y) {
  return x + y.length;
}
console.log(`REST1 = ${rest1(10, 1, 2, 3)}`);

function rest2(...[a, b, c]) {
  return a + b + c;
}
console.log(`REST2 = ${rest2(1, 2, 3)}`);

// Spread

let arr1 = [2, 4, 6];
console.log(`SPREAD1 = ${rest1(1, ...arr1)}`);
console.log(`SPREAD2 = ${rest2(1, ...arr1)}`);

// copy

let arr3 = [3, ...arr1];
arr3.forEach((v) => console.log(`ARR3: ${v}`));


// eof
