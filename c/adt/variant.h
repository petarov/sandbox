/**
 * variant_t data type
 * 
 * https://github.com/petarov/
 */

#ifndef __VARIANT_H
#define __VARIANT_H

typedef struct variant_t {
    union {
        void *ptr;
        unsigned int uint;
    } u;
} variant_t;

#endif