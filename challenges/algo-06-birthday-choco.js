/**
 * https://www.hackerrank.com/challenges/the-birthday-bar/problem
 * 
 * Lily has a chocolate bar consisting of a row of n squares where each square 
 * has an integer written on it. She wants to share it with Ron for his birthday, 
 * which falls on month m and day d. Lily wants to give Ron a piece of chocolate 
 * only if it contains  consecutive squares whose integers sum to d.
 * 
 * Given m, d, and the sequence of integers written on each square of Lily's 
 * chocolate bar, how many different ways can Lily break off a piece of 
 * chocolate to give to Ron?
 * 
 * For example, if m = 2, d = 3 and the chocolate bar contains n rows of squares 
 * with the integers [1, 2, 1, 3, 2] written on them from left to right, the 
 * following diagram shows two ways to break off a piece:
 * 
 * Output Format
 * 
 * Print an integer denoting the total number of ways that Lily can give a 
 * piece of chocolate to Ron.
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

function solve1(n, arr, d, m){
    let result = 0;
    
    // O(nm) or O(n^2)
    for (let i = 0; i < n; i++) {
        let sum = arr[i];
        
        for (let j = i + 1; j < i + m; j++) {
            sum += arr[j];
        }
        
        result += sum === d ? 1 : 0;
    }
    
    return result;
}

function solve2(n, arr, d, m){
    let result = 0, 
        i = 0, 
        last_idx = -1, 
        sum = 0;
    
    // O(n)
    while (i < n) {     
        if (arr[i] === d && m === 1) {
            result += 1;
        } else if (arr[i] < d) {
            if (last_idx === -1) {
                last_idx = i;
            }
            
            sum += arr[i];
            
            if (sum === d && i-last_idx == m-1) {
                result += 1;
                sum = 0;
                i = last_idx;
                last_idx = -1;
            } else if (sum > d) {
                sum = 0;
                i = last_idx;
                last_idx = -1;
            }
        }
        
        // if (last_idx !== -1 && i - last_idx >= m) {
        //     sum = 0;
        //     i = last_idx;
        //     last_idx = -1;
        // }
        
        i++;
    }
    
    return result;
}

function main() {
    var n = parseInt(readLine());
    s = readLine().split(' ');
    s = s.map(Number);
    var d_temp = readLine().split(' ');
    var d = parseInt(d_temp[0]);
    var m = parseInt(d_temp[1]);
    var result = solve2(n, s, d, m);
    process.stdout.write(""+result+"\n");
}
