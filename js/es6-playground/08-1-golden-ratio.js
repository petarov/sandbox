// es6 generators example
// "The Goden Ration" (phi) approximation using fibonacci numbers

const MAX_APPROX = 100;

function* fib(x, y) {
  for (let i = 0; i < MAX_APPROX; i++) {
    [x, y] = [y, x + y];
    yield y;
  }
};

let prev = 1;
for (let n of fib(0, 1)) {
  if (prev > 1) {
    phi = n / parseFloat(prev);
    console.log(`PHI = ${phi}  [ITER ${n}]`);
  }
  prev = n;
}
