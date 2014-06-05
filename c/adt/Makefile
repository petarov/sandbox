CC = gcc
INC = -I.
CFLAGS = -g -Wall -std=c99
LDFLAGS = -Wall

DEPS = 
ODIR = obj

OBJ = stack.o tests_stack.o

$(OBJ): %.o: %.c $(DEPS)
	$(CC) $(CFLAGS) $(INC) -c $< -o $@

all: tests_stack

tests_stack: $(OBJ)
	gcc -o $@ $^ $(INC) $(LDFLAGS)

.PHONY: clean

clean:
	rm -f *.o tests_stack