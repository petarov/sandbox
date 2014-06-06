/**
 * C Binary Tree Implementation
 * https://github.com/petarov/
 */

#ifndef __BTREE_H
#define __BTREE_H

typedef struct variant_t variant_t;

typedef struct btree_node_t {
    variant_t *var;
    struct btree_node_t *left;
    struct btree_node_t *right;
} btree_node_t;

typedef struct btree_t {
	btree_node_t *head;
} btree_t;


btree_t* btree_create();
void btree_free(btree_t *btree);

#endif