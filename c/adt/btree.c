/**
 * C Binary Tree Implementation
 * https://github.com/petarov/
 */

#include <assert.h>
#include <stdlib.h>
#include "variant.h"
#include "btree.h"

static btree_node_t* s_insert_node(btree_node_t **pNode, int32_t index, 
    void *ptr) {

    btree_node_t *node = *pNode;

    if (!node) {
        btree_node_t *newNode = (btree_node_t *) malloc(sizeof(btree_node_t));
        newNode->idx = index;
        newNode->var = var_ptr(ptr);
        newNode->left = newNode->right = NULL;
        *pNode = newNode;
        return newNode;
    } else if (index < node->idx) {
        return s_insert_node(&node->left, index, ptr);
    } else if (index > node->idx) {
        return s_insert_node(&node->right, index, ptr);
    }
    // index must be unique!
    return NULL;
}

btree_t* btree_create() {
    btree_t *btree = (btree_t *) malloc(sizeof(btree_t));
    btree->root = NULL;
    return btree;
}

btree_node_t* btree_insert(btree_t *btree, int32_t index, void *ptr) {
    return s_insert_node(&btree->root, index, ptr);
}

static void s_traverse(btree_t *btree, 
    btree_node_t *node,
    void (*funcp)(btree_t *btree, btree_node_t *node, int offset),
    int offset) {

    if (node == NULL)
        return;

    (*funcp)(btree, node, offset);
    s_traverse(btree, node->left, funcp, offset + 1);
    s_traverse(btree, node->right, funcp, offset + 1);
}

void btree_traverse(btree_t *btree, 
    void (*funcp)(btree_t *btree, btree_node_t *node, int offset)) {
    s_traverse(btree, btree->root, funcp, 0);
}

void btree_free(btree_t *btree) {
    free(btree);
}