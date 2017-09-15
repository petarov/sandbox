/**
 * https://www.hackerrank.com/challenges/camelcase/problem
 * 
 * Alice wrote a sequence of words in CamelCase as a string of letters, s, 
 * having the following properties:
 * 
 * 1) It is a concatenation of one or more words consisting of English letters.
 * 2) All letters in the first word are lowercase.
 * 3) For each of the subsequent words, the first letter is uppercase and rest of the letters are lowercase.
 * 
 * Given s, print the number of words in s on a new line.
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
    var s = readLine();
    let words = 1;

    for (let i = 0; i < s.length; i++) {
        const c = s.charCodeAt(i);
        words += c > 64 && c < 91 ? 1 : 0;
    }

    console.log(words);
}
