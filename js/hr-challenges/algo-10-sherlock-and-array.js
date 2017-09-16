/**
 * Watson gives Sherlock an array A of length n. Then he asks him to determine 
 * if there exists an element in the array such that the sum of the elements on 
 * its left is equal to the sum of the elements on its right. If there are no 
 * elements to the left/right, then the sum is considered to be zero. 
 * 
 * Formally, find an i, such that, A0 + A1 + ... Ai-1 = Ai + 1 + Ai + 2 +...+ An-1.
 * 
 * Input Format
 * 
 * The first line contains T, the number of test cases. For each test case, 
 * the first line contains n, the number of elements in the array . 
 * The second line for each test case contains n space-separated integers, 
 * denoting the array A.
 */
process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();    
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////
function solve1(a) {
  // O(n*n)
  for (let i = 0; i < a.length; i++) {
    let left = 0;
    for (let j = 0; j < i; j++) {
      left += a[j];
    }

    let right = 0;
    for (let k = i + 1; k < a.length; k++) {
      right += a[k];
    }
    
    if (left === right) {
      return 'YES';
    }
  }

  return 'NO';
}

function solve2(a, map) {
  let sum = a[a.length - 1];
  
  // O(n)
  for (let i = a.length - 2; i >= 0; i--) {        
    if (map.get(i) === sum) {
        return 'YES';
    }
    sum += a[i];
  }  

  return 'NO';
}

function main() {    
  let T = parseInt(readLine());
  
  for(var a0 = 0; a0 < T; a0++){
    var n = parseInt(readLine());
    a = readLine().split(' ');
    
    if (n === 1) {
      // https://www.hackerrank.com/challenges/sherlock-and-array/forum/comments/82083
      result = 'YES';
    } else if (n < 3) {
      result = 'NO';
    } else {
      let sumToLeft = 0;
      let map = new Map();
      a = a.map((num, i) => {
          map.set(i, sumToLeft);
          num = Number(num);
          sumToLeft += num;
          return num;
      });
      result = solve2(a, map);
    }
    
    process.stdout.write(""+ result +"\n");
  }
}
