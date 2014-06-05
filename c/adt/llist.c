/**
 * C (Double) Linked-List Implementation
 * https://github.com/petarov/
 */

#include <assert.h>
#include <stdlib.h>
#include "variant.h"
#include "llist.h"

llist_t* llist_new() {
    llist_t *llist = (llist_t *) malloc(sizeof(llist_t));
    llist->head = llist->tail = NULL;
    llist->count = 0;
    return llist;
}

void llist_free(llist_t *llist) {
    free(llist);
    llist = NULL;
}

void llist_add(llist_t *llist, void *ptr) {
    assert(llist != NULL);

    // new item
    variant_t *var = var_ptr(ptr);

    // insert node
    llist_node_t *node = (llist_node_t *) malloc(sizeof(llist_node_t));
    node->var = var;
    node->next = node->prev = NULL;

    // append => assumes both head and tail are not NULL
    if (llist->tail) {
        node->prev = llist->tail;
        llist->tail->next = node;
        llist->tail = node;
    } else {
        llist->head = llist->tail = node;
    }

    llist->count++;
}

void* llist_remove(llist_t *llist) {
    assert(llist != NULL);
    assert(llist->tail != NULL);

    llist_node_t *node = llist->tail;
    variant_t *var = node->var;
    void *ptr = var->u.ptr;
    var->u.ptr = NULL;

    if (node->prev) {
        node->prev->next = node->next;
        llist->tail = node->prev;
    } else {
        // head and tail point to the same node
        llist->head = llist->tail = NULL;
    }

    free(var);
    free(node);
    node = NULL;

    llist->count--;

    return ptr;
}

void llist_insert(llist_t *llist, void *ptr) {
    //TODO
}

void* llist_removeLast(llist_t *llist) {
    //TODO
    //
    return NULL;
}

int llist_count(llist_t *llist) {
    return llist->count;
}

void llist_traverse(llist_t *llist, void (*funcp)(void *ptr)) {
    llist_node_t *cur = llist->head;
    while (cur != NULL) {
        (*funcp)(cur->var->u.ptr);
        cur = cur->next;
    }
}
