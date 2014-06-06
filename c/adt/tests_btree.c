/**
 * (Double) Lined-List Tests
 * https://github.com/petarov/
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <assert.h>
#include "btree.h"

static int arranged1[] = {5, 2, 1, 3, 4, 9, 7, 6, 8}; // expected arrangement
static int _where = 0;

void trav(btree_t *btree, btree_node_t *node, int offset) {
    assert(btree != NULL);
    assert(node != NULL);

    for(int i = 0; i < offset; i++)
        printf("-");
    printf("%d (L%d)\n", node->idx, offset);

    assert(node->idx == arranged1[_where]);
    _where++;
}

void tests_insert() {
    printf("Testing insert ... \n");

    char *str = "TEST STRING TEST 0001";

    btree_t *btree = btree_create();

    btree_insert(btree, 5, str);
    btree_insert(btree, 2, str);
    btree_insert(btree, 1, str);
    btree_insert(btree, 3, str);
    btree_insert(btree, 9, str);
    btree_insert(btree, 4, str);
    btree_insert(btree, 7, str);
    btree_insert(btree, 8, str);
    btree_insert(btree, 6, str);

    _where = 0;
    btree_traverse(btree, trav);

    btree_free(btree);
}

int main(int argc, char* argv[]) {

    tests_insert();

    printf("-----------------\n");
    printf("All Tests Passed!\n");

    return 0;
}
