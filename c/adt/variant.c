/**
 * variant_t Data Type
 *
 * https://github.com/petarov/
 */

#include <stdlib.h>
#include "variant.h"

variant_t* var_ptr(void *ptr) {
    variant_t *var = (variant_t *) malloc(sizeof(variant_t));
    var->u.ptr = ptr;
    return var;
}

variant_t* var_int(int value) {
    return var_ptr(&value);
}

void var_free(variant_t *var) {
    free(var);
}
