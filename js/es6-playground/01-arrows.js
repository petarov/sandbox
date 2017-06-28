// 01 - Arrows are a function shorthand using the => syntax.
var numbers = [8, 13, 18, 2, 23, 44];

console.log(' --- TIRAZH 1 ---');
numbers.forEach(n => console.log(n));

console.log(' --- TIRAZH 1 - CHETNI ---');
numbers.forEach(n => {
  if (n % 2 === 0) {
    console.log(n);
  }
});

console.log(' --- TIRAZH 1 - NECHETNI ---');

var nn = numbers.map(n => {
  return n % 2 !== 0 ? n : null;
});
nn.forEach(n => n ? console.log(n) : '');

// eof