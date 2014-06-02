#ifndef _MAIN_H
#define _MAIN_H

#include <iostream>

using namespace std;

#include <sys/types.h>
#include <sys/wait.h>
#include <sys/msg.h>
#include <sys/ipc.h>
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <errno.h>
#include <semaphore.h>
#include <memory.h>

struct message_t {
  long type;
  int number;
};

#endif