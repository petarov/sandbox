#include <assert.h>
#include <stdio.h>
#include <stdlib.h>
#include "stack.h"

stack_t* stack_new() {
	stack_t *stack = (stack_t*) malloc(sizeof(stack_t));
	stack->var = NULL;
	stack->count = 0;
	return stack;
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

	stack->var = var->prev;
	free(var);

	stack->count--;

	return ptr;
}

int stack_empty(stack_t *stack) {
	return stack->count == 0;
}


int main(int argc, char* argv[]) {

	char *p = malloc(sizeof(int));
	char *p1 = malloc(sizeof(int));
	*((int *) p) = 42;
	*((int *) p1) = 43;

	printf("Before push = %d\n", (int)*((int *)p));

	stack_t *s = stack_new();
	stack_push(s, p);
	stack_push(s, p1);

	printf("After push = %d\n", (int)*((int *)stack_pop(s)));
	printf("After push = %d\n", (int)*((int *)stack_pop(s)));


	free(p);

	return 0;
}