/**
 * https://www.hackerrank.com/challenges/two-characters/problem
 * 
 * String t always consists of two distinct alternating characters. 
 * For example, if string t's two distinct characters are x and y, then t could 
 * be xyxyx or yxyxy but not xxyy or xyyx.
 * 
 * You can convert some string s to string t by deleting characters from s. 
 * When you delete a character from s, you must delete all occurrences of it in s. 
 * For example, if s = abaacdabd and you delete the character a, then the string 
 * becomes bcdbd.
 * 
 * Given s, convert it to the longest possible string t. Then print the length 
 * of string t on a new line; if no string t can be formed from s, print 0 instead.
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

function removeBut(s, a, b) {
    let result = '';
    for (let i = 0; i < s.length; i++) {
        if (s.charAt(i) === a || s.charAt(i) === b) {
            result += s.charAt(i);
        }
    }
    
    return result;
}

/////////////// ignore above this line ////////////////////

function solution1(n, s) {
    let prev = '';
    let chars = '', removed = '';
    
    // beabeefeabzf
    for (let i = 0; i < n; i++) {
        let c = s[i];
        if (chars.indexOf(c) < 0 && removed.indexOf(c) < 0) {
            chars += c;
        }
        
        if (prev === s[i]) {
            chars = chars.replace(c, '');
            removed += c;
        }
        
        prev = c;
    }
    
    let best = 0;
    
    for (let i = 0; i < chars.length - 1; i++) {
        for (let j = i + 1; j < chars.length; j++) {
            let r = removeBut(s, chars.charAt(i), chars.charAt(j));
            
            let pattern = true;
            for (let k = 0; k < r.length - 1; k++) {
                if (r.charAt(k) === r.charAt(k + 1)) {
                    pattern = false;
                    break;
                }
            }
            
            if (pattern && r.length > best) {
                best = r.length;
            }
        }
    }
   
    return best;
}

function main() {
    var n = parseInt(readLine());
    var s = readLine();
    var result = solution1(n, s);
    process.stdout.write(""+result+"\n");
}
