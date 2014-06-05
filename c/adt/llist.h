/**
 * C (Double) Linked-List Implementation
 * https://github.com/petarov/
 */

#ifndef __LLIST_H
#define __LLIST_H

typedef struct variant_t variant_t;

typedef struct node_t {
    variant_t *var;
    struct node_t *prev;
    struct node_t *next;
} node_t;

typedef struct llist_t {
    node_t *head;
    node_t *tail;
    unsigned int count;
} llist_t;


llist_t* llist_new();
void llist_free(llist_t *llist);

#endif