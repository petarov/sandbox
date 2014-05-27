#!/usr/bin/python2
# Python 2.x

import sys
import os
import time
import collections
from optparse import OptionParser

import zmq

def log(msg):
    sys.stdout.write(msg + '\n')
    sys.stdout.flush()

def listen(port):
	ctx = zmq.Context() #.instance()
	socket = ctx.socket(zmq.REP)
	socket.bind("tcp://*:%s" % port)

	while True:
		msg = socket.recv()
		log("Got new message: " + msg)
		time.sleep(1)
		socket.send("Echo: " + msg)

def send(port, msg):
	ctx = zmq.Context()
	socket = ctx.socket(zmq.REQ)
	socket.connect("tcp://localhost:%s" % port)
	log('Sending ....')
	# socket.send("%s" % msg)
	socket.send(msg)
	reply = socket.recv()
	log('Server says: ' + reply)


### main

if len(sys.argv) < 2:
	log('No commands!')
	sys.exit()

cmd = sys.argv[1]
port = 7000
if cmd == 'port':
	port = sys.argv[2]
	cmd = sys.argv[3]

print cmd

if cmd == 'server':
	log('Server listening on port %s' % port);
	listen(port)
elif cmd == 'send':
	msg = sys.argv[2]
	send(port, msg)
else:
	log('Invalid command!')
	sys.exit()
