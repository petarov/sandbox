// Module Primes
// 

var max = 42;

function fak(n) {
    if (n > 1)
        return n * fak(n- 1);
    return 1;
}

function isPrime(n) {
    if (n < 2) {
        return false;
    } else if (n == 2 || n == 3) {
        return true;
    } else if (n % 2 == 0 || n % 3 == 0) {
        return false;
    }
    var m = Math.sqrt(n);
    for (var i = 5; i <= m; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) {
            return false;
        }
    }
    return true;
}

/**
 * Odd primes
 * Of the form 2n − 1.
 */
var OddPrimes = function(limit) {
    console.log('--- Using Odd primes --- ', limit);
    for (var n = 1; n <= limit; n++) {
        if (isPrime(n)) {
            console.log('%d is likely a prime!', n);
        }
    }
}

// Fermat's Little Theorem
// Technically, Fermat's test is a test for compositeness, rather than for 
// primeness. This is because, if the test fails, the number is certainly 
// composite, but if the test passes, the number is very likely prime, but 
// might possibly be a composite pseudoprime.
var Fermat = function(limit) {
    console.log('--- Using Fermat\'s Little Theorem --- ');
    for (var n = 1; n <= limit; n++) {
        var m = Math.pow(2, n - 1) - 1;
        if (m % n == 0) {
            console.log('%d is likely a prime!', n);
        }
    }
}

console.log('--- Prime numbers from 3 to %d --- ', max);
OddPrimes(max);
console.log('--------------------------------------');
Fermat(max);
console.log('--------------------------------------');
