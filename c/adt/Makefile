CC = gcc
INC = -I.
CFLAGS = -g -Wall -std=c99

DEPS = stack.h
ODIR = obj
OBJ = stack.c

%.o: %.c $(DEPS)
	$(CC) -c -o $@ $< $(INC) $(CFLAGS)

stack: $(OBJ)
	gcc -o $@ $^ $(INC) $(CFLAGS)

.PHONY: clean

clean:
	rm -f $(ODIR)/*.o