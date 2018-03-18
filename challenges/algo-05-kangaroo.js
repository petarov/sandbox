/**
 * https://www.hackerrank.com/challenges/kangaroo
 * 
 * There are two kangaroos on a number line ready to jump in the positive 
 * direction (i.e, toward positive infinity). The first kangaroo starts at 
 * location x1 and moves at a rate of v1 meters per jump. The second kangaroo 
 * starts at location x2 and moves at a rate of v2 meters per jump. Given the 
 * starting locations and movement rates for each kangaroo, can you determine 
 * if they'll ever land at the same location at the same time?
 * 
 * Input Format
 * 
 * A single line of four space-separated integers denoting the respective 
 * values of x1, v1, x2, and v2.
 * 
 * Output Format
 * 
 * Print YES if they can land on the same location at the same time; otherwise, 
 * print NO. 
 * 
 * Note: The two kangaroos must land at the same location after making the same 
 * number of jumps.
 * 
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

function kangaroo(x1, v1, x2, v2) {
    const MAX = 99999999;
    while (x1 <= MAX && x2 <= MAX) {
        if (x1 === x2) {
            return 'YES';
        }
        x1 += v1;
        x2 += v2;
    }
    return 'NO';
}

function main() {
    var x1_temp = readLine().split(' ');
    var x1 = parseInt(x1_temp[0]);
    var v1 = parseInt(x1_temp[1]);
    var x2 = parseInt(x1_temp[2]);
    var v2 = parseInt(x1_temp[3]);
    process.stdout.write("" + kangaroo(x1, v1, x2, v2) + "\n");
}