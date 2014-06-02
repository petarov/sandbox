#include "main.h"
#include "process.h"
#include "coordinator.h"


// create coordinator process
coordinator_t* coord_init(int size) {
  
  coordinator_t *c = new coordinator_t;
  memset(c, NULL, sizeof(c));
  c->processes_size = size;
  
  // initialize messages
  c->msg_id = msgget(MY_MSG_ID, IPC_CREAT|0666);
  if (c->msg_id == - 1) {
    cerr << "Error creating master msg id!" << endl;
  }
  
  if ((c->sem2 = sem_open("mysemaphore2", O_CREAT, 0644, 1)) == SEM_FAILED) {
    cerr << "Faild to create sem2!" << endl;
  }
  
  if ((c->sem = sem_open("mysemaphore1", O_CREAT, 0644, c->processes_size)) != SEM_FAILED) {
  
    pid_t child_pid = 0;
    for(int i = 0; i < size; i++ ) {
      child_pid = fork();
      if (child_pid != 0) {
	// parent
	process_t *p = new process_t;
	p->parent_pid = getpid();
	p->pid = child_pid;
	c->processes[i] = p;
      }
      else {
	// child
	cout << "child process created: " << getpid() << " / parent pid: " << getppid() << endl;
	//process_start_work(c->sem, c->sem2);
	process_start_work();  
	return NULL;
      }
      
    }
  }
  else {
    cerr << "Error creating semaphore!" << endl;
  }
  
  return c;
}

void coord_start_work(coordinator_t *c) {

  message_t msg;
  memset(&msg, 0, sizeof(msg));
  int rc = 0;
  
  for(int i = 0; i < c->processes_size; i++) {
    
    msg.type = 1;
    rc = msgsnd(c->msg_id, &msg, sizeof(msg) - sizeof(long), 0);
    sem_post(c->sem);
   int value = -1;
   sem_getvalue(c->sem, &value); 
   cout << "value: " << value << endl;    
    cout << "Sent msg ..." << endl;
    
    sem_wait(c->sem2);
    
    message_t rmsg;
    //memset(&rmsg, 0, sizeof(rmsg));
    cout << "Waiting msg ..." << endl;
    rc = msgrcv(c->msg_id, &rmsg, sizeof(rmsg) - sizeof(long), 0, 0);
    
    msg.number = rmsg.number;
  }


}

void coord_free(coordinator_t *c) {
  if (c != NULL) {
    cout << "deleting coordinator ..." << endl;
    
    msgctl(c->msg_id, IPC_RMID, NULL);
    sem_destroy(c->sem);
    
    // free allocated mem for processes
    for(int i = 0; i < c->processes_size; i++) {
      if (c->processes[i] != NULL) {
	delete c->processes[i];
	c->processes[i] = NULL;
      }
    }
    
    // free allocated mem for coordinator
    delete c;
    c = NULL;
  }
}