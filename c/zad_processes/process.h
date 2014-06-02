#ifndef _PROCESS_H
#define _PROCESS_H

struct process_t {
  pid_t parent_pid;
  pid_t pid;
};



void process_start_work();

#endif