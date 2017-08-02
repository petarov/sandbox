#!/usr/bin/env python
# pylint: disable=C0111
# pylint: disable=C0103
# pylint: disable=C0330

MAX = 31

def simple():
    print ('--- SIMPLE -----')
    for i in range(1, MAX):
        output = ''
        if i % 3 == 0:
            output += 'Fizz'
        if i % 5 == 0:
            output += 'Buzz'
        if not output:
            output += str(i)

        print(output)

    print ('--------------------------')

def parametrized(mapping):
    print ('--- PARAMETRIZED -----')
    for i in range(1, MAX):
        output = ''

        for k, v in mapping.items():
            if i % k == 0:
                output += v

        print(output or str(i))

    print ('--------------------------')

def no_if(numbers, mapping):
    print ('--- NO IF -----')

    def getmod(x, m):
        return x % m + ((m * 2) + 1)

    def mapmod(x):
        for n in numbers: 
            yield mapping.get(getmod(x, n), x)
            
    for x in range(1, MAX):
        o = {}
        for p in mapmod(x):
            o[p] = str(p)
        print (*o)

    print ('--------------------------')

### Main ###
if __name__ == "__main__":
    simple()
    parametrized({3: 'Fizz', 5: 'Buzz'})
    no_if([3, 5], {7: 'Fizz', 11: 'Buzz'})
