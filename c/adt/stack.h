/**
 * C Stack Implementation
 */

#ifndef __STACK_H
#define __STACK_H

typedef struct variant_t variant_t;

typedef struct stack_t {
    variant_t *var;
    unsigned int count;
} stack_t;

stack_t* stack_new();
void stack_free(stack_t *stack);
void stack_push(stack_t *stack, void *ptr);
void* stack_pop(stack_t *stack);
int stack_empty(stack_t *stack);

#endif