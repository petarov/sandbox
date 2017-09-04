/**
 * https://www.hackerrank.com/challenges/mini-max-sum
 * 
 * Given five positive integers, find the minimum and maximum values that can be 
 * calculated by summing exactly four of the five integers. Then print the 
 * respective minimum and maximum values as a single line of two space-separated 
 * long integers.
 * 
 * Input Format
 * 
 * A single line of five space-separated integers.
 * 
 * Constraints
 * 
 * Each integer is in the inclusive range [1, 10^9]
 * 
 * Output Format
 * 
 * Print two space-separated long integers denoting the respective minimum and 
 * maximum values that can be calculated by summing exactly four of the five 
 * integers. (The output can be greater than 32 bit integer.)
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

function main() {
    let arr = readLine().split(' ');
    arr = arr.map(Number);
    
    // O(n log(n))
    // Merge sort or Quick sort?
    arr.sort();

    let a = 0, b = 0;
    
    // O(n)
    for (let i = 0; i < 4; i++) {
        a += arr[i];
        b += arr[4 - i];
    }
    
    // another version using reduce()
    // let a = Array.from(arr).splice(0, 4).reduce(function(sum, value) {
    //    return sum + value; 
    // }, 0);
    // let b = Array.from(arr).splice(1, 4).reduce(function(sum, value) {
    //    return sum + value; 
    // }, 0);   
    
    console.log(a, b)
}