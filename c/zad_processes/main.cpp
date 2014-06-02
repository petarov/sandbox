#include "main.h"

#define MAX_PROCESSES 10
#define MY_MSG_ID 0x78ab16fe
#define SEM_PARENT_NAME "/semparent4"
#define SEM_CHILD_NAME "/semchild4"

void perr(const char *s) {
  cerr << s << " ErrorNum: " << errno << " , " << strerror(errno) << endl;
}

int main(int argc, char **argv) {
  
  int max_processes = MAX_PROCESSES;
  int start_value = 1;
  
  sem_t *mutex_child, *mutex_parent;
  int status = -1;
  int msg_id = -1;
  int rc = 0;
  
  // create semaphores
  if ((mutex_parent = sem_open(SEM_PARENT_NAME, O_CREAT, 0644, 0)) == SEM_FAILED) {
    perr("Failed creating parent semaphore!");
    exit(-1);
  }
  
  if ((mutex_child = sem_open(SEM_CHILD_NAME, O_CREAT, 0644, 0)) == SEM_FAILED) {
    perr("Failed creating child semaphore in parent!");  
    exit(-1);
  }
  
  // create message queue id
  msg_id = msgget(MY_MSG_ID, IPC_CREAT|0666);
  if (msg_id == -1) {
    perr("Failed to create message queue!");
    goto cleanup;
  }
  
  for(int i = 0; i < max_processes; i++) {
    int child_pid = fork();
    if (child_pid != 0) {
      // child process
      
      if ((mutex_child = sem_open(SEM_CHILD_NAME, 0)) == SEM_FAILED) {
	perr("Failed creating child semaphore!"); 
	exit(-2);
      }
      
      int msg_id = msgget(MY_MSG_ID, 0666);
      if (msg_id == - 1) {
	perr("Error creating message queue in child!");
	goto cleanup_child;
      }      
      
      sem_wait(mutex_child);
      cout << "Child " << getpid() << " created." << endl;
      cout << "Child " << getpid() << " waiting ..." << endl;
      
      message_t msg;
      memset(&msg, 0, sizeof(msg));
      rc = msgrcv(msg_id, &msg, sizeof(msg) - sizeof(long), 0, 0);
      if (rc == -1) {
	perr("Child failed to recieve message!");
	goto cleanup_child;
      }
      msg.number++; // increment value
      cout << "Child " << getpid() << " recieved message" << endl;
      
      // send to next process
      cout << "Child " << getpid() << " sending message" << endl;
      rc = msgsnd(msg_id, &msg, sizeof(msg) - sizeof(long), 0);      
      if (rc == -1) {
	perr("Child failed sending message!");
	goto cleanup_child;
      }      
      
      // unlock parent
      sem_post(mutex_parent);
      
      // cleanup and exit
cleanup_child:     
      cout << "Child " << getpid() << " cleanup." << endl;
      //msgctl(msg_id, IPC_RMID, NULL);
      sem_close(mutex_child);
      exit(0);
    }
  }
  
  // parent process
  cout << "Parent has start value of " << start_value << endl;
  // prepare message
  message_t msg;
  memset(&msg, 0, sizeof(msg));
  msg.type = 1;
  msg.number = start_value;
  rc = msgsnd(msg_id, &msg, sizeof(msg) - sizeof(long), 0);
  if (rc == -1) {
    perr("Parent failed sending message!");
    goto cleanup;
  }
    
  for(int i = 0; i < max_processes; i++) {

    // unlock child
    sem_post(mutex_child);
    
    // wait for child
    sem_wait(mutex_parent);
  }
  
  // get last message
  memset(&msg, 0, sizeof(msg));
  rc = msgrcv(msg_id, &msg, sizeof(msg) - sizeof(long), 0, 0);
  if (rc == -1) {
    perr("Parent failed to recieve message!");
    goto cleanup;
  }  
  
  cout << "Parent has value of " << msg.number << endl;
  cout << "Parent ended." << endl;
 
cleanup:
  // cleanup
  msgctl(msg_id, IPC_RMID, NULL);
  sem_close(mutex_parent);
  sem_close(mutex_child);
    
  return 0;
}
