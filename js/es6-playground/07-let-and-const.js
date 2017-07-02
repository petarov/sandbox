// 07 - Block-scoped binding constructs. let is the new var. 
// const is single-assignment.

function test() {
  let x = 1;
  {
    let x = 50;
    console.log(`MONEZ1: ${x}`);
  }

  console.log(`MONEZ2: ${x}`);
}
test();

const arr1 = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
let fibSum = 0;

for (let x of arr1) {
  fibSum += x;

  let a = () => {
    const x = 1;
    console.log(x);
  };
  a();
}
console.log(`FIB SUM = ${fibSum}`);

// eof