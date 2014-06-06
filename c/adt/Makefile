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

OBJ = variant.o

%.o: %.c $(DEPS)
	$(CC) $(CFLAGS) $(INC) -c $< -o $@

all: tests_stack tests_llist tests_btree

tests_stack: $(OBJ) stack.o tests_stack.o
	gcc -o $@ $^ $(INC) $(LDFLAGS)

tests_llist: $(OBJ) llist.o tests_llist.o
	gcc -o $@ $^ $(INC) $(LDFLAGS)	

tests_btree: $(OBJ) btree.o tests_btree.o
	gcc -o $@ $^ $(INC) $(LDFLAGS)	

.PHONY: clean

clean:
	rm -f *.o tests_stack tests_llist tests_btree
