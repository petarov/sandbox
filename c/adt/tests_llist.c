/**
 * (Double) Lined-List Tests
 * https://github.com/petarov/
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <assert.h>
#include "llist.h"

#define ARR_SIZE    0x00010000

void quit(char *msg) {
    perror(msg);
    exit(EXIT_FAILURE);
}

void travtest(void *ptr) {
    assert(ptr != NULL);
}

void test_tail() {
    printf("Testing tail ... \n");

    void *res = NULL;
    int i1 = 0xffffffff;

    llist_t *list = llist_new();

    // Test 1 - Simple Insert
    printf("Test 1 - Simple\n");

    llist_add(list, &i1);
    assert(llist_count(list) == 1);

    res = llist_remove_first(list);
    assert(*((int *)res) == i1);
    assert(llist_count(list) == 0);

    // Test 2 - Insert Array
    printf("Test 2 - Insert\n");

    int arr[ARR_SIZE];
    for (int i = 0; i < ARR_SIZE; i++) {
        arr[i] = i;
        llist_add(list, &arr[i]);
        assert(llist_count(list) == i + 1);
    }

    // Test 3 - Traverse Array
    printf("Test 3 - Traverse\n");
    llist_traverse(list, travtest);

    // Test 4 - Remove Array
    printf("Test 4 - Remove\n");
    for (int i = ARR_SIZE - 1; i > 0; i--) {
        res = llist_remove_last(list);
        assert(*((int *)res) == arr[i]);
        assert(llist_count(list) == i);
    }

    llist_free(list);
}

int main(int argc, char* argv[]) {

    test_tail();

    printf("-----------------\n");
    printf("All Tests Passed!\n");

    return 0;
}
