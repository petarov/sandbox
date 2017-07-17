// 08 - Iterator objects enable custom iteration like CLR IEnumerable or Java
// Iterable. Generalize for..in to custom iterator-based iteration with for..of

// Iterators

var iterable1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
for (const i of iterable1) {
  console.log(`ARR: ${i}`);
}

var iterable2 = 'My-new-pants';
for (const ch of iterable2) {
  console.log(`ARR2: ${ch}`);
}

let iterable3 = new Map([['a', 1], ['b', 2], ['c', 3]]);
for (const entry of iterable3) {
  console.log(`ARR3: ${entry}`);
}

// Generators 1

function* fibonaci() {
  let [x, y] = [0, 1];
  while (true) {
    [x, y] = [y, x + y];

    // once the generator returns, it will not yield anything anymore    
    // if (y > 50)
    //   break;

    yield y;
  }
}

for (let n of fibonaci()) {
  console.log(`FIB: ${n}`);
  if (n > 100)
    break;
}


// Generators 2

function* trigo() {
  let phi = 0;

  while (true) {
    let x = Math.sin(phi);
    phi += 5.0 * 0.0174533;

    yield x;
  }
}

for (let z of trigo()) {
  console.log(`PHI: ${z}`);
  if (z > 0.9) {
    break;
  }
}


// eof 
