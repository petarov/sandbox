/**
 * 
 * https://www.hackerrank.com/challenges/grading
 * HackerLand University has the following grading policy:
 * 
 * Every student receives a  in the inclusive range from  to .
 * Any  less than  is a failing grade.
 * Sam is a professor at the university and likes to round each student's  according to these rules:
 * 
 * If the difference between the  and the next multiple of  is less than , round  up to the next multiple of 
 * If the value of  is less than , no rounding occurs as the result will still be a failing grade
 * For example,  will be rounded to  but  will not be rounded because the rounding would result in a number that is less than .
 * 
 *  Given the initial value of  for each of Sam's  students, write code to automate the rounding process. For each , round it according to the rules above and print the result on a new line.
 * 
 * Input Format
 * 
 *   The first line contains a single integer denoting  (the number of students).
 *   Each line  of the  subsequent lines contains a single integer, , denoting student 's grade.
 * 
 * Constraints
 * 
 *   1 <= n <= 60
 *   0 <= grade(i) <= 100
 * 
 * Output Format
 * 
 * For each grade(i) of the n grades, print the rounded grade on a new line.
**/

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

function solve(grades){
    let result = [];

    for (const grade of grades) {
        let what = grade;
        
        if (grade >= 38) {
            for (let i = grade; i <= 100; i++) {
                if (i % 5 === 0) {
                    let sub = i - grade;
                    if (sub === 3) {
                        what = grade;
                    } else if (sub < 3) {
                        what = i;
                    }
                    break;
                }
            }
        }
        
        result.push(what);
    }
    
    return result;
}

function main() {
    var n = parseInt(readLine());
    var grades = [];
    for(var grades_i = 0; grades_i < n; grades_i++){
       grades[grades_i] = parseInt(readLine());
    }
    var result = solve(grades);
    console.log(result.join("\n"));
}