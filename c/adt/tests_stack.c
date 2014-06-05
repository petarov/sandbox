/**
 * Stack Tests
 * https://github.com/petarov/
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <inttypes.h>
#include <assert.h>
#include "stack.h"

void quit(char *msg) {
    perror(msg);
    exit(EXIT_FAILURE);
}

void test_int(int value) {
    printf("Testing int = %d\n", value);

    char *p = malloc(sizeof(int32_t));
    *((int32_t *) p) = value;

    stack_t *s = stack_create();
    stack_push(s, p);

    int32_t *res = (int32_t *)stack_pop(s);
    assert(*res == value);

    free(p);
    stack_free(s);
}

void test_str(char *value) {
    printf("Testing string = %s\n", value);

    stack_t *s = stack_create();
    stack_push(s, value);

    char *res = (char *)stack_pop(s);
    assert(strcmp(res, value) == 0);

    stack_free(s);
}

void test_mixed() {
    printf("Testing mixed values\n");

    stack_t *s = stack_create();

    int32_t i1 = 0xffffffff, i2 = INT32_MAX, i3 = INT32_MIN;
    uint32_t ul1 = 0xffffffff, ul2 = UINT32_MAX, ul3 = 0;
    char *ch1 = "TEST", *ch2 = "LOOOOOOOOOOOOOOOOOOOONG STRING";

    stack_push(s, &i1);
    stack_push(s, ch1);
    stack_push(s, &i2);
    stack_push(s, &ul1);
    stack_push(s, &i3);
    stack_push(s, &ul2);
    stack_push(s, ch2);
    stack_push(s, &ul3);

    assert(*((uint32_t *)stack_pop(s)) == ul3);
    assert(strcmp(ch2, (char *)stack_pop(s)) == 0);
    assert(*((uint32_t *)stack_pop(s)) == ul2);
    assert(*((int32_t *)stack_pop(s)) == i3);
    assert(*((uint32_t *)stack_pop(s)) == ul1);
    assert(*((int32_t *)stack_pop(s)) == i2);
    assert(strcmp(ch1, (char *)stack_pop(s)) == 0);
    assert(*((int32_t *)stack_pop(s)) == i1);

    stack_free(s);
}

int main(int argc, char* argv[]) {

    test_int(0);
    test_int(-1);
    test_int(INT32_MAX);

    test_str("test123");
    test_str("1234567890!!@#$%%$^&*()_");

    test_mixed();

    printf("-----------------\n");
    printf("All Tests Passed!\n");

    return 0;
}
