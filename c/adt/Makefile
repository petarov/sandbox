# Build ADT sources and tests 
#
# https://github.com/petarov/
#

CC = gcc
INC = -I.
CFLAGS = -g -Wall -std=c99
LDFLAGS = -Wall

DEPS = 
ODIR = obj

OBJ = stack.o tests_stack.o

%.o: %.c $(DEPS)
	$(CC) $(CFLAGS) $(INC) -c $< -o $@

all: tests_stack tests_llist

tests_stack: stack.o tests_stack.o
	gcc -o $@ $^ $(INC) $(LDFLAGS)

tests_llist: llist.o tests_llist.o
	gcc -o $@ $^ $(INC) $(LDFLAGS)	

.PHONY: clean

clean:
	rm -f *.o tests_stack