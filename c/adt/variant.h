/**
 * variant_t Data Type
 *
 * https://github.com/petarov/
 */

#ifndef __VARIANT_H
#define __VARIANT_H

typedef struct variant_t {
    union {
        void *ptr;
    } u;
} variant_t;

variant_t* var_ptr(void *ptr);
variant_t* var_int(int value);
void var_free(variant_t *var);

#endif
