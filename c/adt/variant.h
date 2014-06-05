/**
 * variant_t
 */

#ifndef __VARIANT_H
#define __VARIANT_H

typedef struct variant_t {
    union {
        void *ptr;
        unsigned int uint;
    } u;
    struct variant_t *prev;
} variant_t;

#endif