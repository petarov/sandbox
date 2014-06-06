/**
 * C (Double) Linked-List Implementation
 * https://github.com/petarov/
 */

#include <assert.h>
#include <stdlib.h>
#include "variant.h"
#include "llist.h"

static llist_node_t* s_create_node(llist_t *llist, void *ptr) {
    // new item
    variant_t *var = var_ptr(ptr);

    // insert node
    llist_node_t *node = (llist_node_t *) malloc(sizeof(llist_node_t));
    node->var = var;
    node->next = node->prev = NULL;
    return node;
}

llist_t* llist_create() {
    llist_t *llist = (llist_t *) malloc(sizeof(llist_t));
    llist->head = llist->tail = NULL;
    llist->count = 0;
    return llist;
}

llist_node_t* llist_add(llist_t *llist, void *ptr) {
    assert(llist != NULL);

    llist_node_t *node = s_create_node(llist, ptr);

    // append => assumes both head and tail are not NULL
    if (llist->tail) {
        node->prev = llist->tail;
        llist->tail->next = node;
        llist->tail = node;
    } else {
        llist->head = llist->tail = node;
    }

    llist->count++;

    return node;
}

llist_node_t* llist_insert(llist_t *llist, void *ptr) {
    assert(llist != NULL);
    assert(llist->tail != NULL);

    llist_node_t *node = s_create_node(llist, ptr);

    // insert => assumes both head and tail are not NULL
    if (llist->head) {
        node->next = llist->head;
        llist->head->prev = node;
        llist->head = node;
    } else {
        llist->head = llist->tail = node;
    }

    llist->count++;

    return node;
}

void* llist_remove_first(llist_t *llist) {
    assert(llist != NULL);
    assert(llist->head != NULL);

    llist_node_t *node = llist->head;
    variant_t *var = node->var;
    void *ptr = var->u.ptr;
    var->u.ptr = NULL;

    if (node->next) {
        node->next->prev = node->prev;
        llist->head = node->next;
    } else {
        // head and tail point to the same node
        llist->head = llist->tail = NULL;
    }

    var_free(var);
    free(node);
    node = NULL;

    llist->count--;

    return ptr;
}

void* llist_remove_last(llist_t *llist) {
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

    var_free(var);
    free(node);
    node = NULL;

    llist->count--;

    return ptr;
}

bool llist_remove(llist_t *llist, llist_node_t *node) {
    llist_node_t *cur = llist->head;
    while (cur != NULL) {
        if (node == cur) {
            // reconnect chain
            if (cur->prev) {
                cur->prev->next = node->next;
            }
            if (cur->next) {
                cur->next->prev = node->prev;
            }

            // free allocated memory for node and variable
            variant_t *var = node->var;
            var_free(var);
            free(node);
            node = NULL;

            llist->count--;

            return true;
        }
        cur = cur->next;
    }
    return false;
}

int llist_count(llist_t *llist) {
    return llist->count;
}

void llist_traverse(llist_t *llist, 
    void (*funcp)(llist_t *llist, llist_node_t *node, void *ptr)) {

    llist_node_t *cur = llist->head;
    while (cur != NULL) {
        (*funcp)(llist, cur, cur->var->u.ptr);
        cur = cur->next;
    }
}

void llist_free(llist_t *llist) {
    // TODO: remove all elements
    free(llist);
    llist = NULL;
}
