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


llist_t* llist_new();
void llist_free(llist_t *llist);
void llist_add(llist_t *llist, void *ptr);
void* llist_remove(llist_t *llist) ;
void llist_insert(llist_t *llist, void *ptr);
void* llist_removeLast(llist_t *llist);
int llist_count(llist_t *llist);

#endif