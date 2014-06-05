/**
 * Stack Tests
 * https://github.com/petarov/
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <assert.h>
#include "stack.h"

void quit(char *msg) {
    perror(msg);
    exit(EXIT_FAILURE);
}

void test_int(int value) {
    printf("Testing int = %d\n", value);

    char *p = malloc(sizeof(int));
    *((int *) p) = value;

    stack_t *s = stack_new();
    stack_push(s, p);
    
    int *res = (int *)stack_pop(s);
    assert(*res == value);

    free(p);
    stack_free(s);
}

void test_str(char *value) {
    printf("Testing string = %s\n", value);

    stack_t *s = stack_new();
    stack_push(s, value);
    
    char *res = (char *)stack_pop(s);
    assert(strcmp(res, value) == 0);

    stack_free(s);
}

void test_mixed() {
    printf("Testing mixed values\n");

    stack_t *s = stack_new();

    int i1 = 10, i2 = 3434, i3 = 5901223;
    unsigned long ul1 = 2390232323UL, ul2 = 111111111UL, ul3 = 9999999999999999999UL;
    char *ch1 = "TEST", *ch2 = "LOOOOOOOOOOOOOOOOOOOONG STRING";

    stack_push(s, &i1);
    stack_push(s, ch1);
    stack_push(s, &i2);
    stack_push(s, &ul1);
    stack_push(s, &i3);
    stack_push(s, &ul2);
    stack_push(s, ch2);
    stack_push(s, &ul3);

    assert(*((unsigned long *)stack_pop(s)) == ul3);
    assert(strcmp(ch2, (char *)stack_pop(s)) == 0);
    assert(*((unsigned long *)stack_pop(s)) == ul2);
    assert(*((int *)stack_pop(s)) == i3);
    assert(*((unsigned long *)stack_pop(s)) == ul1);
    assert(*((int *)stack_pop(s)) == i2);
    assert(strcmp(ch1, (char *)stack_pop(s)) == 0);
    assert(*((int *)stack_pop(s)) == i1);

    stack_free(s);
}

int main(int argc, char* argv[]) {

    test_int(123);
    test_int(623434234);
    test_int(-1);
    test_int(0);

    test_str("test123");
    test_str("1234567890!!@#$%%$^&*()_");

    test_mixed();

    printf("-----------------\n");
    printf("All Tests Passed!\n");

    return 0;
}