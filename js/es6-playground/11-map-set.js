// 11 - Efficient data structures for common algorithms. 
// WeakMaps provides leak-free object-key’d side tables.

// -- Sets ------

let set1 = new Set();
set1.add('hello moto');
set1.add('moto2').add('moto3');
console.log(`SET1 SIZE: ${set1.size}`);
console.log(`SET1 MOTO: ${set1.has('moto2')}`);
for (const next of set1) {
  console.log(`SET1: ${next}`);
}

// -- Maps ------

let map1 = new Map();
map1.set(42, 'hitchhiker');
map1.set('moto2', 'its a phone').set(56.0, 'maaario');
console.log(`MAP1 SIZE: ${map1.size}`);
console.log(`MAP1 HAS: ${map1.has(42)}`);
for (const [k, v] of map1) {
  console.log(`MAP1: ${k} = ${v}`);
}
map1.forEach((v, k) => {
  console.log(`FOREACH: ${k} = ${v}`);
});

let arr2 = [['key1', 10], ['key2', 20], ['k3y', 30]];
let map2 = new Map(arr2);
map2.forEach((v, k) => {
  console.log(`FOREACH-2: ${k} = ${v}`);
});
console.log(Array.from(map2));

// -- Weak ------

let o1 = { test : 'test' }, o2 = { they: true };
let wmap1 = new WeakMap();
wmap1.set(o1, '10');
wmap1.set(o2, 'test');

console.log(`WMAP1-1: ${wmap1.has(o1)}`);
console.log(`WMAP1-2: ${wmap1.has(o2)}`);
wmap1.delete(o1);
console.log(`WMAP1-1: ${wmap1.has(o1)}`);

// eof
