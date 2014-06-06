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

void trav(llist_t *list, llist_node_t *node, void *ptr) {
    assert(ptr != NULL);
    assert(node != NULL);
}

void trav_del(llist_t *list, llist_node_t *node, void *ptr) {
    assert(ptr != NULL);
    assert(node != NULL);
    assert(llist_remove(list, node));
}

void test_delete() {
    printf("Testing list removals ... \n");

    int num = 0xffffffff;
    char *str = "TEST STRING TEST 0001";
    unsigned long ul = 0xffffffffUL;    

    llist_t *list = llist_create();

    // Test 1 - Simple Insert
    printf("\tTest 1 - Random remove\n");

    llist_node_t *node_num = llist_add(list, &num);
    llist_add(list, str);
    llist_node_t *node_ul = llist_insert(list, &ul);

    assert(llist_remove(list, node_num));
    assert(strcmp((char *)llist_remove_last(list), str) == 0);
    assert(llist_remove(list, node_ul));
    assert(llist_count(list) == 0);

    printf("\tTest 2 - Traverse & remove (sequential)\n");

    int arr[ARR_SIZE];
    for (int i = 0; i < ARR_SIZE; i++) {
        arr[i] = i;
        llist_add(list, &arr[i]);
        assert(llist_count(list) == i + 1);
    }
    llist_traverse(list, trav_del);
    assert(llist_count(list) == 0);


    llist_free(list);
}

void test_random() {
    printf("Testing random access ... \n");

    llist_t *list = llist_create();

    int num = 0xffffffff;
    char *str = "TEST STRING TEST 0001";
    unsigned long ul = 0xffffffffUL;

    llist_add(list, &num);
    llist_add(list, str);
    llist_add(list, &ul);

    assert(*((int *)llist_remove_first(list)) == num);
    assert(*((unsigned long *)llist_remove_last(list)) == ul);
    assert(strcmp((char *)llist_remove_first(list), str) == 0);

    llist_add(list, &num);
    llist_add(list, str);
    assert(strcmp((char *)llist_remove_last(list), str) == 0);

    llist_add(list, &ul);
    assert(*((int *)llist_remove_first(list)) == num);
    assert(*((unsigned long *)llist_remove_first(list)) == ul);

    llist_free(list);
}

void test_tail() {
    printf("Testing tail ... \n");

    void *res = NULL;
    int i1 = 0xffffffff;

    llist_t *list = llist_create();

    // Test 1 - Simple Insert
    printf("\tTest 1 - Simple\n");

    llist_add(list, &i1);
    assert(llist_count(list) == 1);

    res = llist_remove_last(list);
    assert(*((int *)res) == i1);
    assert(llist_count(list) == 0);

    // Test 2 - Insert Array
    printf("\tTest 2 - Insert\n");

    int arr[ARR_SIZE];
    for (int i = 0; i < ARR_SIZE; i++) {
        arr[i] = i;
        llist_add(list, &arr[i]);
        assert(llist_count(list) == i + 1);
    }

    // Test 3 - Traverse Array
    printf("\tTest 3 - Traverse\n");
    llist_traverse(list, trav);

    // Test 4 - Remove Array
    printf("\tTest 4 - Remove\n");
    for (int i = ARR_SIZE - 1; i > 0; i--) {
        res = llist_remove_last(list);
        assert(*((int *)res) == arr[i]);
        assert(llist_count(list) == i);
    }

    llist_free(list);
}

int main(int argc, char* argv[]) {

    test_tail();
    test_random();
    test_delete();

    printf("-----------------\n");
    printf("All Tests Passed!\n");

    return 0;
}
