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

def listen(port):
	log('Server listening on port %s' % port);
	ctx = zmq.Context() #.instance()
	socket = ctx.socket(zmq.REP)
	socket.bind("tcp://*:%s" % port)

	while True:
		msg = socket.recv_string()
		log("Got new message: " + msg)
		time.sleep(1)
		socket.send_string("Echo: " + msg)

def send(port, msg):
	log('Sending message to port %s' % port);
	ctx = zmq.Context()
	socket = ctx.socket(zmq.REQ)
	socket.connect("tcp://localhost:%s" % port)
	# socket.send("%s" % msg)
	socket.send_string(msg)
	reply = socket.recv_string()
	log('Server says: ' + reply)


### main

port = 7000
cmd = sys.argv[1] if len(sys.argv) > 1 else ""

if cmd.isdigit():
	port = cmd
	cmd = sys.argv[2] if len(sys.argv) > 2 else ""

if cmd == 'send':
	msg = sys.argv[2]
	send(port, msg)
else:
	listen(port)
