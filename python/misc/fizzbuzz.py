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

def no_if(mapping):
    ## TODO find a way to kill all conditions

    print ('--- NO IF #1 -----')

    def getmod(x, m):
        return x % m + m

    def mapmod(x):
        for k, v in mapping.items(): 
            yield mapping.get(getmod(x, k), x)
            
    #results = map(lambda x: getmod(x), range(0, MAX))
    #results = map(lambda x: mapmod(x), range(1, MAX))
    for x in range(1, MAX):
        for p in mapmod(x):
            print (p)

    #print (*results, sep='\n')
    print ('--------------------------')

### Main ###
if __name__ == "__main__":
    simple()
    parametrized({3: 'Fizz', 5: 'Buzz'})
    no_if({3: 'Fizz', 5: 'Buzz'})
