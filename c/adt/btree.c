/**
 * C Binary Tree Implementation
 * https://github.com/petarov/
 */

#include <assert.h>
#include <stdlib.h>
#include "variant.h"
#include "btree.h"

btree_t* btree_create() {
	btree_t *btree = (btree_t *) malloc(sizeof(btree_t));
	return btree;
}

void btree_free(btree_t *btree) {
	free(btree);
}