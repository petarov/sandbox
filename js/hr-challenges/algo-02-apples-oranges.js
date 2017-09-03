/**
 * https://www.hackerrank.com/challenges/apple-and-orange
 * 
 * Sam's house has an apple tree and an orange tree that yield an abundance of 
 * fruit. In the diagram below, the red region denotes his house, where (s) is the 
 * start point and (t) is the end point. The apple tree is to the left of his house, 
 * and the orange tree is to its right. You can assume the trees are located on 
 * a single point, where the apple tree is at point (a) and the orange tree is 
 * at point (b).
 * 
 * Input Format
 * 
 * The first line contains two space-separated integers denoting the respective values of s and t .
 * The second line contains two space-separated integers denoting the respective values of a and b.
 * The third line contains two space-separated integers denoting the respective values of m and n.
 * The fourth line contains  space-separated integers denoting the respective distances that each apple falls from point a.
 * The fifth line contains  space-separated integers denoting the respective distances that each orange falls from point b.
 * 
 * Constraints
 * 
 *   1 <= s,t,a,b,m,n <= 10^5
 *   -10^5 <= d <= 10^5
 *   a < s < t < b
 * 
 * Output Format
 *   
 * Print two lines of output:
 *   On the first line, print the number of apples that fall on Sam's house.
 *   On the second line, print the number of oranges that fall on Sam's house.
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

function main() {
    var s_temp = readLine().split(' ');
    var s = parseInt(s_temp[0]);
    var t = parseInt(s_temp[1]);
    var a_temp = readLine().split(' ');
    var a = parseInt(a_temp[0]);
    var b = parseInt(a_temp[1]);
    var m_temp = readLine().split(' ');
    var m = parseInt(m_temp[0]);
    var n = parseInt(m_temp[1]);
    apple = readLine().split(' ');
    apple = apple.map(Number);
    orange = readLine().split(' ');
    orange = orange.map(Number);
    
    let apples = 0;
    for (const next of apple) {
        let offset = a + next;
        if (offset >= s && offset <= t) {
            apples +=1;
        }
    }
    
    let oranges = 0;
    for (const next of orange) {
        let offset = b + next;
        if (offset >= s && offset <= t) {
            oranges +=1;
        }
    }
    
    console.log(apples);
    console.log(oranges);
}
