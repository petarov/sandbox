/**
 * C Binary Tree Implementation
 * https://github.com/petarov/
 */

#ifndef __BTREE_H
#define __BTREE_H

#include <inttypes.h>

typedef struct variant_t variant_t;

typedef struct btree_node_t {
    int32_t idx;
    variant_t *var;
    struct btree_node_t *left;
    struct btree_node_t *right;
} btree_node_t;

typedef struct btree_t {
    btree_node_t *root;
} btree_t;


btree_t* btree_create();
btree_node_t* btree_insert(btree_t *btree, int32_t index, void *ptr);
void btree_traverse(btree_t *btree, 
    void (*funcp)(btree_t *btree, btree_node_t *node, int offset));
void btree_free(btree_t *btree);

#endif