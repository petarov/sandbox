// 03 - Object literals are extended to support setting the prototype at 
// construction, shorthand for foo: foo assignments, defining methods, 
// making super calls, and computing property names with expressions. 

var bag = {
  section1 : 'empty' ,
  fold: () => {
    return 'bag is folded';
  },
  7: 'hallo 7 cheeses',

  toString() {
    return 'this bad is not empty';
  }
}

console.log(bag.section1);
console.log(bag.fold());
console.log(bag[7]);
console.log(bag);

var a = { 'section0' };
console.log(a);

// eof