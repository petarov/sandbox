#ifndef _COORDINATOR_H
#define _COORDINATOR_H

#include "process.h"

#define MAX_PROCESSES 10
#define MY_MSG_ID 0x78ab16fe


struct coordinator_t {
  process_t* processes[MAX_PROCESSES];
  int processes_size;
  sem_t *sem;
  sem_t *sem2;
  int msg_id;
};


coordinator_t* coord_init(int size);
void coord_start_work(coordinator_t *c);
void coord_free(coordinator_t *c);

#endif