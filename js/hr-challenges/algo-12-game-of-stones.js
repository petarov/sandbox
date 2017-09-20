/**
 * https://www.hackerrank.com/challenges/game-of-stones-1/problem
 * 
 * Two players (numbered 1 and 2) are playing a game with n stones. Player 1
 * always plays first, and the two players move in alternating turns. 
 * The game's rules are as follows:
 * 
 * - In a single move, a player can remove either 2, 3, or 5 stones from the 
 * game board.
 * - If a player is unable to make a move, that player loses the game.
 * 
 * Given the number of stones, find and print the name of the winner 
 * (i.e., First or Second) on a new line. Each player plays optimally, meaning 
 * they will not make a move that causes them to lose the game if some better, 
 * winning move exists.
 */
function solve2(n) {
  // 7 stones => Player 1 wins in all cases except the first and last one
  return n % 7 >= 2;
}

function solve1(n, firstTurn) {
  while (true) {
      if (n >= 5 && solve(n - 5, !firstTurn) === firstTurn) {
          n -= 5;
      } else if (n >= 3 && solve(n - 3, !firstTurn) === firstTurn) {
          n -= 3;
      } else {
          n -= 2;
      }

      if (n < 0) {
          firstTurn = !firstTurn;
          break;
      } else if (n < 2) {
          break;
      }
  
      firstTurn = !firstTurn;
  }

  return firstTurn;
}

function main() {
  let T = parseInt(readLine());
  for (let i = 0; i < T; i++) {
      let n = parseInt(readLine());
      //console.log(solve1(n, true) ? 'First' : 'Second');
      console.log(solve2(n) ? 'First' : 'Second');
  }
}

/////////////////////////////////////////

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