#!/usr/bin/python3
#
# requires Python 3.x

import sys
import os
import time
import zmq

def log(msg):
    sys.stdout.write(msg + '\n')
    sys.stdout.flush()

def timeNow():
	return time.strftime('[%H:%M:%S]', time.gmtime())


def listen(port):
	log('Server listening on port %s' % port);
	ctx = zmq.Context() #.instance()
	socket = ctx.socket(zmq.REP)
	socket.bind("tcp://*:%s" % port)

	while True:
		msg = socket.recv_string()
		log(timeNow() + " Stranger: %s " % msg)
		time.sleep(1)
		socket.send_string('Hey! ' + msg)

def send(port, msg):
	ctx = zmq.Context()
	socket = ctx.socket(zmq.REQ)
	socket.connect("tcp://localhost:%s" % port)
	# socket.send("%s" % msg)
	socket.send_string(msg)
	reply = socket.recv_string()
	log(timeNow() + ' Stranger: %s' % reply)


### main

port = 7000
cmd = sys.argv[1] if len(sys.argv) > 1 else ""

if cmd.isdigit():
	port = cmd
	cmd = sys.argv[2] if len(sys.argv) > 2 else ""

if cmd == 'send':
	log('Connecting to port %s ...' % port);
	msg = sys.argv[2]
	send(port, msg)
elif cmd == 'chat':
	log('Connecting to port %s ...' % port);
	log("")
	log("Chat Mode. Type /quit to leave.")
	log("")
	while True:
		msg = input("[You] ")
		if msg == '/exit' or msg == '/quit':
			sys.exit();

		send(port, msg)
		time.sleep(1)
else:
	listen(port)
