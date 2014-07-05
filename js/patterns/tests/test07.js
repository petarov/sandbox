/**
 * Test 07 - Lists filter
 */

var list = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// find even and odd numbers
var odd = list.filter(function(item) {
  return (item % 2) === 1;  
});
var even = list.filter(function(item) {
  return (item % 2) !== 1;  
});

console.log(odd);
console.log(even);

// multiplication of odd numers by 2
var calc = odd.map(function(item) {
  return item * 2;
});
console.log(calc);

var sum = calc.reduce(function(state, next) {
  return state += next;
}, 10); // 10 is initial value
console.log(sum);

// find odd numbers and multiply in 1 pass
// via func calls
var oddfn = function(item) {
  return (item % 2) === 1;  
};
var mulfn = function(item) {
  return (item * 2);  
};
var result = list.filter(oddfn).map(mulfn);
console.log(result);