#include "main.h"
#include "process.h"
#include "coordinator.h"

void process_start_work() {
  
  sem_t *sem;
  sem_t *sem2;
  
  if ((sem2 = sem_open("mysemaphore2", 0)) == SEM_FAILED) {
    cerr << "Faild to create sem2!" << endl;
  }
  
  if ((sem = sem_open("mysemaphore1", 0)) == SEM_FAILED) {
    cerr << "Faild to create sem!" << endl;
  }
  
   int msg_id = msgget(MY_MSG_ID, IPC_CREAT|0666);
   if (msg_id == - 1) {
     cerr << "Error creating msg queue!" << endl;
   }
   
   cout << "-->Waiting " << endl;
   sem_wait(sem);
   cout << "-->Called from " << getpid() << " !" << endl;
   
   message_t rmsg;
   //memset(&rmsg, 0, sizeof(rmsg));
   //rmsg.type = 1;
   
   msgrcv(msg_id, &rmsg, sizeof(rmsg) - sizeof(long), 0, 0);
   cout << "-->Got msg" << endl;
   
   message_t msg;
   memset(&msg, 0, sizeof(msg));
   msg.type = 1;
   msg.number = rmsg.number + 1;
   msgsnd(msg_id, &msg, sizeof(msg) - sizeof(long), 0);

   cout << "Incremented number to " << msg.number << endl;
   
   sem_post(sem2);
   
   msgctl(msg_id, IPC_RMID, NULL);
}