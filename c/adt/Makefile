CC=gcc
CFLAGS=-I. -O3 -std=c99
DEPS = stack.h
OBJ = stack.c

%.o: %.c $(DEPS)
	$(CC) -c -o $@ $< $(CFLAGS)

stack: $(OBJ)
	gcc -o $@ $^ $(CFLAGS)

.PHONY: clean

clean:
	rm -f stack 

#$(ODIR)/*.o *~ core $(INCDIR)/*~ 