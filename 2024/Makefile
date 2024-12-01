CC = gcc
CFLAGS = -std=c11 -Wall -Wextra -Werror -Ofast

%: %.c
	$(CC) $(CFLAGS) $*.c -o $*

%-clean:
	rm -f $*