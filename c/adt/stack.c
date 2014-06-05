/**
 * C Stack Implementation
 */

#include <assert.h>
#include <stdlib.h>
#include "variant.h"
#include "stack.h"

stack_t* stack_new() {
    stack_t *stack = (stack_t *) malloc(sizeof(stack_t));
    stack->var = NULL;
    stack->count = 0;
    return stack;
}

void stack_free(stack_t *stack) {
    assert(stack != NULL);
    free(stack);
}

void stack_push(stack_t *stack, void *ptr) {
    assert(stack != NULL);

    variant_t *var = (variant_t *) malloc(sizeof(variant_t));
    var->u.ptr = ptr;
    
    if (stack->var) {
        var->prev = stack->var;
    }
    stack->var = var;

    stack->count++;
}

void* stack_pop(stack_t *stack) {
    assert(stack != NULL);
    assert(stack->var != NULL);

    variant_t *var = stack->var;
    void *ptr = var->u.ptr;
    var->u.ptr = NULL;

    stack->var = var->prev;
    free(var);

    stack->count--;

    return ptr;
}

int stack_empty(stack_t *stack) {
    return stack->count == 0;
}
