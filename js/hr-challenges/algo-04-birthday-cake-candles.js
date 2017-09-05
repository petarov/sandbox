/**
 * https://www.hackerrank.com/challenges/birthday-cake-candles
 * 
 * Colleen is turning (n) years old! Therefore, she has (n) candles of various 
 * heights on her cake, and candle (i) has height (height i) . Because the taller 
 * candles tower over the shorter ones, Colleen can only blow out the tallest candles.
 * Given the (height) for each individual candle, find and print the number of 
 * candles she can successfully blow out.
 * 
 * Output Format
 * 
 * Print the number of candles Colleen blows out on a new line.
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

function birthdayCakeCandles(n, arr) {
    let max = 0, count = 0;
    
    // O(n)
    for (let i = 0; i < n; i++) {
        if (arr[i] > max) {
            count = 1;
            max = arr[i];
        } else if (arr[i] == max) {
            count += 1;
        }
    }
    
    return count;
}

function main() {
    var n = parseInt(readLine());
    arr = readLine().split(' ');
    arr = arr.map(Number);
    var result = birthdayCakeCandles(n, arr);
    process.stdout.write("" + result + "\n");
}
