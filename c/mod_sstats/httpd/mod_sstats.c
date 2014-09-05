/* 
**  mod_sstats.c -- Apache sstats module

*/ 

#include "httpd.h"
#include "http_config.h"
#include "http_protocol.h"
#include "ap_config.h"

#include "storage.h"

/* The sample content handler */
static int sstats_handler(request_rec *r)
{
    if (strcmp(r->handler, "sstats")) {
        return DECLINED;
    }
    r->content_type = "text/html";      

//    if (!r->header_only)
        ap_rputs(get_msg(), r);
    return OK;
}

static void sstats_register_hooks(apr_pool_t *p)
{
    ap_hook_handler(sstats_handler, NULL, NULL, APR_HOOK_MIDDLE);
}

/* Dispatch list for API hooks */
module AP_MODULE_DECLARE_DATA sstats_module = {
    STANDARD20_MODULE_STUFF, 
    NULL,                  /* create per-dir    config structures */
    NULL,                  /* merge  per-dir    config structures */
    NULL,                  /* create per-server config structures */
    NULL,                  /* merge  per-server config structures */
    NULL,                  /* table of config file commands       */
    sstats_register_hooks  /* register hooks                      */
};

