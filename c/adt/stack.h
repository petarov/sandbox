/**
 * C Stack Implementation
 * https://github.com/petarov/
 */

#ifndef __STACK_H
#define __STACK_H

typedef struct variant_t variant_t;

typedef struct stack_node_t {
    variant_t *var;
    struct stack_node_t *prev;
} stack_node_t;

typedef struct stack_t {
    stack_node_t *head;
    int count;
} stack_t;

stack_t* stack_create();
void stack_push(stack_t *stack, void *ptr);
void* stack_pop(stack_t *stack);
int stack_count(stack_t *stack);
int stack_empty(stack_t *stack);
void stack_free(stack_t *stack);

#endif
