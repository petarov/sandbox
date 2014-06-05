/**
 * C (Double) Linked-List Implementation
 * https://github.com/petarov/
 */

#ifndef __LLIST_H
#define __LLIST_H

typedef struct variant_t variant_t;

typedef struct llist_node_t {
    variant_t *var;
    struct llist_node_t *prev;
    struct llist_node_t *next;
} llist_node_t;

typedef struct llist_t {
    llist_node_t *head;
    llist_node_t *tail;
    int count;
} llist_t;


llist_t* llist_create();
void llist_add(llist_t *llist, void *ptr);
void llist_insert(llist_t *llist, void *ptr);
void* llist_remove_first(llist_t *llist) ;
void* llist_remove_last(llist_t *llist);
int llist_count(llist_t *llist);
void llist_traverse(llist_t *llist, void (*funcp)(void *ptr));
void llist_free(llist_t *llist);

#endif
