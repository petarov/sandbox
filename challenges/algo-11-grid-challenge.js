/**
 * https://www.hackerrank.com/challenges/grid-challenge/problem
 * 
 * Given a squared sized grid G of size N in which each cell has a lowercase 
 * letter. Denote the character in the i-th row and in the j-th column as G[i][j].
 * 
 * You can perform one operation as many times as you like: 
 * Swap two column adjacent characters in the same row G[i][j] and G[i][j + 1] 
 * for all valid i, j.
 * 
 * Is it possible to rearrange the grid such that the following condition is true?
 * 
 * 1) G[i][1] <= G[i][2] <= ... G[i][N] for 1 <= i <= N
 * 2) G[1][j] <= G[2][j] <= ... G[N][j] for 1 <= j <= N
 * 
 * In other words, is it possible to rearrange the grid such that every row and 
 * every column is lexicographically sorted?
 */
function solve1(grid, N) {
  for (let j = 0; j < N; j++) {
      let sorted = false;
      
      while (!sorted) {
          sorted = true;
          for (let i = 0; i < N - 1; i++) {
              if (grid[j][i] > grid[j][i + 1]) {
                  sorted = false;
                  [grid[j][i], grid[j][i + 1]] = [grid[j][i + 1], grid[j][i]];
              }
          }
      }
      
      if (j > 0) {
          for (let i = 0; i < N; i++) {
              if (grid[j][i] < grid[j - 1][i]) {
                  return 'NO';
              }
          }
      }
  }
  
  return 'YES';
}

function main() {
  let T = parseInt(readLine());
  for (let t0 = 0; t0 < T; t0++) {
      let grid = [];
      let N = parseInt(readLine());
      for (let j = 0; j < N; j++) {
          let row = readLine().split('');
          row = row.map((c) => {
             return c.charCodeAt(0); 
          });
          grid.push(row);
      }
      console.log(solve1(grid, N));
  }
} 

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
