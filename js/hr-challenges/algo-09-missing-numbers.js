/**
 * https://www.hackerrank.com/challenges/missing-numbers/problem
 * 
 * Numeros, the Artist, had two lists A and B, such that B was a 
 * permutation of A. Numeros was very proud of these lists. Unfortunately, 
 * while transporting them from one exhibition to another, some numbers were 
 * left out of A. Can you find the missing numbers?
 * 
 * Notes
 * 
 *  - If a number occurs multiple times in the lists, you must ensure that the 
 * frequency of that number in both lists is the same. If that is not the case, 
 * then it is also a missing number.
 * - You have to print all the missing numbers in ascending order.
 * - Print each missing number once, even if it is missing multiple times.
 * - The difference between maximum and minimum number in B is less than or 
 * equal to 100.
 * 
 */
let readline = require('readline');

/**
 * Solution using direct hash map manipulation and sorting. - O(n) + O(nlogn)
 * 
 * @param {*} a 
 * @param {*} b 
 */
function solve1(a, b) {
  // O(n)
  for (const [k, v] of b) {
      if (!a.has(k) || v === a.get(k)) {
          b.delete(k);
      }
  }
  
  // O(nlogn)
  let results = Array.from(b.keys());
  results.sort();
  return results.join(' ');
}

/**
 * Solution using array caching. - O(n)
 * 
 * @param {*} a 
 * @param {*} b 
 */
function solve2(a, b) {
  let results = [];
  for (let i = minB; i < maxB; i++) {
      results[i - minB] = 0;
  }

  // O(n)
  for (const [k, v] of b) {
      if (a.has(k) && v !== a.get(k)) {
          const n = Number(k);
          results[n - minB] = n;
      }
  }
  
  var out = '';
  results.forEach((n) => {
     out += n !== 0 ? n + ' ' : ''; 
  });
  return out;
}

let next = 0;
let a = new Map(), b = new Map();
let minB = 10001, maxB = 0;

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  if (next == 0) {
      parseInt(line);
  } else if (next == 1) {
      let arr = line.split(' ');
      arr.forEach((n) => {
          a.set(n, a.has(n) ? a.get(n) + 1 : 1);
      });
  } else if (next == 2) {
      parseInt(line);
  } else if (next == 3) {
      let arr = line.split(' ');
      arr.forEach((n) => {
          minB = Math.min(n, minB);
          maxB = Math.max(n, maxB);
          b.set(n, b.has(n) ? b.get(n) + 1 : 1);
      });
  }
  next++;
});

rl.on('close', function() {
  process.stdout.write("" + solve2(a, b) + "\n");
});

