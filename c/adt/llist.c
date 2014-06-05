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
}