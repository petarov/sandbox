/**
 * C Stack Implementation
 * https://github.com/petarov/
 */

#include <assert.h>
#include <stdlib.h>
#include "variant.h"
#include "stack.h"

stack_t* stack_new() {
    stack_t *stack = (stack_t *) malloc(sizeof(stack_t));
    stack->head = NULL;
    stack->count = 0;
    return stack;
}

void stack_free(stack_t *stack) {
    free(stack);
    stack = NULL;
}

void stack_push(stack_t *stack, void *ptr) {
    assert(stack != NULL);

    // new item
    variant_t *var = (variant_t *) malloc(sizeof(variant_t));
    var->u.ptr = ptr;

    // new node
    stack_node_t *node = (stack_node_t *) malloc(sizeof(stack_node_t));
    node->var = var;
    
    // put new node at the top of the chain
    if (stack->head) {
        node->prev = stack->head;
    }
    stack->head = node;

    stack->count++;
}

void* stack_pop(stack_t *stack) {
    assert(stack != NULL);
    assert(stack->head != NULL);

    // get value from the top node
    stack_node_t *node = stack->head;
    variant_t *var = node->var;
    void *ptr = var->u.ptr;
    var->u.ptr = NULL;

    // chop off the top node
    stack->head = node->prev;

    // node and variant are no longer needed
    free(node);
    free(var);

    stack->count--;

    return ptr;
}

int stack_count(stack_t *stack) {
    return stack->count;
}

int stack_empty(stack_t *stack) {
    return stack->count == 0;
}
